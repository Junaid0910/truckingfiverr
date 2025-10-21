import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, BookOpen, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const InstructorDashboard: React.FC = () => {
  const todayClasses = [
    { id: 1, title: 'CDL-A Theory', time: '9:00 AM - 11:00 AM', students: 12, room: 'Room A' },
    { id: 2, title: 'Backing Practice', time: '2:00 PM - 4:00 PM', students: 8, room: 'Yard 1' },
    { id: 3, title: 'Road Test Prep', time: '4:30 PM - 6:00 PM', students: 6, room: 'Yard 2' },
  ];

  const recentStudents = [
    { id: 1, name: 'John Doe', progress: 85, status: 'On Track', lastActivity: '2 hours ago' },
    { id: 2, name: 'Jane Smith', progress: 92, status: 'Excellent', lastActivity: '1 day ago' },
    { id: 3, name: 'Mike Johnson', progress: 65, status: 'Needs Help', lastActivity: '3 hours ago' },
    { id: 4, name: 'Sarah Wilson', progress: 78, status: 'Good', lastActivity: '5 hours ago' },
  ];

  const stats = [
    { name: 'Active Students', value: '24', icon: Users, color: 'text-emerald-600' },
    { name: 'Classes Today', value: '3', icon: Calendar, color: 'text-sky-500' },
    { name: 'Hours This Week', value: '32', icon: Clock, color: 'text-yellow-500' },
    { name: 'Completion Rate', value: '94%', icon: CheckCircle, color: 'text-purple-500' },
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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 font-['Inter']">Good morning, Instructor!</h1>
        <p className="text-slate-600 mt-2">You have 3 classes scheduled for today.</p>
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
              {todayClasses.map((class_) => (
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
                      <button className="px-3 py-1 bg-emerald-600 text-white text-sm rounded-md hover:bg-emerald-700 transition-colors">
                        Start Class
                      </button>
                      <button className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-md hover:bg-slate-200 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Clock Out
                </button>
                <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
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
              {recentStudents.map((student) => (
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
              ))}
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
              <button className="w-full flex items-center space-x-3 px-4 py-3 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
                <span className="text-sm font-medium">Upload Course Material</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-3 bg-sky-50 text-sky-700 rounded-lg hover:bg-sky-100 transition-colors">
                <Users className="h-5 w-5" aria-hidden="true" />
                <span className="text-sm font-medium">Take Attendance</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-3 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors">
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