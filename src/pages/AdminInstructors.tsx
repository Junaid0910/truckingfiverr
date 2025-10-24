import React, { useEffect, useState } from 'react';
import api from '../lib/api';

const AdminInstructors: React.FC = () => {
	const [instructors, setInstructors] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let mounted = true;
		(async () => {
			try {
				// There's no dedicated instructors endpoint; admin can list enrollments or profiles
				const rows = await api.get('/enrollments');
				if (!mounted) return;
				setInstructors(Array.isArray(rows) ? rows : []);
			} catch (e) {
				// ignore
			} finally { if (mounted) setLoading(false); }
		})();
		return () => { mounted = false; };
	}, []);

	if (loading) return <div className="p-6">Loading...</div>;

	return (
		<div className="p-6">
			<h2 className="text-xl font-semibold mb-4">Instructors / Enrollment Records</h2>
			{instructors.length === 0 ? <p className="text-slate-600">No records</p> : (
				<ul className="space-y-2">{instructors.map(i => <li key={i.id} className="p-2 bg-white rounded border">Enrollment {i.id} — User {i.userId} — Program {i.programId}</li>)}</ul>
			)}
		</div>
	);
};

export default AdminInstructors;
