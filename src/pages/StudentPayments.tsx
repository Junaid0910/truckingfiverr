import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import { toast } from 'react-toastify';

const StudentPayments: React.FC = () => {
	const [payments, setPayments] = useState<any[]>([]);
	const [amount, setAmount] = useState('');
	const [loading, setLoading] = useState(true);

	const load = async () => {
		setLoading(true);
		try {
			const rows = await api.get('/payments/me');
			const local = JSON.parse(localStorage.getItem('localPayments')||'[]');
			setPayments([...(local || []), ...(rows || [])]);
		} catch (err) {
			console.error('failed to load payments', err);
			const local = JSON.parse(localStorage.getItem('localPayments')||'[]');
			setPayments(local || []);
		} finally { setLoading(false); }
	};

	useEffect(()=>{ load(); }, []);

	const createLocalPayment = () => {
		if (!amount || Number(amount) <= 0) return toast.error('Enter a valid amount');
		const p = { id: `local-${Date.now()}`, userId: 'demo', amount: Number(amount), currency: 'usd', provider: 'local', status: 'pending', created_at: new Date().toISOString() };
		setPayments(prev => [p, ...prev]);
		const lp = JSON.parse(localStorage.getItem('localPayments')||'[]'); lp.unshift(p); localStorage.setItem('localPayments', JSON.stringify(lp));
		setAmount('');
		toast.success('Local payment created (demo)');
	};

		// markPaid removed — demo payments are read-only in this view

	const outstanding = payments.filter(p=> (p.status||'pending') !== 'paid').reduce((s,p)=>s + (Number(p.amount)||0), 0);

	return (
		<div className="p-6">
			<h2 className="text-xl font-bold mb-4">Payments</h2>

			<div className="bg-white p-6 rounded shadow mb-6">
				<div className="flex items-center space-x-3">
					<input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount (USD)" className="border p-2 rounded w-40" />
					<button onClick={createLocalPayment} className="px-4 py-2 bg-emerald-600 text-white rounded">Create Demo Payment</button>
					<button onClick={load} className="px-4 py-2 border rounded">Refresh</button>
				</div>
				<p className="text-sm text-slate-500 mt-3">Payments use Stripe if configured. This demo allows creating a local payment for preview.</p>
				<div className="mt-3 text-sm">Outstanding balance: <span className="font-semibold">${outstanding.toFixed(2)}</span></div>
			</div>

			<div className="space-y-3">
				{loading ? <div>Loading payments...</div> : payments.map(p=> (
					<div key={p.id} className="bg-white p-4 rounded shadow flex items-center justify-between">
						<div>
							<div className="font-medium">{p.amount} {p.currency?.toUpperCase() || 'USD'}</div>
							<div className="text-sm text-slate-500">{p.provider || 'local'} • {new Date(p.created_at || p.createdAt || Date.now()).toLocaleString()}</div>
						</div>
									<div className="flex items-center space-x-3">
										<div className={`px-3 py-1 rounded-full text-sm ${p.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-50 text-yellow-700'}`}>{p.status || 'pending'}</div>
									</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default StudentPayments;
