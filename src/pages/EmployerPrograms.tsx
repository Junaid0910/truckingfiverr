import React, { useEffect, useState } from 'react';
import api from '../lib/api';

const LOCAL_KEY = 'employerPrograms';

const EmployerPrograms: React.FC = () => {
	const [programs, setPrograms] = useState<any[]>([]);
	const [localPrograms, setLocalPrograms] = useState<any[]>(() => {
		try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]'); } catch { return []; }
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	useEffect(() => {
		let mounted = true;
		(async () => {
			setLoading(true);
			try {
				const rows = await api.get('/programs');
				if (!mounted) return;
				setPrograms(Array.isArray(rows) ? rows : []);
			} catch (err: any) {
				setError(err?.message || 'Failed to load programs');
			} finally { if (mounted) setLoading(false); }
		})();
		return () => { mounted = false; };
	}, []);

	const saveLocal = (arr: any[]) => { setLocalPrograms(arr); localStorage.setItem(LOCAL_KEY, JSON.stringify(arr)); };

	const addProgram = () => {
		if (!title.trim()) return alert('Title required');
		const p = { id: `local-${Date.now()}`, title: title.trim(), description: description.trim(), created_at: new Date().toISOString() };
		const next = [p, ...localPrograms];
		saveLocal(next);
		setTitle(''); setDescription('');
	};

	const removeLocal = (id: string) => {
		const next = localPrograms.filter(p => p.id !== id);
		saveLocal(next);
	};

	if (loading) return <div className="p-6">Loading programs...</div>;
	if (error) return <div className="p-6 text-red-600">{error}</div>;

	const combined = [...localPrograms, ...programs];

	return (
		<div className="p-6">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-xl font-semibold">Training Programs</h2>
				<div className="text-sm text-slate-600">Showing {combined.length} programs</div>
			</div>

			<section className="mb-6">
				<h3 className="font-medium mb-2">Add a program (Employer)</h3>
				<div className="space-y-2 max-w-xl">
					<input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Program title" className="w-full border p-2 rounded" />
					<textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Short description" className="w-full border p-2 rounded" />
					<div>
						<button onClick={addProgram} className="px-4 py-2 bg-emerald-600 text-white rounded">Add program</button>
					</div>
				</div>
			</section>

			<section>
				{combined.length === 0 ? (
					<p className="text-slate-600">No programs available.</p>
				) : (
					<ul className="space-y-3">
						{combined.map((p:any) => (
							<li key={p.id} className="p-3 bg-white rounded border flex justify-between items-start">
								<div>
									<div className="font-medium text-slate-900">{p.title}</div>
									<div className="text-sm text-slate-600">{p.description}</div>
								</div>
								<div>
									{String(p.id).startsWith('local-') && (
										<button onClick={()=>removeLocal(p.id)} className="px-3 py-1 text-sm border rounded">Delete</button>
									)}
								</div>
							</li>
						))}
					</ul>
				)}
			</section>
		</div>
	);
};

export default EmployerPrograms;
