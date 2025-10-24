import React, { useState } from 'react';
import { api } from '../lib/api';

const Resumes: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploads, setUploads] = useState<any[]>([]);

  const createUpload = async () => {
    if (!file) return alert('choose file');
    try {
      const res = await api.post('/resumes/upload-url', { filename: file.name, contentType: file.type });
      if (res.uploadUrl) {
        // upload directly to signed URL
        await fetch(res.uploadUrl, { method: 'PUT', headers: { 'Content-Type': file.type }, body: file });
        setUploads(u=>[...(u||[]), res.meta]);
        alert('Uploaded');
      } else {
        alert('Use /api/documents/upload fallback (local)');
      }
    } catch (err:any) { alert(err?.data?.error || err.message || 'upload failed'); }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Resumes</h2>
      <div className="mb-4">
        <input type="file" onChange={e=>setFile(e.target.files?.[0]||null)} />
        <button onClick={createUpload} className="ml-2 px-3 py-2 bg-emerald-600 text-white rounded">Upload Resume</button>
      </div>
      <ul className="space-y-2">
        {uploads.map(u=> <li key={u.id} className="bg-white p-3 rounded shadow">{u.key || u.url}</li>)}
      </ul>
    </div>
  );
};

export default Resumes;
