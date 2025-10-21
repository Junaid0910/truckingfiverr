import React, { useState } from 'react';
    import Header from '../components/Header';
    import Footer from '../components/Footer';
    import { Search, MapPin, Clock, Building, Filter, Briefcase } from 'lucide-react';
    import { motion } from 'framer-motion';
    import { toast } from 'react-toastify';

    const Jobs: React.FC = () => {
      const [searchTerm, setSearchTerm] = useState('');
      const [locationFilter, setLocationFilter] = useState('');
      const [typeFilter, setTypeFilter] = useState('');

      const jobs = [
        {
          id: 1,
          title: 'OTR Truck Driver',
          company: 'Swift Transportation',
          location: 'Dallas, TX',
          salary: '$65,000 - $85,000',
          type: 'Full-time',
          description: 'Seeking experienced OTR drivers for regional and long-haul routes. Home weekly with competitive pay and benefits.',
          requirements: ['CDL-A required', '2+ years experience', 'Clean driving record'],
          posted: '2 days ago',
          urgent: true
        },
        {
          id: 2,
          title: 'Local Delivery Driver',
          company: 'Werner Enterprises',
          location: 'Houston, TX',
          salary: '$55,000 - $65,000',
          type: 'Full-time',
          description: 'Local delivery routes with daily home time. Perfect for drivers preferring predictable schedules.',
          requirements: ['CDL-B preferred', '1+ years experience', 'Local knowledge helpful'],
          posted: '1 week ago',
          urgent: false
        },
        {
          id: 3,
          title: 'Regional Driver',
          company: 'Schneider National',
          location: 'Austin, TX',
          salary: '$60,000 - $75,000',
          type: 'Full-time',
          description: 'Regional driving opportunities with consistent routes and excellent benefits package.',
          requirements: ['CDL-A required', '1+ years experience', 'Regional experience preferred'],
          posted: '3 days ago',
          urgent: false
        },
        {
          id: 4,
          title: 'Owner Operator',
          company: 'CRST International',
          location: 'San Antonio, TX',
          salary: '$120,000 - $150,000',
          type: 'Contract',
          description: 'Owner operator opportunities with competitive revenue sharing and dedicated support.',
          requirements: ['CDL-A required', 'Own truck', 'Business experience preferred'],
          posted: '5 days ago',
          urgent: true
        },
        {
          id: 5,
          title: 'Flatbed Driver',
          company: 'Pride Transport',
          location: 'Fort Worth, TX',
          salary: '$70,000 - $90,000',
          type: 'Full-time',
          description: 'Specialized flatbed driving with premium pay for experienced flatbed drivers.',
          requirements: ['CDL-A required', 'Flatbed experience', 'TWIC card preferred'],
          posted: '1 day ago',
          urgent: false
        },
        {
          id: 6,
          title: 'Company Driver',
          company: 'US Xpress',
          location: 'Dallas, TX',
          salary: '$58,000 - $72,000',
          type: 'Full-time',
          description: 'Company driver positions with modern equipment and comprehensive benefits.',
          requirements: ['CDL-A required', '6 months experience', 'Team player'],
          posted: '4 days ago',
          urgent: false
        }
      ];

      const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             job.company.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
        const matchesType = !typeFilter || job.type === typeFilter;
        return matchesSearch && matchesLocation && matchesType;
      });

      const handleApply = () => {
        toast.success('Application submitted successfully! The employer will contact you soon.');
      };

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
                    Find Your Next Driving Job
                  </h1>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
                    Connect with top carriers and trucking companies. Our graduates enjoy a 90% job placement rate within 30 days.
                  </p>

                  {/* Search and Filters */}
                  <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Job title or company"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Location"
                          value={locationFilter}
                          onChange={(e) => setLocationFilter(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                      <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="">All Types</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Contract">Contract</option>
                      </select>
                      <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2">
                        <Filter className="h-4 w-4" />
                        <span>Search</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Jobs List */}
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 font-['Inter']">
                    Available Positions ({filteredJobs.length})
                  </h2>
                  <div className="text-sm text-slate-600">
                    Showing {filteredJobs.length} of {jobs.length} jobs
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredJobs.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-xl font-semibold text-slate-900">{job.title}</h3>
                            {job.urgent && (
                              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                                Urgent
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-slate-600 mb-3">
                            <div className="flex items-center space-x-1">
                              <Building className="h-4 w-4" />
                              <span>{job.company}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{job.posted}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 text-emerald-600 font-semibold mb-1">
                            <span>{job.salary}</span>
                          </div>
                          <span className="text-xs text-slate-500">{job.type}</span>
                        </div>
                      </div>

                      <p className="text-slate-600 mb-4">{job.description}</p>

                      <div className="mb-4">
                        <h4 className="font-medium text-slate-900 mb-2">Requirements:</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.requirements.map((req, idx) => (
                            <span
                              key={idx}
                              className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs"
                            >
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleApply()}
                          className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                        >
                          Apply Now
                        </button>
                        <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                          Save Job
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredJobs.length === 0 && (
                  <div className="text-center py-12">
                    <Briefcase className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">No jobs found</h3>
                    <p className="text-slate-600">Try adjusting your search criteria</p>
                  </div>
                )}
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-slate-900 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold font-['Inter'] mb-4">
                    Ready to Start Your Career?
                  </h2>
                  <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                    Join The Trucking Vault and get the training and job placement support you need to succeed.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/register"
                      className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                    >
                      Enroll Today
                    </a>
                    <a
                      href="/contact"
                      className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-slate-900 transition-colors"
                    >
                      Contact Us
                    </a>
                  </div>
                </motion.div>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      );
    };

    export default Jobs;