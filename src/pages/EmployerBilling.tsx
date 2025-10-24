import React, { useEffect, useState } from 'react';
import api from '../lib/api';

const WITHDRAW_KEY = 'employerWithdrawals';

const EmployerBilling: React.FC = () => {
	const [invoices, setInvoices] = useState<any[]>([]);
	const [payments, setPayments] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [withdrawals, setWithdrawals] = useState<any[]>(() => {
		try { return JSON.parse(localStorage.getItem(WITHDRAW_KEY) || '[]'); } catch { return []; }
	});
	const [withdrawAmount, setWithdrawAmount] = useState('');

	useEffect(() => {
		let mounted = true;
		(async () => {
			setLoading(true);
			try {
				// fetch invoices and payments independently so one failing (eg stripe not configured)
				// doesn't block the other and we can gracefully fallback to empty arrays.
				try {
					const inv = await api.get('/billing/invoices');
					if (mounted) setInvoices(Array.isArray(inv) ? inv : []);
				} catch (ie: any) {
					// If stripe not configured or backend returns an error, fallback to empty
					if (ie?.data?.error && typeof ie.data.error === 'string' && ie.data.error.toLowerCase().includes('stripe')) {
						if (mounted) setInvoices([]);
					} else {
						// unexpected error — surface to user
						if (mounted) setError(ie?.message || 'Failed to load invoices');
					}
				}

				try {
					const pay = await api.get('/payments/me');
					if (mounted) setPayments(Array.isArray(pay) ? pay : []);
				} catch (pe: any) {
					if (pe?.data?.error && typeof pe.data.error === 'string' && pe.data.error.toLowerCase().includes('stripe')) {
						// fallback: try to load demo localPayments if present
						try {
							const lp = JSON.parse(localStorage.getItem('localPayments') || '[]');
							if (mounted) setPayments(Array.isArray(lp) ? lp : []);
						} catch {
							if (mounted) setPayments([]);
						}
					} else {
						if (mounted) setError(pe?.message || 'Failed to load payments');
					}
				}
			} catch (err: any) {
				if (mounted) setError(err?.message || 'Failed to load billing data');
			} finally { if (mounted) setLoading(false); }
		})();
		return () => { mounted = false; };
	}, []);

	const saveWithdrawals = (arr:any[]) => { setWithdrawals(arr); localStorage.setItem(WITHDRAW_KEY, JSON.stringify(arr)); };

	const totalEarned = payments.reduce((s, p) => s + (Number(p.amount) || 0), 0);
	const totalWithdrawn = withdrawals.reduce((s, w) => s + (Number(w.amount) || 0), 0);
	const available = Math.max(0, totalEarned - totalWithdrawn);

	const doWithdraw = () => {
		const a = Number(withdrawAmount || 0);
		if (!a || a <= 0) return alert('Enter a valid amount');
		if (a > available) return alert('Insufficient available balance');
		const w = { id: `w-${Date.now()}`, amount: a, created_at: new Date().toISOString() };
		const next = [w, ...withdrawals];
		saveWithdrawals(next);
		setWithdrawAmount('');
		alert('Withdrawal requested (demo)');
	};

	if (loading) return <div className="p-6">Loading billing data...</div>;
	if (error) return <div className="p-6 text-red-600">{error}</div>;

	return (
		<div className="p-6">
			<h2 className="text-xl font-semibold mb-4">Billing</h2>
			<section className="mb-6">
				<h3 className="font-medium">Invoices</h3>
				{invoices.length === 0 ? <p className="text-slate-600">No invoices</p> : (
					<ul className="space-y-2">{invoices.map(i => <li key={i.id} className="p-2 bg-white rounded border">Invoice {i.id} — {i.amount || i.total || ''}</li>)}</ul>
				)}
			</section>
			<section className="mb-6">
				<h3 className="font-medium">Payments (earned)</h3>
				{payments.length === 0 ? <p className="text-slate-600">No payments</p> : (
					<ul className="space-y-2">{payments.map(p => <li key={p.id} className="p-2 bg-white rounded border">Payment {p.id} — {p.amount}</li>)}</ul>
				)}
				<div className="mt-4">
					<div className="text-sm text-slate-600">Total earned: <strong className="text-slate-100">${totalEarned.toFixed(2)}</strong></div>
					<div className="text-sm text-slate-600">Total withdrawn: <strong className="text-slate-100">${totalWithdrawn.toFixed(2)}</strong></div>
					<div className="text-sm text-slate-600">Available: <strong className="text-slate-100">${available.toFixed(2)}</strong></div>
				</div>
			</section>
			<section className="mb-6">
				<h3 className="font-medium">Withdraw</h3>
				<div className="flex items-center space-x-2 max-w-sm">
					<input value={withdrawAmount} onChange={e=>setWithdrawAmount(e.target.value)} placeholder="Amount" className="px-3 py-2 border rounded w-32" />
					<button onClick={doWithdraw} className="px-4 py-2 bg-emerald-600 text-white rounded">Withdraw</button>
				</div>
			</section>
			<section>
				<h3 className="font-medium">Withdrawal History</h3>
				{withdrawals.length === 0 ? <p className="text-slate-600">No withdrawals</p> : (
					<ul className="space-y-2">{withdrawals.map(w => <li key={w.id} className="p-2 bg-white rounded border">{w.id} — ${Number(w.amount).toFixed(2)} — {w.created_at}</li>)}</ul>
				)}
			</section>
		</div>
	);
};

export default EmployerBilling;
