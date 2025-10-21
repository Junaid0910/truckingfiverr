import React from 'react';
    import Header from '../components/Header';
    import Footer from '../components/Footer';
    import { Calendar, AlertCircle, CheckCircle } from 'lucide-react';
    import { motion } from 'framer-motion';

    const RefundPolicy: React.FC = () => {
      const refundSchedule = [
        {
          period: 'Before classes begin',
          refund: '100% refund',
          conditions: 'Minus $100 administrative fee'
        },
        {
          period: 'First week of classes',
          refund: '80% refund',
          conditions: 'For documented medical or family emergencies'
        },
        {
          period: 'Second week of classes',
          refund: '50% refund',
          conditions: 'For documented medical or family emergencies'
        },
        {
          period: 'After second week',
          refund: 'No refund',
          conditions: 'Except for school-initiated cancellations'
        }
      ];

      const exceptions = [
        'School cancels or discontinues the program',
        'Student is called to active military duty',
        'Student becomes seriously ill (with medical documentation)',
        'Death in immediate family',
        'Other circumstances approved by administration'
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
                    Refund Policy
                  </h1>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Understanding our refund policy helps ensure you make informed decisions about your training investment.
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

            {/* Refund Policy Content */}
            <section className="py-16 bg-white">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="prose prose-lg max-w-none">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-2xl font-bold text-slate-900 font-['Inter'] mb-6">Overview</h2>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                      The Trucking Vault is committed to providing quality CDL training. Our refund policy is designed to be fair to both students and the school while allowing flexibility for unforeseen circumstances.
                    </p>

                    <p className="text-slate-600 mb-8 leading-relaxed">
                      All refunds are processed within 30 business days of approval. Refunds will be issued using the same payment method used for the original transaction, unless otherwise agreed upon.
                    </p>
                  </motion.div>

                  {/* Refund Schedule */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="mt-12"
                  >
                    <h3 className="text-2xl font-bold text-slate-900 font-['Inter'] mb-6 flex items-center">
                      <Calendar className="h-6 w-6 mr-2 text-emerald-600" />
                      Refund Schedule
                    </h3>
                    <div className="bg-slate-50 rounded-xl overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                        {refundSchedule.map((item, index) => (
                          <div key={index} className={`p-6 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'} border-b border-slate-200 last:border-b-0`}>
                            <h4 className="font-semibold text-slate-900 mb-2">{item.period}</h4>
                            <div className="text-2xl font-bold text-emerald-600 mb-1">{item.refund}</div>
                            <p className="text-sm text-slate-600">{item.conditions}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Exceptions */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mt-12"
                  >
                    <h3 className="text-2xl font-bold text-slate-900 font-['Inter'] mb-6 flex items-center">
                      <CheckCircle className="h-6 w-6 mr-2 text-emerald-600" />
                      Refund Exceptions
                    </h3>
                    <p className="text-slate-600 mb-6">
                      Full or partial refunds may be granted outside the standard schedule for the following circumstances:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {exceptions.map((exception, index) => (
                        <div key={index} className="flex items-start space-x-3 p-4 bg-emerald-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">{exception}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Important Notes */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-12 bg-yellow-50 border border-yellow-200 rounded-xl p-8"
                  >
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-6 w-6 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-yellow-800 mb-2">Important Notes</h4>
                        <ul className="text-yellow-700 text-sm space-y-2">
                          <li>• All refund requests must be submitted in writing</li>
                          <li>• Documentation may be required for special circumstances</li>
                          <li>• Refunds do not include books, materials, or equipment costs</li>
                          <li>• Financing agreements have separate refund terms</li>
                          <li>• Appeals can be made to the administration within 30 days</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>

                  {/* Contact Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-12 bg-slate-50 rounded-xl p-8"
                  >
                    <h3 className="text-2xl font-bold text-slate-900 font-['Inter'] mb-4">
                      Request a Refund
                    </h3>
                    <p className="text-slate-600 mb-6">
                      To request a refund or discuss your specific situation, please contact our administration:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Administration Office</h4>
                        <p className="text-slate-600">refunds@truckingvault.com</p>
                        <p className="text-slate-600">(123) 456-7890</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Processing Time</h4>
                        <p className="text-slate-600">30 business days</p>
                        <p className="text-slate-600">Same payment method</p>
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

    export default RefundPolicy;