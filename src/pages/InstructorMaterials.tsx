import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { toast } from 'react-toastify';

const InstructorMaterials: React.FC = () => {
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    (async ()=>{
      setLoading(true);
      try {
        // try to read documents (instructor may have access)
        const docs = await api.get('/documents');
        setMaterials(docs || []);
      } catch (err:any) { toast.error(err?.data?.error || 'Failed to load materials'); }
      finally { setLoading(false); }
    })();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Course Materials</h2>
      {loading ? <div>Loading...</div> : (
        <ul className="space-y-3">
          {materials.map(m=> (
            <li key={m.id} className="bg-white p-3 rounded shadow">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">{m.filename || m.key || m.name}</div>
                  <div className="text-sm text-gray-600">Uploaded: {m.created_at}</div>
                </div>
                <div>
                  <a className="px-3 py-1 bg-emerald-600 text-white rounded" href={`/api/documents/${m.id}/download`}>Download</a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InstructorMaterials;
 
