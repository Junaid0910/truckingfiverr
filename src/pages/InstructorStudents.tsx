import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { toast } from 'react-toastify';

const InstructorStudents: React.FC = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    (async ()=>{
      setLoading(true);
      try {
        // Try to fetch enrollments (admin) - if not allowed, server may return 403
        const rows = await api.get('/enrollments');
        // Map enrollments to student profiles if available
        setStudents(rows || []);
      } catch (err:any) {
        toast.error(err?.data?.error || err.message || 'Failed to load students');
      } finally { setLoading(false); }
    })();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Students</h2>
      {loading ? <div>Loading...</div> : (
        <ul className="space-y-3">
          {students.map((s:any)=>(
            <li key={s.id} className="bg-white p-3 rounded shadow">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">Student ID: {s.userId}</div>
                  <div className="text-sm text-gray-600">Program: {s.programId} — Status: {s.status}</div>
                </div>
                <div>
                  <button className="px-3 py-1 bg-sky-600 text-white rounded">View</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InstructorStudents;
 
