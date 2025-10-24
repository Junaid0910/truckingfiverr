import React, { useEffect, useState } from 'react';
import api from '../lib/api';

const EmployerEmployees: React.FC = () => {
	const [employees, setEmployees] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let mounted = true;
		(async () => {
			setLoading(true);
			try {
				// No direct employees endpoint; use enrollments to infer employees for this employer
				const rows = await api.get('/enrollments');
				if (!mounted) return;
				setEmployees(Array.isArray(rows) ? rows : []);
			} catch (err: any) {
				setError(err?.message || 'Failed to load employees');
			} finally { if (mounted) setLoading(false); }
		})();
		return () => { mounted = false; };
	}, []);

	if (loading) return <div className="p-6">Loading employees...</div>;
	if (error) return <div className="p-6 text-red-600">{error}</div>;

	return (
		<div className="p-6">
			<h2 className="text-xl font-semibold mb-4">Employees</h2>
			{employees.length === 0 ? (
				<p className="text-slate-600">No employee records found.</p>
			) : (
				<ul className="space-y-2">
					{employees.map(e => (
						<li key={e.id} className="p-3 bg-white rounded border">Enrollment #{e.id} — User {e.userId} — Program {e.programId} — {e.status}</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default EmployerEmployees;
