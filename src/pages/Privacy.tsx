import React from 'react';
    import Header from '../components/Header';
    import Footer from '../components/Footer';
    import { Eye, Lock, Users, Mail } from 'lucide-react';
    import { motion } from 'framer-motion';

    const Privacy: React.FC = () => {
      const sections = [
        {
          icon: Eye,
          title: 'Information We Collect',
          content: [
            'Personal information you provide (name, email, phone, address)',
            'Enrollment and payment information',
            'Course progress and performance data',
            'Communications with our staff and instructors',
            'Website usage data and cookies'
          ]
        },
        {
          icon: Lock,
          title: 'How We Protect Your Data',
          content: [
            'SSL encryption for all data transmission',
            'Secure servers with regular security updates',
            'Limited access to personal information',
            'Regular security audits and monitoring',
            'Employee training on data protection'
          ]
        },
        {
          icon: Users,
          title: 'Information Sharing',
          content: [
            'With your consent for program requirements',
            'With payment processors for billing',
            'With employers for job placement (with permission)',
            'As required by law or legal processes',
            'In aggregate form for research and improvement'
          ]
        },
        {
          icon: Mail,
          title: 'Your Rights',
          content: [
            'Access to your personal information',
            'Correction of inaccurate data',
            'Deletion of your information',
            'Data portability',
            'Opt-out of marketing communications'
          ]
        }
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
                    Privacy Policy
                  </h1>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Your privacy is important to us. Learn how we collect, use, and protect your personal information.
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Last Updated */}
            <section className="py-8 bg-white border-b border-slate-200">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-slate-600 text-center">
                  <strong>Last Updated:</strong> January 1, 2024
                </p>
              </div>
            </section>

            {/* Privacy Content */}
            <section className="py-16 bg-white">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="prose prose-lg max-w-none">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-2xl font-bold text-slate-900 font-['Inter'] mb-6">Introduction</h2>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                      The Trucking Vault ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, enroll in our programs, or use our services.
                    </p>

                    <p className="text-slate-600 mb-8 leading-relaxed">
                      By using our services, you agree to the collection and use of information in accordance with this policy. We will not use or share your information with anyone except as described in this Privacy Policy.
                    </p>
                  </motion.div>

                  {/* Privacy Sections */}
                  <div className="space-y-12 mt-12">
                    {sections.map((section, index) => (
                      <motion.div
                        key={section.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="border-b border-slate-200 pb-8 last:border-b-0"
                      >
                        <div className="flex items-center space-x-3 mb-6">
                          <section.icon className="h-8 w-8 text-emerald-600" />
                          <h3 className="text-2xl font-bold text-slate-900 font-['Inter']">
                            {section.title}
                          </h3>
                        </div>
                        <ul className="space-y-3">
                          {section.content.map((item, idx) => (
                            <li key={idx} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-slate-600 leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>

                  {/* Contact Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-12 bg-slate-50 rounded-xl p-8"
                  >
                    <h3 className="text-2xl font-bold text-slate-900 font-['Inter'] mb-4">
                      Contact Us About Privacy
                    </h3>
                    <p className="text-slate-600 mb-6">
                      If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Privacy Officer</h4>
                        <p className="text-slate-600">privacy@truckingvault.com</p>
                        <p className="text-slate-600">(123) 456-7890</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Mailing Address</h4>
                        <p className="text-slate-600">
                          The Trucking Vault<br />
                          Attn: Privacy Officer<br />
                          123 Training Drive<br />
                          Dallas, TX 75201
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Updates Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200"
                  >
                    <h4 className="font-semibold text-yellow-800 mb-2">Policy Updates</h4>
                    <p className="text-yellow-700 text-sm">
                      We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                    </p>
                  </motion.div>
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      );
    };

    export default Privacy;