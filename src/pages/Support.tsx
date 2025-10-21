import React, { useState } from 'react';
    import Header from '../components/Header';
    import Footer from '../components/Footer';
    import { Search, HelpCircle, Phone, Mail, MessageSquare, Book, Users, Clock } from 'lucide-react';
    import { motion } from 'framer-motion';

    const Support: React.FC = () => {
      const [searchTerm, setSearchTerm] = useState('');

      const faqs = [
        {
          question: 'How do I enroll in a CDL training program?',
          answer: 'Visit our registration page and fill out the enrollment form. Our admissions team will contact you within 24 hours to discuss your options and answer any questions.'
        },
        {
          question: 'What are the requirements for CDL training?',
          answer: 'You must be at least 18 years old, have a valid driver\'s license, pass a DOT physical exam, and meet basic eligibility requirements. No prior driving experience is required for most programs.'
        },
        {
          question: 'Do you offer financing options?',
          answer: 'Yes, we offer flexible payment plans, installment options, and work with financing partners to make training affordable. Contact our financing department for details.'
        },
        {
          question: 'How long does CDL training take?',
          answer: 'CDL-A training typically takes 4-6 weeks, CDL-B training takes 3-4 weeks, and refresher courses are 1-2 weeks. Actual duration depends on your schedule and learning pace.'
        },
        {
          question: 'What is your job placement rate?',
          answer: 'Our graduates enjoy a 90% job placement rate within 30 days of graduation, with partnerships with major carriers across the country.'
        },
        {
          question: 'Can I visit the training facility?',
          answer: 'Yes! We offer campus tours by appointment. Contact our admissions office to schedule a visit and see our facilities and equipment.'
        }
      ];

      const supportOptions = [
        {
          icon: Phone,
          title: 'Phone Support',
          description: 'Speak directly with our support team',
          contact: '(123) 456-7890',
          hours: 'Mon-Fri 8AM-6PM'
        },
        {
          icon: Mail,
          title: 'Email Support',
          description: 'Send us your questions via email',
          contact: 'support@truckingvault.com',
          hours: '24/7 response within 24 hours'
        },
        {
          icon: MessageSquare,
          title: 'Live Chat',
          description: 'Chat with a representative online',
          contact: 'Available on website',
          hours: 'Mon-Fri 9AM-5PM'
        }
      ];

      const resources = [
        {
          icon: Book,
          title: 'Student Handbook',
          description: 'Complete guide for students',
          link: '/handbook.pdf'
        },
        {
          icon: Users,
          title: 'Alumni Network',
          description: 'Connect with graduates',
          link: '/alumni'
        },
        {
          icon: Clock,
          title: 'Schedule a Call',
          description: 'Book a consultation',
          link: '/contact'
        }
      ];

      const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );

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
                    Support Center
                  </h1>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
                    Get the help you need to start your trucking career. We're here to support you every step of the way.
                  </p>

                  {/* Search Bar */}
                  <div className="max-w-md mx-auto relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search FAQs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Support Options */}
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 font-['Inter'] mb-4">
                    How Can We Help?
                  </h2>
                  <p className="text-xl text-slate-600">
                    Choose the best way to get in touch with our support team.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                  {supportOptions.map((option, index) => (
                    <motion.div
                      key={option.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-slate-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
                    >
                      <div className="flex justify-center mb-4">
                        <option.icon className="h-12 w-12 text-emerald-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 font-['Inter'] mb-2">
                        {option.title}
                      </h3>
                      <p className="text-slate-600 mb-4">{option.description}</p>
                      <div className="text-emerald-600 font-medium mb-1">{option.contact}</div>
                      <div className="text-sm text-slate-500">{option.hours}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-slate-50">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 font-['Inter'] mb-4">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-xl text-slate-600">
                    Quick answers to common questions about our programs.
                  </p>
                </div>

                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-lg shadow-sm border border-slate-200"
                    >
                      <details className="group">
                        <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 transition-colors">
                          <h3 className="text-lg font-medium text-slate-900 pr-4">
                            {faq.question}
                          </h3>
                          <HelpCircle className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                        </summary>
                        <div className="px-6 pb-6">
                          <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      </details>
                    </motion.div>
                  ))}
                </div>

                {filteredFaqs.length === 0 && (
                  <div className="text-center py-12">
                    <HelpCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">No results found</h3>
                    <p className="text-slate-600">Try adjusting your search terms or contact us directly.</p>
                  </div>
                )}
              </div>
            </section>

            {/* Resources Section */}
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 font-['Inter'] mb-4">
                    Additional Resources
                  </h2>
                  <p className="text-xl text-slate-600">
                    More ways to get the information and support you need.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {resources.map((resource, index) => (
                    <motion.div
                      key={resource.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-slate-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
                    >
                      <div className="flex justify-center mb-4">
                        <resource.icon className="h-12 w-12 text-emerald-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 font-['Inter'] mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-slate-600 mb-4">{resource.description}</p>
                      <a
                        href={resource.link}
                        className="text-emerald-600 hover:text-emerald-700 font-medium"
                      >
                        Learn More →
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Emergency Contact */}
            <section className="py-16 bg-red-50">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold text-red-900 font-['Inter'] mb-4">
                    Emergency Support
                  </h2>
                  <p className="text-red-700 mb-6">
                    If you're experiencing a crisis or need immediate assistance, please contact:
                  </p>
                  <div className="bg-white rounded-lg p-6 shadow-sm inline-block">
                    <div className="text-2xl font-bold text-red-600 mb-2">988</div>
                    <div className="text-slate-600">Suicide & Crisis Lifeline</div>
                    <div className="text-sm text-slate-500 mt-1">Available 24/7</div>
                  </div>
                </motion.div>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      );
    };

    export default Support;