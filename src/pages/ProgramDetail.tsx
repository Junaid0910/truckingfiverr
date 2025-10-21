import React from 'react';
    import { useParams, Link } from 'react-router-dom';
    import Header from '../components/Header';
    import Footer from '../components/Footer';
    import { ArrowLeft, Clock, Users, CheckCircle, Star } from 'lucide-react';
    import { motion } from 'framer-motion';

    const ProgramDetail: React.FC = () => {
      const { id } = useParams<{ id: string }>();

      const programs = {
        'cdl-a': {
          title: 'CDL Class A',
          description: 'Comprehensive training for operating tractor-trailers and combination vehicles.',
          duration: '4-6 weeks',
          capacity: '12 students',
          price: '$4,500',
          rating: 4.8,
          reviews: 127,
          features: [
            'Pre-trip inspection training',
            'Backing and maneuvering',
            'On-road driving experience',
            'DOT physical assistance',
            'Job placement support',
            'Air brake systems',
            'Hazardous materials endorsement prep',
            'Emergency procedures'
          ],
          curriculum: [
            'Week 1-2: Classroom Theory',
            'Week 3-4: Behind-the-Wheel Training',
            'Week 5-6: Advanced Maneuvers & Testing'
          ],
          image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        'cdl-b': {
          title: 'CDL Class B',
          description: 'Training for straight trucks, large buses, and segmented buses.',
          duration: '3-4 weeks',
          capacity: '10 students',
          price: '$3,200',
          rating: 4.7,
          reviews: 89,
          features: [
            'Straight truck operation',
            'Air brake systems',
            'City driving skills',
            'Passenger endorsement',
            'Career guidance',
            'Vehicle maintenance basics',
            'Safety protocols'
          ],
          curriculum: [
            'Week 1: Classroom Fundamentals',
            'Week 2-3: Practical Training',
            'Week 4: Testing & Certification'
          ],
          image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        'refresher': {
          title: 'Refresher Course',
          description: 'Perfect for drivers returning to the industry or needing skill updates.',
          duration: '1-2 weeks',
          capacity: '8 students',
          price: '$1,800',
          rating: 4.9,
          reviews: 56,
          features: [
            'Skills assessment',
            'Updated regulations',
            'Confidence building',
            'Equipment familiarization',
            'Quick job placement',
            'Latest safety standards'
          ],
          curriculum: [
            'Day 1-3: Review & Assessment',
            'Day 4-7: Hands-on Practice',
            'Day 8-10: Final Evaluation'
          ],
          image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        }
      };

      const program = programs[id as keyof typeof programs];

      if (!program) {
        return (
          <div className="min-h-screen">
            <Header />
            <main className="pt-16 flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-900 mb-4">Program Not Found</h1>
                <Link to="/programs" className="text-emerald-600 hover:text-emerald-700">
                  Back to Programs
                </Link>
              </div>
            </main>
            <Footer />
          </div>
        );
      }

      return (
        <div className="min-h-screen">
          <Header />
          <main className="pt-16">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-emerald-50 via-white to-sky-50 py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                  to="/programs"
                  className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Programs
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h1 className="text-4xl font-bold text-slate-900 font-['Inter'] mb-4">
                      {program.title}
                    </h1>
                    <p className="text-xl text-slate-600 mb-6">
                      {program.description}
                    </p>

                    <div className="flex items-center space-x-6 mb-6">
                      <div className="flex items-center space-x-1">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="font-semibold">{program.rating}</span>
                        <span className="text-slate-500">({program.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center space-x-1 text-slate-600">
                        <Clock className="h-4 w-4" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-slate-600">
                        <Users className="h-4 w-4" />
                        <span>{program.capacity}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className="text-3xl font-bold text-emerald-600 font-['Inter']">
                        {program.price}
                      </span>
                      <span className="text-slate-500">total program cost</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative"
                  >
                    <img
                      src={program.image}
                      alt={`${program.title} training`}
                      className="w-full h-96 object-cover rounded-2xl shadow-xl"
                    />
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Details Section */}
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  {/* Features */}
                  <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-slate-900 font-['Inter'] mb-6">Program Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {program.features.map((feature, index) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center space-x-3"
                        >
                          <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                          <span className="text-slate-700">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 font-['Inter'] mt-12 mb-6">Curriculum Overview</h2>
                    <div className="space-y-4">
                      {program.curriculum.map((item, index) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg"
                        >
                          <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-semibold">
                            {index + 1}
                          </div>
                          <span className="text-slate-900 font-medium">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Enrollment Card */}
                  <div className="lg:col-span-1">
                    <div className="bg-slate-50 rounded-xl p-6 sticky top-6">
                      <h3 className="text-xl font-bold text-slate-900 font-['Inter'] mb-4">Ready to Start?</h3>
                      <p className="text-slate-600 mb-6">
                        Enroll today and begin your journey to becoming a professional truck driver.
                      </p>

                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Program Cost</span>
                          <span className="font-semibold">{program.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Duration</span>
                          <span className="font-semibold">{program.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Class Size</span>
                          <span className="font-semibold">{program.capacity}</span>
                        </div>
                      </div>

                      <Link
                        to="/register"
                        className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors text-center block"
                      >
                        Enroll Now
                      </Link>

                      <p className="text-xs text-slate-500 mt-4 text-center">
                        Financing options available. No payment required until class starts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      );
    };

    export default ProgramDetail;