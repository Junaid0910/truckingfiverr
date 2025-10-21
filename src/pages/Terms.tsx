import React from 'react';
    import Header from '../components/Header';
    import Footer from '../components/Footer';
    import { FileText, Users, CreditCard, AlertTriangle, Scale } from 'lucide-react';
    import { motion } from 'framer-motion';

    const Terms: React.FC = () => {
      const sections = [
        {
          icon: Users,
          title: 'Enrollment and Eligibility',
          content: [
            'Students must be at least 18 years old and meet DOT requirements',
            'Valid identification and proof of residency required',
            'Medical examination and drug screening may be required',
            'False information on application may result in dismissal',
            'Enrollment is subject to space availability'
          ]
        },
        {
          icon: CreditCard,
          title: 'Payment Terms',
          content: [
            'Tuition payments are due according to the payment schedule',
            'Late payments may result in suspension of training',
            'Refunds are processed according to our refund policy',
            'Additional fees may apply for retakes or extended training',
            'Financing agreements are separate contracts'
          ]
        },
        {
          icon: FileText,
          title: 'Academic Policies',
          content: [
            'Regular attendance is required for all classes',
            'Students must maintain satisfactory progress',
            'Code of conduct must be followed at all times',
            'Academic dishonesty may result in dismissal',
            'Make-up classes may be available for excused absences'
          ]
        },
        {
          icon: AlertTriangle,
          title: 'Safety and Conduct',
          content: [
            'All safety rules and procedures must be followed',
            'Drug and alcohol policy strictly enforced',
            'Proper conduct expected on and off school property',
            'Equipment must be used properly and maintained',
            'Violations may result in immediate dismissal'
          ]
        },
        {
          icon: Scale,
          title: 'Liability and Insurance',
          content: [
            'School is not liable for personal injury during training',
            'Students must maintain personal insurance',
            'Vehicle operation is at student\'s own risk',
            'School insurance covers only school-owned equipment',
            'Claims must be filed promptly with appropriate documentation'
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
                    Terms and Conditions
                  </h1>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Please read these terms carefully before enrolling in our CDL training programs.
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

            {/* Terms Content */}
            <section className="py-16 bg-white">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="prose prose-lg max-w-none">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-2xl font-bold text-slate-900 font-['Inter'] mb-6">Agreement Overview</h2>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                      These Terms and Conditions ("Terms") govern your enrollment and participation in training programs offered by The Trucking Vault ("School," "we," "our," or "us"). By enrolling in any program, you agree to be bound by these Terms.
                    </p>

                    <p className="text-slate-600 mb-8 leading-relaxed">
                      If you do not agree to these Terms, you should not enroll in our programs. These Terms apply to all students, whether enrolling online, in-person, or through any other method.
                    </p>
                  </motion.div>

                  {/* Terms Sections */}
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

                  {/* Important Notices */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-12 bg-yellow-50 border border-yellow-200 rounded-xl p-8"
                  >
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-6 w-6 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-yellow-800 mb-2">Important Notice</h4>
                        <p className="text-yellow-700 text-sm leading-relaxed">
                          These terms are legally binding. By enrolling, you acknowledge that you have read, understood, and agree to comply with all terms and conditions. Violation of these terms may result in suspension or dismissal from the program.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Contact Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-12 bg-slate-50 rounded-xl p-8"
                  >
                    <h3 className="text-2xl font-bold text-slate-900 font-['Inter'] mb-4">
                      Questions About These Terms?
                    </h3>
                    <p className="text-slate-600 mb-6">
                      If you have any questions about these Terms and Conditions, please contact us:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Admissions Office</h4>
                        <p className="text-slate-600">admissions@truckingvault.com</p>
                        <p className="text-slate-600">(123) 456-7890</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Legal Department</h4>
                        <p className="text-slate-600">legal@truckingvault.com</p>
                        <p className="text-slate-600">(123) 456-7891</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      );
    };

    export default Terms;