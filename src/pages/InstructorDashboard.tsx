import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, BookOpen, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../lib/api';
import { toast } from 'react-toastify';

const InstructorDashboard: React.FC = () => {
  const [programsCount, setProgramsCount] = useState<number | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const stats = [
    { name: 'Active Students', value: profile?.activeStudents || '—', icon: Users, color: 'text-emerald-600' },
    { name: 'Classes Today', value: profile?.classesToday || '—', icon: Calendar, color: 'text-sky-500' },
    { name: 'Available Programs', value: programsCount ?? '—', icon: Clock, color: 'text-yellow-500' },
    { name: 'Completion Rate', value: profile?.completionRate ? `${profile.completionRate}%` : '—', icon: CheckCircle, color: 'text-purple-500' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Excellent': return 'text-emerald-600 bg-emerald-50';
      case 'Good': return 'text-sky-600 bg-sky-50';
      case 'On Track': return 'text-yellow-600 bg-yellow-50';
      case 'Needs Help': return 'text-red-600 bg-red-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const programs = await api.get('/programs');
        const prof = await api.get('/profiles/me');
        if (!mounted) return;
        setProgramsCount(Array.isArray(programs) ? programs.length : 0);
        setProfile(prof?.profile || prof?.user || null);
      } catch (err: any) {
        setError(err?.message || 'Failed to load dashboard data');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const [clocking, setClocking] = useState(false);
  const [clockedEntry, setClockedEntry] = useState<any | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleStartClass = async () => {
    setClocking(true);
    try {
      await api.post('/attendance/clockin', { note: 'Started from dashboard' });
      setClockedEntry({ startedAt: new Date().toISOString() });
      toast.success('Class started (clocked in)');
    } catch (err: any) {
      toast.error(err?.data?.error || err.message || 'Failed to start class');
    } finally { setClocking(false); }
  };

  const handleClockOut = async () => {
    setClocking(true);
    try {
      const resp = await api.post('/attendance/clockout');
      setClockedEntry({ ...clockedEntry, endedAt: new Date().toISOString(), durationMinutes: resp?.durationMinutes });
      toast.success(`Clocked out — duration ${resp?.durationMinutes ?? 'n/a'} minutes`);
    } catch (err: any) {
      toast.error(err?.data?.error || err.message || 'Failed to clock out');
    } finally { setClocking(false); }
  };

  const handleTakeAttendance = async () => {
    try {
      const programs = await api.get('/programs');
      const programId = profile?.programId || (Array.isArray(programs) && programs.length ? programs[0].id : null);
      if (!programId) return toast.error('No program selected for attendance');
      await api.post('/attendance/checkin', { programId });
      toast.success('Attendance checked in');
    } catch (err: any) {
      toast.error(err?.data?.error || err.message || 'Failed to take attendance');
    }
  };

  const handleUploadMaterial = async (file?: File) => {
    if (!file) return toast.error('No file selected');
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch((window.location.origin || '') + '/api/documents/upload', { method: 'POST', body: fd, headers: { 'Accept': 'application/json' }, credentials: 'same-origin' });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'upload failed');
      toast.success('Material uploaded');
    } catch (err: any) {
      toast.error(err?.data?.error || err.message || 'Upload failed');
    } finally { setUploading(false); }
  };

  const handleGradeAssignment = async () => {
    try {
      const to = window.prompt('Enter student identifier or email to notify about grade:');
      if (!to) return;
      const payload = { subject: 'Assignment graded', text: 'Your assignment was graded by instructor.' };
      await api.post('/notifications/enqueue', { type: 'email', to, payload });
      toast.success('Student notified about grade');
    } catch (err: any) {
      toast.error(err?.data?.error || err.message || 'Failed to notify student');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 font-['Inter']">Good morning, Instructor!</h1>
        <p className="text-slate-600 mt-2">{loading ? 'Loading...' : error ? error : `You have ${profile?.classesToday || 0} classes scheduled for today.`}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">{stat.name}</p>
                <p className="text-2xl font-bold text-slate-900 font-['Inter'] mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-slate-50`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} aria-hidden="true" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Today's Classes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900 font-['Inter']">Today's Classes</h2>
              <Link to="/instructor/schedule" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                View Full Schedule
              </Link>
            </div>
            <div className="space-y-4">
              {profile?.todayClasses && Array.isArray(profile.todayClasses) && profile.todayClasses.length > 0 ? (
                profile.todayClasses.map((class_: any) => (
                  <div key={class_.id} className="border border-slate-200 rounded-lg p-4 hover:border-emerald-300 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-900">{class_.title}</h3>
                        <p className="text-sm text-slate-600 mt-1">{class_.time}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-slate-500">{class_.students} students</span>
                          <span className="text-sm text-slate-500">{class_.room}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button type="button" onClick={handleStartClass} disabled={clocking} className="px-3 py-1 bg-emerald-600 text-white text-sm rounded-md hover:bg-emerald-700 transition-colors">
                          {clocking ? 'Starting...' : 'Start Class'}
                        </button>
                        <button type="button" onClick={() => { /* placeholder for details modal */ }} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-md hover:bg-slate-200 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-600">No classes scheduled for today.</p>
              )}
            </div>
          </motion.div>

          {/* Clock In/Out */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
          >
            <h2 className="text-xl font-semibold text-slate-900 font-['Inter'] mb-6">Time Tracking</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Current Status</p>
                <p className="text-lg font-semibold text-emerald-600">Clocked In</p>
                <p className="text-sm text-slate-500">Since 8:30 AM (2h 30m)</p>
              </div>
              <div className="flex space-x-3">
                <button type="button" onClick={handleClockOut} disabled={clocking} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  {clocking ? 'Working...' : 'Clock Out'}
                </button>
                <button type="button" onClick={() => { /* take a break */ }} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                  Break
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Students */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900 font-['Inter']">Recent Students</h3>
              <Users className="h-5 w-5 text-slate-400" aria-hidden="true" />
            </div>
            <div className="space-y-4">
              {profile?.recentStudents && Array.isArray(profile.recentStudents) && profile.recentStudents.length > 0 ? (
                profile.recentStudents.map((student: any) => (
                  <div key={student.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{student.name}</p>
                      <p className="text-xs text-slate-500">{student.lastActivity}</p>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                        <div 
                          className="bg-emerald-600 h-1.5 rounded-full" 
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="ml-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(student.status)}`}>
                        {student.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-600">No recent students to show.</p>
              )}
            </div>
            <Link
              to="/instructor/students"
              className="block w-full mt-4 px-4 py-2 bg-emerald-50 text-emerald-600 text-center text-sm font-medium rounded-lg hover:bg-emerald-100 transition-colors"
            >
              View All Students
            </Link>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
          >
            <h3 className="text-lg font-semibold text-slate-900 font-['Inter'] mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button onClick={()=>{ const f = window.prompt('Paste public file URL or leave blank to upload'); if (f) { handleUploadMaterial(); } }} disabled={uploading} className="w-full flex items-center space-x-3 px-4 py-3 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
                <span className="text-sm font-medium">{uploading ? 'Uploading...' : 'Upload Course Material'}</span>
              </button>
              <button onClick={handleTakeAttendance} className="w-full flex items-center space-x-3 px-4 py-3 bg-sky-50 text-sky-700 rounded-lg hover:bg-sky-100 transition-colors">
                <Users className="h-5 w-5" aria-hidden="true" />
                <span className="text-sm font-medium">Take Attendance</span>
              </button>
              <button onClick={handleGradeAssignment} className="w-full flex items-center space-x-3 px-4 py-3 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors">
                <CheckCircle className="h-5 w-5" aria-hidden="true" />
                <span className="text-sm font-medium">Grade Assignments</span>
              </button>
            </div>
          </motion.div>

          {/* Alerts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900 font-['Inter']">Alerts</h3>
              <AlertTriangle className="h-5 w-5 text-yellow-500" aria-hidden="true" />
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-slate-900">3 students need attention</p>
                  <p className="text-xs text-slate-500">Below 70% progress</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-slate-900">Equipment maintenance due</p>
                  <p className="text-xs text-slate-500">Truck #3 needs inspection</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;