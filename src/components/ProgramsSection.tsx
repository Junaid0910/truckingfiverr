import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Clock, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ProgramsSection: React.FC = () => {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const demoPrograms = [
    { id: 'demo-1', title: 'CDL Class A — Full Program', description: 'Comprehensive Class A training with hands-on hours and road time.', duration: '4-6 weeks', capacity: '24', price: '$4,500', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=60' },
    { id: 'demo-2', title: 'Refresher Course — Short', description: 'Quick skills refresh for returning drivers.', duration: '1-2 weeks', capacity: '12', price: '$1,800', image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=60' },
    { id: 'demo-3', title: 'Advanced Night Driving', description: 'Specialized night-ops driving practice for experienced drivers.', duration: '2-3 weeks', capacity: '10', price: '$2,200', image: 'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=800&q=60' }
  ];

  useEffect(() => {
    let mounted = true;
    import('../lib/api').then(({ api }) => {
      api.get('/programs').then((data: any) => {
        if (!mounted) return;
        setPrograms(data || []);
      }).catch(err => {
        console.error('failed to load programs', err);
        setPrograms([]);
      }).finally(()=> setLoading(false));
    });
    return ()=>{ mounted = false; };
  }, []);

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-slate-900 font-['Inter'] mb-4"
          >
            Choose Your Training Program
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-slate-600 max-w-3xl mx-auto"
          >
            Professional CDL training programs designed to get you road-ready and job-ready. 
            All programs include hands-on training with modern equipment.
          </motion.p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (<div>Loading...</div>) : (programs && programs.length ? programs : demoPrograms).map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-slate-100"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={program.image || 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
                  alt={`${program.title} training program`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-['Inter'] mb-2">
                    {program.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {program.description}
                  </p>
                </div>

                {/* Program Details */}
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" aria-hidden="true" />
                    <span>{program.capacity}</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-slate-900 font-['Inter']">
                        {program.price}
                      </span>
                      <span className="text-sm text-slate-500 ml-1">total</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link
                      to={`/programs/${program.id}`}
                      className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors group"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </Link>
                    <button
                      onClick={() => { toast.info('Demo enroll — this simulates enrolling and will appear in My Courses'); window.location.href = '/student/courses'; }}
                      className="flex-1 inline-flex items-center justify-center px-4 py-3 border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      Enroll (Demo)
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;