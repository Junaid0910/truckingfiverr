import React, { useEffect, useState } from 'react';
import api from '../lib/api';

const AdminPayments: React.FC = () => {
	const [invoices, setInvoices] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let mounted = true;
		(async () => {
			try {
				const inv = await api.get('/billing/invoices');
				if (!mounted) return;
				setInvoices(Array.isArray(inv) ? inv : []);
			} catch (e) {
				// ignore
			} finally { if (mounted) setLoading(false); }
		})();
		return () => { mounted = false; };
	}, []);

	if (loading) return <div className="p-6">Loading invoices...</div>;

	return (
		<div className="p-6">
			<h2 className="text-xl font-semibold mb-4">Invoices</h2>
			{invoices.length === 0 ? <p className="text-slate-600">No invoices</p> : (
				<ul className="space-y-2">{invoices.map(i => <li key={i.id} className="p-2 bg-white rounded border">Invoice {i.id} — {i.amount || i.total}</li>)}</ul>
			)}
		</div>
	);
};

export default AdminPayments;
