import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { toast } from 'react-toastify';

const AdminReports: React.FC = () => {
  const [revenue, setRevenue] = useState<any>(null);
  const [enrollments, setEnrollments] = useState<any[]>([]);

  useEffect(()=>{
    (async ()=>{
      try {
        const r = await api.get('/reports/revenue');
        setRevenue(r);
      } catch (err:any) { toast.error('failed to load revenue'); }
      try {
        const e = await api.get('/reports/enrollments');
        setEnrollments(e||[]);
      } catch (err:any) { toast.error('failed to load enrollments report'); }
    })();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Reports</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Revenue</h3>
          <pre className="text-sm mt-2">{JSON.stringify(revenue, null, 2)}</pre>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Enrollments</h3>
          <ul className="mt-2 space-y-2">
            {enrollments.map((row:any)=>(<li key={row.id} className="text-sm">Program {row.programId} — {row.count}</li>))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
 
