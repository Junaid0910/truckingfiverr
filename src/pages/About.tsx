import React from 'react';
    import Header from '../components/Header';
    import Footer from '../components/Footer';
    import { Award, Users, Truck, Target, Heart, Shield } from 'lucide-react';
    import { motion } from 'framer-motion';

    const About: React.FC = () => {
      const stats = [
        { icon: Users, label: 'Students Trained', value: '2,500+', color: 'text-emerald-600' },
        { icon: Award, label: 'Success Rate', value: '95%', color: 'text-sky-500' },
        { icon: Truck, label: 'Fleet Size', value: '25', color: 'text-yellow-500' },
        { icon: Target, label: 'Job Placement', value: '90%', color: 'text-purple-500' },
      ];

      const values = [
        {
          icon: Heart,
          title: 'Student-Centered',
          description: 'We put our students first, providing personalized attention and support throughout their training journey.'
        },
        {
          icon: Shield,
          title: 'Safety First',
          description: 'Safety is our top priority. We teach industry-leading safety standards and best practices.'
        },
        {
          icon: Award,
          title: 'Excellence',
          description: 'We maintain the highest standards in training, equipment, and instructor qualifications.'
        },
        {
          icon: Users,
          title: 'Community',
          description: 'Building a supportive community of professional drivers who help each other succeed.'
        }
      ];

      const team = [
        {
          name: 'John Smith',
          role: 'Founder & CEO',
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          bio: '25+ years in trucking industry, former OTR driver and fleet manager.'
        },
        {
          name: 'Sarah Johnson',
          role: 'Training Director',
          image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          bio: 'Certified CDL instructor with 15 years of teaching experience.'
        },
        {
          name: 'Mike Wilson',
          role: 'Operations Manager',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          bio: 'Former fleet safety director ensuring our students are road-ready.'
        }
      ];

      return (
        <div className="min-h-screen">
          <Header />
          <main className="pt-16">
            {/* Hero Section */}
            <section className="bg-card py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center"
                >
                  <h1 className="text-4xl sm:text-5xl font-bold text-white font-['Inter'] mb-6">
                    About The Trucking Vault
                  </h1>
                  <p className="text-xl text-muted max-w-3xl mx-auto">
                    Premier CDL training school dedicated to preparing the next generation of professional truck drivers
                    with comprehensive education, hands-on training, and guaranteed job placement.
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-card">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <div className="flex justify-center mb-4">
                        <stat.icon className={`h-12 w-12 text-primary`} />
                      </div>
                      <div className="text-3xl font-bold text-white font-['Inter'] mb-2">{stat.value}</div>
                      <div className="text-muted">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Story Section */}
            <section className="py-16 bg-card">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-3xl font-bold text-white font-['Inter'] mb-6">Our Story</h2>
                    <div className="space-y-4 text-muted">
                      <p>
                        Founded in 2015 by industry veterans, The Trucking Vault was born from a simple mission:
                        to bridge the gap between aspiring drivers and successful careers in trucking.
                      </p>
                      <p>
                        We recognized that the industry needed more than just technical training—it needed
                        comprehensive preparation that includes safety, professionalism, and real-world skills
                        that employers demand.
                      </p>
                      <p>
                        Today, we're proud to be the leading CDL training school in Texas, with a 95% student
                        success rate and 90% job placement within 30 days of graduation.
                      </p>
                    </div>
                  </motion.div>
                    <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                      alt="Training facility"
                      className="w-full h-96 object-cover rounded-2xl shadow-xl"
                    />
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Values Section */}
            <section className="py-16 bg-card">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-white font-['Inter'] mb-4">Our Values</h2>
                  <p className="text-xl text-muted max-w-3xl mx-auto">
                    The principles that guide everything we do at The Trucking Vault.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {values.map((value, index) => (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <div className="flex justify-center mb-4">
                        <value.icon className="h-12 w-12 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-white font-['Inter'] mb-3">{value.title}</h3>
                      <p className="text-muted">{value.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Team Section */}
            <section className="py-16 bg-card">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-white font-['Inter'] mb-4">Meet Our Team</h2>
                  <p className="text-xl text-muted max-w-3xl mx-auto">
                    Industry experts dedicated to your success.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {team.map((member, index) => (
                    <motion.div
                      key={member.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-card rounded-xl shadow-lg p-6 text-center border"
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h3 className="text-xl font-semibold text-white font-['Inter'] mb-2">{member.name}</h3>
                      <p className="text-primary font-medium mb-3">{member.role}</p>
                      <p className="text-muted text-sm">{member.bio}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-primary">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold text-white font-['Inter'] mb-4">
                    Ready to Start Your Journey?
                  </h2>
                  <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
                    Join thousands of successful drivers who started their career with us.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/register"
                      className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                    >
                      Enroll Today
                    </a>
                    <a
                      href="/contact"
                      className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
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

    export default About;