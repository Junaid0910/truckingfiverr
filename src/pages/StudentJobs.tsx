import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';

// Small demo dataset so the student job board always shows something for demos
const demoJobs = [
	{ id: 'demo-1', title: 'Class A CDL Driver - OTR', location: 'Dallas, TX', company: 'Ace Trucking Co.', posted: '2 days ago', salary: '$1,200/wk', type: 'Full-time' },
	{ id: 'demo-2', title: 'Local Delivery Driver', location: 'San Diego, CA', company: 'City Freight', posted: '1 week ago', salary: '$650/wk', type: 'Contract' },
	{ id: 'demo-3', title: 'Night Shift Driver - Refrigerated', location: 'Atlanta, GA', company: 'CoolTrans', posted: '3 days ago', salary: '$1,000/wk', type: 'Full-time' }
];

const StudentJobs: React.FC = () => {
	const [jobs, setJobs] = useState<any[]>(demoJobs);

	useEffect(() => {
		let mounted = true;
		(async () => {
			try {
				const rows = await api.get('/jobs');
				if (!mounted) return;
				setJobs((rows && rows.length) ? rows : demoJobs);
			} catch (err) {
				console.error('Failed to load jobs, falling back to demo jobs', err);
				if (mounted) setJobs(demoJobs);
			}
		})();
		return () => { mounted = false; };
	}, []);

	const apply = async (id: any) => {
		try {
			await api.post(`/jobs/${id}/apply`);
			alert('Applied');
		} catch (err: any) {
			alert(err?.data?.error || err.message || 'apply failed');
		}
	};

	return (
		<div className="p-6">
			<h2 className="text-xl font-bold mb-4">Job Board</h2>
			<ul className="space-y-4">
				{jobs.map(j => (
					<li key={j.id} className="bg-white p-4 rounded shadow flex flex-col sm:flex-row sm:justify-between sm:items-center">
						<div>
							<div className="font-semibold text-slate-900">{j.title}</div>
							<div className="text-sm text-slate-500">{j.company} • {j.location}</div>
							<div className="text-sm text-slate-500">{j.posted} • {j.type} • {j.salary}</div>
						</div>
						<div className="mt-3 sm:mt-0">
							<button onClick={() => apply(j.id)} className="px-4 py-2 bg-emerald-600 text-white rounded">Apply</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default StudentJobs;
