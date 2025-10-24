import React, { useEffect, useState } from 'react';
import api from '../lib/api';

const AdminDashboard: React.FC = () => {
	const [counts, setCounts] = useState<any>({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let mounted = true;
		(async () => {
			try {
				const programs = await api.get('/programs');
				const enrollments = await api.get('/enrollments');
				if (!mounted) return;
				setCounts({ programs: Array.isArray(programs) ? programs.length : 0, enrollments: Array.isArray(enrollments) ? enrollments.length : 0 });
			} catch (e) {
				// ignore
			} finally { if (mounted) setLoading(false); }
		})();
		return () => { mounted = false; };
	}, []);

	if (loading) return <div className="p-6">Loading admin dashboard...</div>;

	return (
		<div className="p-6">
			<h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>
			<div className="grid grid-cols-2 gap-4">
				<div className="bg-white p-4 rounded border">Programs: {counts.programs}</div>
				<div className="bg-white p-4 rounded border">Enrollments: {counts.enrollments}</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
