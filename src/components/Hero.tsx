import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Award, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const stats = [
    { icon: Users, label: 'Students Trained', value: '2,500+' },
    { icon: Award, label: 'Success Rate', value: '95%' },
    { icon: Briefcase, label: 'Job Placement', value: '90%' },
  ];

  const benefits = [
    'DOT Certified Training Programs',
    'Experienced Professional Instructors',
    'Job Placement Assistance',
    'Flexible Payment Options',
    'Modern Training Equipment',
    'Comprehensive Support System',
  ];

  return (
    <section className="relative bg-card overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-['Inter'] leading-tight">
                Launch Your{' '}
                <span className="text-primary">Trucking Career</span>{' '}
                Today
              </h1>
              <p className="text-xl text-muted leading-relaxed max-w-2xl">
                Professional CDL training with comprehensive job placement services. 
                Join thousands of successful drivers who started their journey with us.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                  <span className="text-muted text-sm font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl group"
              >
                Start Your Training
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <Link
                to="/programs"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-primary font-semibold rounded-lg border-2 border-primary hover:bg-primary/10 transition-colors"
              >
                View Programs
              </Link>
            </div>

            {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t" style={{ borderColor: 'var(--color-border)' }}>
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-2">
                    <stat.icon className="h-8 w-8 text-emerald-600" aria-hidden="true" />
                  </div>
                  <div className="text-2xl font-bold text-white font-['Inter']">{stat.value}</div>
                  <div className="text-sm text-muted">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Professional truck driver in training"
                className="w-full h-[500px] lg:h-[600px] object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute -bottom-6 -left-6 bg-card rounded-xl shadow-xl p-6 border"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-card rounded-full p-3">
                  <Award className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-semibold text-white font-['Inter']">DOT Certified</div>
                  <div className="text-sm text-muted">Training Programs</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;