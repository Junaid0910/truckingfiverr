import React, { useState } from 'react';
    import Header from '../components/Header';
    import Footer from '../components/Footer';
    import { Search, MapPin, Clock, Building, Filter, Briefcase } from 'lucide-react';
    import { motion } from 'framer-motion';
    import { toast } from 'react-toastify';

    // Demo jobs shown immediately while API loads
    const demoJobs = [
      {
        id: 'demo-1',
        title: 'Class A CDL Driver - OTR',
        company: 'Ace Trucking Co.',
        location: 'Dallas, TX',
        posted: '2 days ago',
        description: 'Regional and OTR lanes, competitive pay, benefits.',
        requirements: ['Valid CDL-A', '2+ years experience', 'Clean MVR'],
        salary: '$1,200/wk',
        type: 'Full-time',
        remote: false,
        urgent: true,
        experience: 'mid'
      },
      {
        id: 'demo-2',
        title: 'Local Delivery Driver',
        company: 'City Freight',
        location: 'San Diego, CA',
        posted: '1 week ago',
        description: 'Local routes, home daily, steady schedule.',
        requirements: ['CDL preferred', 'Customer service skills'],
        salary: '$650/wk',
        type: 'Contract',
        remote: true,
        experience: 'entry'
      },
      {
        id: 'demo-3',
        title: 'Night Shift Driver - Refrigerated',
        company: 'CoolTrans',
        location: 'Atlanta, GA',
        posted: '3 days ago',
        description: 'Night shifts, refrigerated cargo experience a plus.',
        requirements: ['CDL-A', 'Experience with reefers'],
        salary: '$1,000/wk',
        type: 'Full-time',
        remote: false,
        experience: 'senior'
      },
      {
        id: 'demo-4',
        title: 'Flatbed Driver - Regional',
        company: 'North Ridge Logistics',
        location: 'Minneapolis, MN',
        posted: '4 days ago',
        description: 'Regional flatbed lanes with consistent miles and stop pay.',
        requirements: ['CDL-A', 'Flatbed experience preferred'],
        salary: '$1,100/wk',
        type: 'Full-time',
        remote: false,
        experience: 'mid'
      },
      {
        id: 'demo-5',
        title: 'HazMat Certified Driver',
        company: 'Shield Carriers',
        location: 'Houston, TX',
        posted: '6 days ago',
        description: 'HazMat routes; strong safety culture and training provided.',
        requirements: ['CDL-A', 'HazMat endorsement'],
        salary: '$1,350/wk',
        type: 'Full-time',
        remote: false,
        experience: 'senior',
        urgent: true
      },
      {
        id: 'demo-6',
        title: 'Part-Time Shuttle Driver',
        company: 'GreenCity Shuttle',
        location: 'Portland, OR',
        posted: '2 weeks ago',
        description: 'Flexible evening and weekend shifts. No CDL required for shuttle routes.',
        requirements: ['Clean driving record'],
        salary: '$20/hr',
        type: 'Part-time',
        remote: true,
        experience: 'entry'
      },
      {
        id: 'demo-7',
        title: 'Diesel Technician / Driver Hybrid',
        company: 'FleetWorks',
        location: 'Cleveland, OH',
        posted: '3 days ago',
        description: 'Maintain small fleet and run local deliveries as needed.',
        requirements: ['Diesel tech experience', 'Valid driver license'],
        salary: '$28/hr',
        type: 'Full-time',
        remote: false,
        experience: 'mid'
      }
    ];

    const Jobs: React.FC = () => {
      const [searchTerm, setSearchTerm] = useState('');
      const [locationFilter, setLocationFilter] = useState('');
      const [typeFilter, setTypeFilter] = useState('');
      const [remoteOnly, setRemoteOnly] = useState(false);

  const [jobs, setJobs] = React.useState<any[]>(demoJobs);
      const [experienceLevel, setExperienceLevel] = useState('');
      const [salaryMin, setSalaryMin] = useState('');
      const [salaryMax, setSalaryMax] = useState('');
      const [sortBy, setSortBy] = useState('recent');

      // demoJobs moved to file scope for immediate rendering

      React.useEffect(()=>{
        let mounted = true;
        import('../lib/api').then(({ api }) => {
          api.get('/jobs').then((rows:any)=>{ if (!mounted) return; setJobs((rows && rows.length) ? rows : demoJobs); }).catch(err=>{ console.error('failed to load jobs', err); setJobs(demoJobs); });
        });
        return ()=>{ mounted=false; };
      }, []);

      // compute filtered jobs with additional filters
      const filteredJobs = jobs.filter(job => {
        const title = (job.title || job.position || '').toString();
        const company = (job.company || '').toString();
        const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) || company.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLocation = !locationFilter || (job.location||'').toLowerCase().includes(locationFilter.toLowerCase());
        const matchesType = !typeFilter || job.type === typeFilter;
        const matchesExperience = !experienceLevel || (job.experience||'').toLowerCase() === experienceLevel.toLowerCase();
        const salaryNum = Number((job.salary||'').toString().replace(/[^0-9]/g, '')) || 0;
        const minOk = !salaryMin || salaryNum >= Number(salaryMin);
        const maxOk = !salaryMax || salaryNum <= Number(salaryMax);
        const matchesRemote = !remoteOnly || job.remote === true;
        return matchesSearch && matchesLocation && matchesType && matchesRemote && matchesExperience && minOk && maxOk;
      });

      // apply sort
      if (sortBy === 'salary') {
        filteredJobs.sort((a,b) => {
          const na = Number((a.salary||'').toString().replace(/[^0-9]/g, '')) || 0;
          const nb = Number((b.salary||'').toString().replace(/[^0-9]/g, '')) || 0;
          return nb - na;
        });
      }

      const handleApply = async (id?: any) => {
        try {
          if (!id) return;
          const { api } = await import('../lib/api');
          await api.post(`/jobs/${id}/apply`);
          toast.success('Application submitted successfully! The employer will contact you soon.');
        } catch(err:any) {
          toast.error(err?.data?.error || err.message || 'Apply failed');
        }
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
                      <div className="space-y-2">
                        <select
                          value={typeFilter}
                          onChange={(e) => setTypeFilter(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="">All Types</option>
                          <option value="Full-time">Full-time</option>
                          <option value="Contract">Contract</option>
                        </select>
                        <select value={experienceLevel} onChange={(e)=>setExperienceLevel(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                          <option value="">Any experience</option>
                          <option value="entry">Entry</option>
                          <option value="mid">Mid</option>
                          <option value="senior">Senior</option>
                        </select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <label className="inline-flex items-center space-x-2">
                          <input type="checkbox" checked={remoteOnly} onChange={(e)=>setRemoteOnly(e.target.checked)} className="h-4 w-4" />
                          <span className="text-sm text-slate-600">Remote only</span>
                        </label>
                        <div className="flex items-center space-x-2">
                          <input placeholder="Min $" value={salaryMin} onChange={(e)=>setSalaryMin(e.target.value)} className="w-20 px-2 py-2 border rounded" />
                          <input placeholder="Max $" value={salaryMax} onChange={(e)=>setSalaryMax(e.target.value)} className="w-20 px-2 py-2 border rounded" />
                          <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} className="px-3 py-2 border rounded">
                            <option value="recent">Sort: Recent</option>
                            <option value="salary">Sort: Salary</option>
                          </select>
                          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2">
                            <Filter className="h-4 w-4" />
                            <span>Search</span>
                          </button>
                        </div>
                      </div>
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
                    Available Positions ({filteredJobs.length || demoJobs.length})
                  </h2>
                  <div className="text-sm text-slate-600">
                    Showing {filteredJobs.length || demoJobs.length} of {(jobs && jobs.length) || demoJobs.length} jobs
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {(filteredJobs.length ? filteredJobs : demoJobs).map((job, index) => (
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
                            <h3 className="text-xl font-semibold text-slate-900">{job.title || job.position || 'Untitled position'}</h3>
                            {job.urgent && (
                              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                                Urgent
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-slate-600 mb-3">
                            <div className="flex items-center space-x-1">
                              <Building className="h-4 w-4" />
                              <span>{job.company || ''}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{job.location || ''}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{job.posted}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 text-emerald-600 font-semibold mb-1">
                            <span>{job.salary || ''}</span>
                          </div>
                          <span className="text-xs text-slate-500">{job.type || ''}</span>
                        </div>
                      </div>

                      <p className="text-slate-600 mb-4">{job.description || ''}</p>

                      <div className="mb-4">
                        <h4 className="font-medium text-slate-900 mb-2">Requirements:</h4>
                        <div className="flex flex-wrap gap-2">
                          {(job.requirements || []).map((req:any, idx:number) => (
                            <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs">{req}</span>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <button onClick={() => handleApply(job.id)} className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-medium">Apply Now</button>
                        <button onClick={()=>{
                          const saved = JSON.parse(localStorage.getItem('savedJobs')||'[]');
                          if (!saved.includes(job.id)) { saved.push(job.id); localStorage.setItem('savedJobs', JSON.stringify(saved)); toast.success('Job saved'); }
                          else { toast.info('Already saved'); }
                        }} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
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