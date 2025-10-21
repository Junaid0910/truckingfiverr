import React from 'react';
    import { Link } from 'react-router-dom';
    import { Calendar, CreditCard, Briefcase, Award, Clock, TrendingUp, AlertCircle } from 'lucide-react';
    import { motion } from 'framer-motion';

    const StudentDashboard: React.FC = () => {
      const upcomingClasses = [
        { id: 1, title: 'Pre-Trip Inspection', time: '9:00 AM', date: 'Today', instructor: 'John Smith' },
        { id: 2, title: 'Backing Maneuvers', time: '2:00 PM', date: 'Tomorrow', instructor: 'Sarah Johnson' },
        { id: 3, title: 'Road Test Practice', time: '10:00 AM', date: 'Friday', instructor: 'Mike Wilson' },
      ];

      const courseProgress = [
        { name: 'Classroom Theory', progress: 85, total: 40, completed: 34 },
        { name: 'Driving Practice', progress: 60, total: 20, completed: 12 },
        { name: 'Pre-Trip Inspection', progress: 90, total: 10, completed: 9 },
      ];

      const recentJobs = [
        { id: 1, company: 'Swift Transportation', position: 'OTR Driver', location: 'Dallas, TX', salary: '$65,000' },
        { id: 2, company: 'Werner Enterprises', position: 'Regional Driver', location: 'Houston, TX', salary: '$58,000' },
        { id: 3, company: 'Schneider National', position: 'Local Driver', location: 'Austin, TX', salary: '$55,000' },
      ];

      const stats = [
        { name: 'Course Progress', value: '75%', icon: TrendingUp, color: 'text-emerald-600' },
        { name: 'Hours Completed', value: '120', icon: Clock, color: 'text-sky-500' },
        { name: 'Certificates', value: '3', icon: Award, color: 'text-yellow-500' },
        { name: 'Job Applications', value: '5', icon: Briefcase, color: 'text-purple-500' },
      ];

      return (
        <div className="p-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 font-['Inter']">Welcome back, Demo Student!</h1>
            <p className="text-slate-600 mt-2">Here's what's happening with your training today.</p>
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
              {/* Course Progress */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-slate-900 font-['Inter']">Course Progress</h2>
                  <Link to="/student/courses" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                    View All
                  </Link>
                </div>
                <div className="space-y-6">
                  {courseProgress.map((course, index) => (
                    <div key={course.name}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-slate-900">{course.name}</h3>
                        <span className="text-sm text-slate-600">{course.completed}/{course.total} lessons</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                          className="bg-emerald-600 h-2 rounded-full"
                        />
                      </div>
                      <div className="text-right mt-1">
                        <span className="text-sm font-medium text-emerald-600">{course.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Job Opportunities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-slate-900 font-['Inter']">Recent Job Opportunities</h2>
                  <Link to="/student/jobs" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                    View All Jobs
                  </Link>
                </div>
                <div className="space-y-4">
                  {recentJobs.map((job) => (
                    <div key={job.id} className="border border-slate-200 rounded-lg p-4 hover:border-emerald-300 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-slate-900">{job.position}</h3>
                          <p className="text-sm text-slate-600 mt-1">{job.company}</p>
                          <p className="text-sm text-slate-500">{job.location}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-emerald-600">{job.salary}</p>
                          <button className="mt-2 px-3 py-1 bg-emerald-600 text-white text-sm rounded-md hover:bg-emerald-700 transition-colors">
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Classes */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900 font-['Inter']">Upcoming Classes</h3>
                  <Calendar className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
                <div className="space-y-4">
                  {upcomingClasses.map((class_) => (
                    <div key={class_.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900">{class_.title}</p>
                        <p className="text-xs text-slate-500">{class_.date} at {class_.time}</p>
                        <p className="text-xs text-slate-600">with {class_.instructor}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  to="/student/schedule"
                  className="block w-full mt-4 px-4 py-2 bg-emerald-50 text-emerald-600 text-center text-sm font-medium rounded-lg hover:bg-emerald-100 transition-colors"
                >
                  View Full Schedule
                </Link>
              </motion.div>

              {/* Payment Status */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900 font-['Inter']">Payment Status</h3>
                  <CreditCard className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Total Tuition</span>
                    <span className="font-semibold text-slate-900">$4,500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Paid</span>
                    <span className="font-semibold text-emerald-600">$3,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Remaining</span>
                    <span className="font-semibold text-red-600">$1,500</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-3">
                    <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '67%' }}></div>
                  </div>
                </div>
                <Link
                  to="/student/payments"
                  className="block w-full mt-4 px-4 py-2 bg-sky-50 text-sky-600 text-center text-sm font-medium rounded-lg hover:bg-sky-100 transition-colors"
                >
                  Make Payment
                </Link>
              </motion.div>

              {/* Notifications */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900 font-['Inter']">Notifications</h3>
                  <AlertCircle className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-900">DOT Physical expires in 30 days</p>
                      <p className="text-xs text-slate-500">Please schedule renewal</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-emerald-400 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-900">New job posting matches your profile</p>
                      <p className="text-xs text-slate-500">Local driver position in Dallas</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      );
    };

    export default StudentDashboard;