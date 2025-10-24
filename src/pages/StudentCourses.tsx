
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import { toast } from 'react-toastify';

type CourseMeta = {
	id: number;
	title: string;
	description?: string;
	modules?: Array<{ id: number; title: string; lessons: Array<{ id:number; title:string }> }>;
};

const StudentCourses: React.FC = () => {
	const [enrollments, setEnrollments] = useState<any[]>([]);
	const [coursesMeta, setCoursesMeta] = useState<Record<string, CourseMeta>>({});
	const [progress, setProgress] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [expanded, setExpanded] = useState<Record<string, boolean>>({});
	const [employerPrograms, setEmployerPrograms] = useState<any[]>([]);

	// initial load: local enrollments and employer programs
	useEffect(() => {
		try{
			const le = JSON.parse(localStorage.getItem('localEnrollments') || '[]');
			if (Array.isArray(le) && le.length) setEnrollments(le);
		}catch(e){}
		try{
			const ep = JSON.parse(localStorage.getItem('employerPrograms') || '[]');
			if (Array.isArray(ep) && ep.length) setEmployerPrograms(ep);
		}catch(e){}
	}, []);

	// fetch server enrollments/progress and course metadata
	useEffect(()=>{
		let mounted = true;
		(async ()=>{
			setLoading(true);
			try{
				const [serverEnrolls, serverProg] = await Promise.all([
					api.get('/enrollments/me').catch(()=>[]),
					api.get('/lms/progress/me').catch(()=>[])
				]);

				let local: any[] = [];
				try { local = JSON.parse(localStorage.getItem('localEnrollments')||'[]'); } catch(e){ local = []; }

				const mergedByProgram: Record<string, any> = {};
				(Array.isArray(serverEnrolls) ? serverEnrolls : []).forEach((s:any)=> { if (s && s.programId) mergedByProgram[String(s.programId)] = s; });
				(Array.isArray(local) ? local : []).forEach((l:any)=> { if (l && l.programId && !mergedByProgram[String(l.programId)]) mergedByProgram[String(l.programId)] = l; });

				const merged = Object.values(mergedByProgram);
				if (!mounted) return;
				setEnrollments(merged);
				setProgress(Array.isArray(serverProg) ? serverProg : []);

				// fetch metadata for programs
				for (const e of merged) {
					if (!e.programId) continue;
					try{
						const meta = await api.get(`/lms/courses/${e.programId}`);
						if (!mounted) return;
						setCoursesMeta(m => ({ ...m, [String(e.programId)]: meta }));
					}catch(_){ }
				}

				// refresh employer programs
				try{
					const ep = JSON.parse(localStorage.getItem('employerPrograms') || '[]');
					if (Array.isArray(ep) && ep.length) setEmployerPrograms(ep);
				}catch(e){}

			}catch(err:any){ console.error(err); toast.error('Failed to load your courses'); }
			finally { if (mounted) setLoading(false); }
		})();
		return ()=>{ mounted=false; };
	}, []);

	const lessonCompleted = (courseId:number, lessonId:number) => {
		return (progress||[]).some((p:any)=>p.courseId==courseId && p.lessonId==lessonId && p.userId);
	};

	const markLessonComplete = async (courseId:number, moduleId:number, lessonId:number) => {
		try{
			await api.post('/lms/progress', { courseId, moduleId, lessonId });
			toast.success('Lesson marked complete');
			const prog = await api.get('/lms/progress/me');
			setProgress(prog || []);
		}catch(err:any){ toast.error(err?.data?.error || err.message || 'Failed to mark lesson'); }
	};

	const requestCertificate = async (courseId:number) => {
		try{
			const res = await api.post(`/certificates/generate/${courseId}`);
			toast.success('Certificate requested');
			if (res?.pdf) {
				const blob = Uint8Array.from(atob(res.pdf), c => c.charCodeAt(0));
				const url = URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
				window.open(url, '_blank');
			}
		}catch(err:any){ toast.error(err?.data?.error || err.message || 'Certificate generation failed'); }
	};

	const persistLocalEnroll = (enroll:any, price?: string) => {
		setEnrollments(prev => [enroll, ...prev]);
		try{
			const existing = JSON.parse(localStorage.getItem('localEnrollments')||'[]');
			existing.unshift(enroll);
			localStorage.setItem('localEnrollments', JSON.stringify(existing));
		}catch(e){}

		if (price) {
			const raw = (price||'').toString();
			const amt = Number((raw.replace(/[^0-9.]/g, '') || '0')) || 0;
			if (amt > 0) {
				const pay = { id: `local-pay-${Date.now()}`, userId: 'demo', amount: Number(amt), currency: 'usd', provider: 'local', status: 'pending', created_at: new Date().toISOString(), note: `Enrollment: ${enroll.title}` };
				try{
					const lp = JSON.parse(localStorage.getItem('localPayments')||'[]');
					lp.unshift(pay);
					localStorage.setItem('localPayments', JSON.stringify(lp));
				}catch(e){}
			}
		}
	};

	// build demo lists including employer programs
	const buildDemoList = () => {
		const demoBase = [
			{ id: 'demo-1', title: 'CDL Class A — Full Program', desc: 'Comprehensive Class A training with hands-on hours.', price: '$4,500', image: 'https://picsum.photos/seed/demo1/640/360' },
			{ id: 'demo-2', title: 'Refresher Course — Short', desc: 'Quick refresher to brush up your skills.', price: '$1,800', image: 'https://picsum.photos/seed/demo2/640/360' },
			{ id: 'demo-3', title: 'Advanced Night Driving', desc: 'Specialized night operations training.', price: '$2,200', image: 'https://picsum.photos/seed/demo3/640/360' }
		];
		const employerList = (employerPrograms || []).map((p:any) => ({ id: p.id, title: p.title, desc: p.description || '', price: p.price || '$199', image: p.image || `https://picsum.photos/seed/${encodeURIComponent(p.id)}/640/360` }));
		return [...employerList, ...demoBase];
	};

	const buildExploreList = () => {
		const exploreBase = [
			{ id: 'x-1', title: 'Cargo Securement Basics', desc: 'Learn proper cargo securement for different loads.', price: '$495', image: 'https://picsum.photos/seed/x1/640/360' },
			{ id: 'x-2', title: 'HazMat Awareness', desc: 'Intro to hazardous materials handling and safety.', price: '$299', image: 'https://picsum.photos/seed/x2/640/360' },
			{ id: 'x-3', title: 'Efficient Route Planning', desc: 'Optimize routes and save fuel and time.', price: '$199', image: 'https://picsum.photos/seed/x3/640/360' }
		];
		const employerList = (employerPrograms || []).map((p:any) => ({ id: p.id, title: p.title, desc: p.description || '', price: p.price || '$199', image: p.image || `https://picsum.photos/seed/${encodeURIComponent(p.id)}/640/360` }));
		return [...employerList, ...exploreBase];
	};

	return (
		<div className="p-6">
			<h2 className="text-xl font-bold mb-4">My Courses & Enrollments</h2>

			<ul className="space-y-3">
				{loading ? (
					<li className="bg-white p-4 rounded shadow">Loading courses...</li>
				) : enrollments.length === 0 ? (
					<li className="bg-white p-6 rounded shadow text-center">
						<div className="text-lg font-semibold">My Courses & Enrollments</div>
						<p className="mt-2 text-slate-600">You have no enrollments yet.</p>
						<p className="mt-3 text-sm text-slate-500">Try one of our demo courses below to see how the experience looks.</p>

						<div className="mt-6">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								{buildDemoList().map((c:any) => (
									<div key={c.id} className="bg-white p-4 rounded shadow flex flex-col justify-between">
										<div>
											{c.image && <img src={c.image} alt={c.title} className="w-full h-40 object-cover rounded mb-3" />}
											<div className="flex items-center justify-between">
												<div className="font-medium">{c.title}</div>
												<div className="text-emerald-600 font-semibold">{c.price}</div>
											</div>
											<p className="text-sm text-slate-600 mt-1">{c.desc}</p>
										</div>
										<div className="mt-4 flex space-x-2">
											<Link to={`/programs/${c.id}`} className="px-3 py-2 bg-emerald-600 text-white rounded">View</Link>
											<button onClick={() => {
												const newEnroll = { id: `demo-enr-${c.id}-${Date.now()}`, programId: c.id, status: 'enrolled', created_at: new Date().toISOString(), title: c.title };
												persistLocalEnroll(newEnroll, c.price);
												toast.success('Enrolled in demo course — payment added to outstanding balance');
												setExpanded(s => ({ ...s, [String(c.id)]: true }));
											}} className="px-3 py-2 border rounded">Enroll</button>
										</div>
									</div>
								))}
							</div>
						</div>
					</li>
				) : (
					enrollments.map(e=> (
						<li key={e.id} className="bg-white p-4 rounded shadow">
							<div className="flex justify-between items-start">
								<div className="flex-1">
									<div className="font-semibold text-lg">{coursesMeta[e.programId]?.title || `Program ${e.programId}`}</div>
									<div className="text-sm text-gray-600 mb-2">Status: {e.status} — Enrolled: {new Date(e.created_at || e.createdAt || Date.now()).toLocaleDateString()}</div>
									<p className="text-sm text-slate-700">{coursesMeta[e.programId]?.description || ''}</p>

									<div className="w-full bg-slate-200 rounded-full h-2 mt-3 mb-2">
										{(() => {
											const total = (coursesMeta[e.programId]?.modules || []).reduce((s:any,m:any)=>s + (m.lessons?.length || 0), 0) || 0;
											const completed = (progress||[]).filter((p:any)=>p.courseId==e.programId).length || 0;
											const pct = total ? Math.round((completed/total)*100) : 0;
											return <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${pct}%` }} />
										})()}
									</div>

									<div className="flex items-center space-x-3 mt-2">
										<Link to={`/student/course/${e.programId}`} className="px-3 py-2 bg-emerald-600 text-white rounded">Resume</Link>
										<button onClick={() => requestCertificate(e.programId)} className="px-3 py-2 border border-slate-300 rounded">Request Certificate</button>
										<button onClick={()=>setExpanded(s=>({ ...s, [String(e.programId)]: !s[String(e.programId)] }))} className="px-3 py-2 border border-slate-300 rounded">Modules</button>
									</div>
								</div>
							</div>
							{expanded[String(e.programId)] && (
								<div className="mt-4 border-t pt-4">
									{(coursesMeta[e.programId]?.modules || []).map((mod:any) => (
										<div key={mod.id} className="mb-3">
											<div className="font-medium">{mod.title}</div>
											<ul className="mt-2 space-y-2">
												{(mod.lessons || []).map((lesson:any)=> (
													<li key={lesson.id} className="flex items-center justify-between p-2 bg-slate-50 rounded">
														<div>
															<div className="font-medium">{lesson.title}</div>
														</div>
														<div>
															{lessonCompleted(e.programId, lesson.id) ? (
																<span className="text-sm text-emerald-600">Completed</span>
															) : (
																<button onClick={()=>markLessonComplete(e.programId, mod.id, lesson.id)} className="px-2 py-1 bg-emerald-600 text-white rounded text-xs">Mark Complete</button>
															)}
														</div>
													</li>
												))}
											</ul>
										</div>
									))}
								</div>
							)}
						</li>
					))
				)}
			</ul>

			{/* Show Explore more courses after the user has at least one enrollment */}
			{enrollments.length > 0 && (
				<div className="mt-6 bg-white p-6 rounded shadow">
					<div className="text-lg font-semibold mb-3">Explore more courses</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{buildExploreList().map((c:any) => (
							<div key={c.id} className="bg-slate-50 p-4 rounded">
								{c.image && <img src={c.image} alt={c.title} className="w-full h-36 object-cover rounded mb-3" />}
								<div className="flex items-center justify-between">
									<div className="font-medium">{c.title}</div>
									<div className="text-emerald-600 font-semibold">{c.price}</div>
								</div>
								<p className="text-sm text-slate-600 mt-1">{c.desc}</p>
								<div className="mt-3 flex space-x-2">
									<button onClick={()=>{
										const newEnroll = { id: `demo-enr-${c.id}-${Date.now()}`, programId: c.id, status: 'enrolled', created_at: new Date().toISOString(), title: c.title };
										persistLocalEnroll(newEnroll, c.price);
										toast.success('Enrolled in demo course — payment added to outstanding balance');
									}} className="px-3 py-2 bg-emerald-600 text-white rounded">Enroll</button>
									<Link to="/programs" className="px-3 py-2 border rounded">Browse All</Link>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

		</div>
	);
};

export default StudentCourses;
