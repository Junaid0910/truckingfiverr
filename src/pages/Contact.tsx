import React, { useState } from 'react';
    import Header from '../components/Header';
    import Footer from '../components/Footer';
    import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
    import { motion } from 'framer-motion';
    import { toast } from 'react-toastify';

    const Contact: React.FC = () => {
      const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      const [isSubmitting, setIsSubmitting] = useState(false);

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
      };

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));

        toast.success('Thank you for your message! We\'ll get back to you within 24 hours.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setIsSubmitting(false);
      };

      const contactInfo = [
        {
          icon: MapPin,
          title: 'Address',
          details: ['123 Training Drive', 'Dallas, TX 75201']
        },
        {
          icon: Phone,
          title: 'Phone',
          details: ['(123) 456-7890', '(123) 456-7891']
        },
        {
          icon: Mail,
          title: 'Email',
          details: ['info@truckingvault.com', 'admissions@truckingvault.com']
        },
        {
          icon: Clock,
          title: 'Hours',
          details: ['Mon-Fri: 8AM-6PM', 'Sat: 9AM-4PM', 'Sun: Closed']
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
                    Contact Us
                  </h1>
                  <p className="text-xl text-muted max-w-3xl mx-auto">
                    Have questions about our CDL training programs? We're here to help you start your trucking career.
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 bg-card">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Contact Form */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-2xl font-bold text-white font-['Inter'] mb-6">Send us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-surface text-white border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-surface text-white border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-muted mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-surface text-white border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="(123) 456-7890"
                          />
                        </div>
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium text-muted mb-2">
                            Subject *
                          </label>
                          <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-surface text-white border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          >
                            <option value="">Select a subject</option>
                            <option value="program-info">Program Information</option>
                            <option value="admissions">Admissions</option>
                            <option value="financing">Financing Options</option>
                            <option value="schedule">Class Schedule</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-muted mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 bg-surface text-white border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          placeholder="Tell us how we can help you..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>

                  {/* Contact Information */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-2xl font-bold text-white font-['Inter'] mb-6">Get in Touch</h2>
                        <p className="text-muted mb-8">
                        Ready to start your trucking career? Contact us today to learn more about our programs,
                        schedule a campus tour, or get answers to your questions.
                      </p>
                    </div>

                    <div className="space-y-6">
                      {contactInfo.map((info) => (
                        <div key={info.title} className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                              <info.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                              <h3 className="font-semibold text-white mb-1">{info.title}</h3>
                              {info.details.map((detail, idx) => (
                                <p key={idx} className="text-muted">{detail}</p>
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>

                      {/* Map Placeholder */}
                      <div className="bg-card rounded-lg h-64 flex items-center justify-center border">
                        <div className="text-center text-muted">
                          <MapPin className="h-12 w-12 mx-auto mb-2 text-primary" />
                          <p>Interactive Map</p>
                          <p className="text-sm">123 Training Drive, Dallas, TX 75201</p>
                        </div>
                      </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-slate-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-2xl font-bold text-slate-900 font-['Inter'] mb-4">Frequently Asked Questions</h2>
                  <p className="text-slate-600">Quick answers to common questions about our programs.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-semibold text-slate-900 mb-2">Do you offer financing?</h3>
                    <p className="text-slate-600 text-sm">Yes, we offer flexible payment plans and work with financing partners to make training accessible.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-semibold text-slate-900 mb-2">What's the class schedule like?</h3>
                    <p className="text-slate-600 text-sm">Classes run Monday through Friday, 8AM-5PM, with some weekend options available.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-semibold text-slate-900 mb-2">Do you provide job placement?</h3>
                    <p className="text-slate-600 text-sm">Yes, we have partnerships with major carriers and a 90% job placement rate within 30 days.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-semibold text-slate-900 mb-2">What's included in tuition?</h3>
                    <p className="text-slate-600 text-sm">Tuition covers all training materials, CDL testing fees, and job placement assistance.</p>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      );
    };

    export default Contact;