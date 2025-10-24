import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { toast } from 'react-toastify';

const AdminStudents: React.FC = () => {
	const [enrollments, setEnrollments] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(()=>{
		(async ()=>{
			setLoading(true);
			try {
				const rows = await api.get('/enrollments');
				setEnrollments(rows || []);
			} catch (err:any) { toast.error(err?.data?.error || 'Failed to load enrollments'); }
			finally { setLoading(false); }
		})();
	}, []);

	return (
		<div className="p-6">
			<h2 className="text-xl font-bold mb-4">Enrollments</h2>
			{loading ? <div>Loading...</div> : (
				<ul className="space-y-3">
					{enrollments.map(e=> (
						<li key={e.id} className="bg-white p-3 rounded shadow">
							<div className="flex justify-between items-center">
								<div>
									<div className="font-semibold">Enrollment #{e.id}</div>
									<div className="text-sm text-gray-600">User: {e.userId} — Program: {e.programId} — Status: {e.status}</div>
								</div>
								<div>
									<button className="px-3 py-1 bg-emerald-600 text-white rounded">View</button>
								</div>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default AdminStudents;
