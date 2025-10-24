import React, { useEffect, useState } from 'react';
import api from '../lib/api';

const InstructorSchedule: React.FC = () => {
	const [classes, setClasses] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let mounted = true;
		(async () => {
			setLoading(true);
			try {
				// There's no dedicated instructor schedule endpoint; use enrollments to show classes for this instructor
				const rows = await api.get('/enrollments/me');
				if (!mounted) return;
				setClasses(Array.isArray(rows) ? rows : []);
			} catch (err: any) {
				setError(err?.message || 'Failed to load schedule');
			} finally { if (mounted) setLoading(false); }
		})();
		return () => { mounted = false; };
	}, []);

	if (loading) return <div className="p-6">Loading schedule...</div>;
	if (error) return <div className="p-6 text-red-600">{error}</div>;

	return (
		<div className="p-6">
			<h2 className="text-xl font-semibold mb-4">Your Schedule</h2>
			{classes.length === 0 ? (
				<p className="text-slate-600">No scheduled classes found.</p>
			) : (
				<ul className="space-y-3">
					{classes.map(c => (
						<li key={c.id} className="p-3 bg-white rounded-lg border">Enrollment #{c.id} — Program {c.programId} — Status: {c.status}</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default InstructorSchedule;
