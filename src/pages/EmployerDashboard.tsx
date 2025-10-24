import React from 'react';
    import { Link } from 'react-router-dom';
    import { Users, Truck, FileText, CreditCard, TrendingUp, AlertCircle } from 'lucide-react';
    import { motion } from 'framer-motion';

    const EmployerDashboard: React.FC = () => {
      const stats = [
        { name: 'Active Employees', value: '24', icon: Users, color: 'text-emerald-600' },
        { name: 'Available Programs', value: '8', icon: Truck, color: 'text-sky-500' },
        { name: 'Pending Applications', value: '12', icon: FileText, color: 'text-yellow-500' },
        { name: 'Monthly Billing', value: '$4,800', icon: CreditCard, color: 'text-purple-500' },
      ];

      const recentActivity = [
        { id: 1, type: 'enrollment', message: 'John Doe enrolled in CDL Class A', time: '2 hours ago' },
        { id: 2, type: 'payment', message: 'Payment processed for 3 students', time: '1 day ago' },
        { id: 3, type: 'completion', message: 'Sarah Johnson completed her training', time: '3 days ago' },
      ];

      return (
        <div className="p-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 font-['Inter']">Employer Dashboard</h1>
            <p className="text-slate-600 mt-2">Manage your company's training programs and employees.</p>
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
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
              >
                <h2 className="text-xl font-semibold text-slate-900 font-['Inter'] mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    to="/employer/employees"
                    className="flex items-center space-x-3 p-4 bg-emerald-50 rounded-lg hover:bg-yellow-100 transition-colors"
                  >
                    <Users className="h-6 w-6 text-emerald-600" />
                    <span className="font-medium text-slate-900">Manage Employees</span>
                  </Link>
                  <Link
                    to="/employer/programs"
                    className="flex items-center space-x-3 p-4 bg-emerald-50 rounded-lg hover:bg-sky-100 transition-colors"
                  >
                    <Truck className="h-6 w-6 text-sky-500" />
                    <span className="font-medium text-slate-900">View Programs</span>
                  </Link>
                  <Link
                    to="/employer/billing"
                    className="flex items-center space-x-3 p-4 bg-emerald-50 rounded-lg hover:bg-yellow-100 transition-colors"
                  >
                    <CreditCard className="h-6 w-6 text-yellow-500" />
                    <span className="font-medium text-slate-900">Billing & Payments</span>
                  </Link>
                  <Link
                    to="/employer/settings"
                    className="flex items-center space-x-3 p-4 bg-emerald-50 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    <TrendingUp className="h-6 w-6 text-purple-500" />
                    <span className="font-medium text-slate-900">Account Settings</span>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
              >
                <h3 className="text-lg font-semibold text-slate-900 font-['Inter'] mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-900">{activity.message}</p>
                        <p className="text-xs text-slate-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Notifications */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
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
                      <p className="text-sm text-slate-900">New program available: Advanced Safety Training</p>
                      <p className="text-xs text-slate-500">Enroll employees today</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-emerald-400 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-900">Monthly billing cycle starts tomorrow</p>
                      <p className="text-xs text-slate-500">Review and approve charges</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      );
    };

    export default EmployerDashboard;