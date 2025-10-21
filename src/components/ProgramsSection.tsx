import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Award, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ProgramsSection: React.FC = () => {
  const programs = [
    {
      id: 'cdl-a',
      title: 'CDL Class A',
      description: 'Comprehensive training for operating tractor-trailers and combination vehicles.',
      duration: '4-6 weeks',
      capacity: '12 students',
      price: '$4,500',
      features: [
        'Pre-trip inspection training',
        'Backing and maneuvering',
        'On-road driving experience',
        'DOT physical assistance',
        'Job placement support'
      ],
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      popular: true
    },
    {
      id: 'cdl-b',
      title: 'CDL Class B',
      description: 'Training for straight trucks, large buses, and segmented buses.',
      duration: '3-4 weeks',
      capacity: '10 students',
      price: '$3,200',
      features: [
        'Straight truck operation',
        'Air brake systems',
        'City driving skills',
        'Passenger endorsement',
        'Career guidance'
      ],
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      popular: false
    },
    {
      id: 'refresher',
      title: 'Refresher Course',
      description: 'Perfect for drivers returning to the industry or needing skill updates.',
      duration: '1-2 weeks',
      capacity: '8 students',
      price: '$1,800',
      features: [
        'Skills assessment',
        'Updated regulations',
        'Confidence building',
        'Equipment familiarization',
        'Quick job placement'
      ],
      image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      popular: false
    }
  ];

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
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-slate-100"
            >
              {program.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-yellow-400 text-slate-900 px-3 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={program.image}
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

                {/* Features */}
                <div className="space-y-2">
                  {program.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-emerald-600 flex-shrink-0" aria-hidden="true" />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
                  {program.features.length > 3 && (
                    <div className="text-sm text-slate-500">
                      +{program.features.length - 3} more features
                    </div>
                  )}
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
                    <div className="text-xs text-slate-500">
                      Financing available
                    </div>
                  </div>
                  
                  <Link
                    to={`/programs/${program.id}`}
                    className="w-full inline-flex items-center justify-center px-4 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors group"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-slate-600 mb-6">
            Not sure which program is right for you? Our advisors can help you choose.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition-colors"
          >
            Get Free Consultation
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgramsSection;