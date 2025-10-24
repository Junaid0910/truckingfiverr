import React, { useEffect, useState } from 'react';
import api from '../lib/api';

const InstructorSettings: React.FC = () => {
	const [profile, setProfile] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let mounted = true;
		(async () => {
			setLoading(true);
			try {
				const res = await api.get('/profiles/me');
				if (!mounted) return;
				setProfile(res?.profile || null);
			} catch (err: any) {
				setError(err?.message || 'Failed to load profile');
			} finally { if (mounted) setLoading(false); }
		})();
		return () => { mounted = false; };
	}, []);

	if (loading) return <div className="p-6">Loading...</div>;
	if (error) return <div className="p-6 text-red-600">{error}</div>;

	return (
		<div className="p-6">
			<h2 className="text-xl font-semibold mb-4">Instructor Settings</h2>
			<div className="bg-white p-4 rounded-lg border">
				<p><strong>Name:</strong> {profile?.name || '—'}</p>
				<p><strong>Bio:</strong> {profile?.bio || '—'}</p>
				<p className="text-sm text-slate-500 mt-2">To update your profile, use the API-backed editor (not implemented in this stub).</p>
			</div>
		</div>
	);
};

export default InstructorSettings;
