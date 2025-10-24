import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { toast } from 'react-toastify';

const AdminCourses: React.FC = () => {
	const [programs, setPrograms] = useState<any[]>([]);
	const [title, setTitle] = useState('');

	useEffect(()=>{ (async ()=>{ try { const rows = await api.get('/programs'); setPrograms(rows||[]); } catch(err:any){ toast.error('failed to load programs'); } })(); }, []);

	const create = async () => {
		try {
			const p = await api.post('/lms/courses', { title });
			setPrograms(s => [p, ...s]);
			setTitle('');
			toast.success('Course created');
		} catch (err:any) { toast.error(err?.data?.error || 'create failed'); }
	};

	return (
		<div className="p-6">
			<h2 className="text-xl font-bold mb-4">Courses</h2>
			<div className="mb-4 flex items-center space-x-2">
				<input value={title} onChange={e=>setTitle(e.target.value)} placeholder="New course title" className="border p-2 rounded" />
				<button onClick={create} className="px-3 py-2 bg-emerald-600 text-white rounded">Create</button>
			</div>
			<ul className="space-y-3">
				{programs.map(p=> (
					<li key={p.id} className="bg-white p-3 rounded shadow">
						<div className="font-semibold">{p.title || p.name}</div>
						<div className="text-sm text-gray-600">{p.description}</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default AdminCourses;
