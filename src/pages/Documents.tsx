import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../lib/AuthContext';

const Documents: React.FC = () => {
  const [docs, setDocs] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const { user } = useAuth();

  useEffect(()=>{ (async ()=>{ try { const d = await api.get('/documents/me'); setDocs(d || []); } catch(err){ console.error(err); } })(); }, []);

  const upload = async () => {
    if (!file) return alert('choose file');
    const fd = new FormData(); fd.append('file', file);
    const token = localStorage.getItem('token');
    const res = await fetch('/api/documents/upload', { method: 'POST', headers: token ? { Authorization: `Bearer ${token}` } : undefined, body: fd });
    const json = await res.json();
    if (!res.ok) return alert(json?.error || 'upload failed');
    setDocs(d=>[...d, json]);
    setFile(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Documents</h2>
      <div className="mb-4">
        <input type="file" onChange={e=>setFile(e.target.files?.[0]||null)} />
        <button onClick={upload} className="ml-2 px-3 py-2 bg-emerald-600 text-white rounded">Upload</button>
      </div>
      <ul className="space-y-2">
        {docs.map(d=> (
          <li key={d.id} className="flex items-center justify-between bg-white p-3 rounded shadow-sm">
            <div>{d.original || d.filename}</div>
            <div>
              <a className="text-emerald-600 mr-4" href={`/api/documents/${d.id}/download`} target="_blank">Download</a>
              {user?.role === 'admin' && <a href="#" className="text-slate-600">Verify</a>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Documents;
