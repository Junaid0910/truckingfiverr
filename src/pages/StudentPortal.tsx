import React from 'react';
    import { Link } from 'react-router-dom';
    import Header from '../components/Header';
    import Footer from '../components/Footer';
    import { User, BookOpen, Calendar, CreditCard, Briefcase, Phone, Mail } from 'lucide-react';
    import { motion } from 'framer-motion';

    const StudentPortal: React.FC = () => {
      const features = [
        {
          icon: BookOpen,
          title: 'Course Materials',
          description: 'Access your training materials, assignments, and progress tracking.',
          link: '/login',
          color: 'text-emerald-600'
        },
        {
          icon: Calendar,
          title: 'Class Schedule',
          description: 'View your upcoming classes, exams, and important dates.',
          link: '/login',
          color: 'text-sky-500'
        },
        {
          icon: CreditCard,
          title: 'Payment Portal',
          description: 'Manage payments, view billing history, and payment plans.',
          link: '/login',
          color: 'text-yellow-500'
        },
        {
          icon: Briefcase,
          title: 'Job Board',
          description: 'Browse available positions and track your job applications.',
          link: '/login',
          color: 'text-purple-500'
        }
      ];

      const quickLinks = [
        { name: 'Student Handbook', href: '/handbook.pdf' },
        { name: 'CDL Study Guide', href: '/study-guide.pdf' },
        { name: 'Safety Manual', href: '/safety-manual.pdf' },
        { name: 'Graduation Requirements', href: '/requirements.pdf' }
      ];

      return (
        <div className="min-h-screen">
          <Header />
          <main className="pt-16">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-emerald-50 via-white to-sky-50 py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center"
                >
                  <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 font-['Inter'] mb-6">
                    Student Portal
                  </h1>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
                    Access your training resources, track your progress, and manage your student account.
                  </p>
                  <Link
                    to="/login"
                    className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors inline-flex items-center space-x-2"
                  >
                    <User className="h-5 w-5" />
                    <span>Login to Portal</span>
                  </Link>
                </motion.div>
              </div>
            </section>

            {/* Features Grid */}
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 font-['Inter'] mb-4">
                    Portal Features
                  </h2>
                  <p className="text-xl text-slate-600">
                    Everything you need to succeed in your CDL training journey.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-slate-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
                    >
                      <div className="flex justify-center mb-4">
                        <feature.icon className={`h-12 w-12 ${feature.color}`} />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 font-['Inter'] mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 mb-4">{feature.description}</p>
                      <Link
                        to={feature.link}
                        className="text-emerald-600 hover:text-emerald-700 font-medium"
                      >
                        Access →
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Quick Links */}
            <section className="py-16 bg-slate-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-3xl font-bold text-slate-900 font-['Inter'] mb-6">
                      Quick Resources
                    </h2>
                    <p className="text-lg text-slate-600 mb-8">
                      Download important documents and study materials to support your training.
                    </p>
                    <div className="space-y-4">
                      {quickLinks.map((link) => (
                        <a
                          key={link.name}
                          href={link.href}
                          className="flex items-center space-x-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
                        >
                          <BookOpen className="h-5 w-5 text-emerald-600" />
                          <span className="text-slate-900 font-medium">{link.name}</span>
                        </a>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-8 shadow-lg"
                  >
                    <h3 className="text-2xl font-bold text-slate-900 font-['Inter'] mb-6">
                      Need Help?
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-emerald-600" />
                        <div>
                          <p className="font-medium text-slate-900">Student Support</p>
                          <p className="text-slate-600">(123) 456-7890</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-emerald-600" />
                        <div>
                          <p className="font-medium text-slate-900">Email Support</p>
                          <p className="text-slate-600">support@truckingvault.com</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-slate-200">
                      <p className="text-sm text-slate-600 mb-4">
                        Our student support team is available Monday-Friday, 8AM-6PM.
                      </p>
                      <Link
                        to="/contact"
                        className="text-emerald-600 hover:text-emerald-700 font-medium"
                      >
                        Contact Support →
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-emerald-600">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold text-white font-['Inter'] mb-4">
                    Ready to Access Your Portal?
                  </h2>
                  <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
                    Login to your student account to access all training resources and track your progress.
                  </p>
                  <Link
                    to="/login"
                    className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                  >
                    Login Now
                  </Link>
                </motion.div>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      );
    };

    export default StudentPortal;