import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';

const StudentSchedule: React.FC = () => {
	const [enrollments, setEnrollments] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	const load = async () => {
		setLoading(true);
		try {
			const rows = await api.get('/enrollments/me');
			setEnrollments(rows || []);
		} catch (err) {
			console.error('failed to load enrollments', err);
			setEnrollments([]);
		} finally { setLoading(false); }
	};

	useEffect(()=>{ load(); }, []);

	return (
		<div className="p-6">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-xl font-bold">My Schedule & Enrollments</h2>
				<div className="text-sm text-slate-500">{enrollments.length} enrollment(s)</div>
			</div>

			{loading ? (
				<div>Loading schedule...</div>
			) : enrollments.length === 0 ? (
				<div className="bg-white p-6 rounded shadow text-center">
					<Calendar className="mx-auto h-12 w-12 text-slate-400" />
					<div className="font-semibold mt-3">You have no scheduled classes</div>
					<p className="text-sm text-slate-500 mt-2">Browse programs to enroll and your schedule will appear here.</p>
					<Link to="/programs" className="inline-block mt-4 px-4 py-2 bg-emerald-600 text-white rounded">Browse Programs</Link>
				</div>
			) : (
				<div className="space-y-4">
					{enrollments.map((e:any) => (
						<div key={e.id} className="bg-white p-4 rounded shadow flex items-center justify-between">
							<div>
								<div className="font-medium">{e.programTitle || `Program ${e.programId}`}</div>
								<div className="text-sm text-slate-500">Status: {e.status} • Enrolled: {new Date(e.created_at || e.createdAt || Date.now()).toLocaleDateString()}</div>
								<div className="text-sm text-slate-600 mt-2 flex items-center space-x-3">
									<Clock className="h-4 w-4" />
									<span>{e.nextClassTime || 'Schedule details not available'}</span>
								</div>
							</div>
							<div className="flex space-x-2">
								<Link to={`/student/course/${e.programId}`} className="px-3 py-2 bg-emerald-600 text-white rounded">Open Course</Link>
								<button onClick={()=>alert('Add to calendar (demo)')} className="px-3 py-2 border rounded">Add to calendar</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default StudentSchedule;
