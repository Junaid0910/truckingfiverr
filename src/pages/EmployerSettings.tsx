import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';

const EmployerSettings: React.FC = () => {
	const [profile, setProfile] = useState<any>({});
	const [preview, setPreview] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let mounted = true;
		(async () => {
			try {
				const p = await api.get('/profiles/me');
				if (!mounted) return;
				const prof = p.profile || {};
				setProfile(prof);
				setPreview(prof.avatar || prof.photo || null);
			} catch (err) {
				console.error(err);
			} finally {
				if (mounted) setLoading(false);
			}
		})();
		return () => { mounted = false; };
	}, []);

	const handleFile = (file?: File) => {
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => {
			const result = reader.result as string;
			setPreview(result);
			setProfile({ ...profile, avatar: result });
		};
		reader.readAsDataURL(file);
	};

	const save = async () => {
		try {
			const res = await api.post('/profiles/me', profile);
			try { window.dispatchEvent(new CustomEvent('profileUpdated', { detail: res })); } catch (e) { /* ignore */ }
			alert('Saved');
		} catch (err: any) {
			alert(err?.data?.error || err.message || 'save failed');
		}
	};

	if (loading) return <div className="p-6">Loading...</div>;

	return (
		<div className="p-6">
			<h2 className="text-xl font-bold mb-4">Profile</h2>
			<div className="space-y-3 max-w-md">
				<div>
					<label className="block text-sm text-slate-600">Profile picture</label>
					<div className="flex items-center space-x-4">
						{preview ? (
							<img src={preview} alt="avatar" className="w-16 h-16 rounded-full object-cover border" />
						) : (
							<div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">No image</div>
						)}
						<div>
							<input
								type="file"
								accept="image/*"
								onChange={(e) => handleFile(e.target.files?.[0])}
								className="mb-2"
							/>
							<div className="text-xs text-slate-500">PNG/JPG — max 2MB recommended</div>
						</div>
					</div>
				</div>

				<div>
					<label className="block text-sm text-slate-600">Full name</label>
					<input value={profile.name || ''} onChange={e => setProfile({ ...profile, name: e.target.value })} className="w-full border p-2 rounded" />
				</div>
				<div>
					<label className="block text-sm text-slate-600">Phone</label>
					<input value={profile.phone || ''} onChange={e => setProfile({ ...profile, phone: e.target.value })} className="w-full border p-2 rounded" />
				</div>
				<div>
					<button onClick={save} className="px-4 py-2 bg-emerald-600 text-white rounded">Save</button>
				</div>
			</div>
		</div>
	);
};

export default EmployerSettings;
