import React, { useState } from 'react';
    import Header from '../components/Header';
    import Footer from '../components/Footer';
    import { Calculator, CheckCircle, Phone, Mail } from 'lucide-react';
    import { motion } from 'framer-motion';
    import { toast } from 'react-toastify';

    const Financing: React.FC = () => {
      const [loanAmount, setLoanAmount] = useState(4500);
      const [loanTerm, setLoanTerm] = useState(12);
      const [interestRate] = useState(8.99); // Fixed rate for demo

      const calculateMonthlyPayment = () => {
        const principal = loanAmount;
        const monthlyRate = interestRate / 100 / 12;
        const numberOfPayments = loanTerm;

        const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                              (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

        return monthlyPayment.toFixed(2);
      };

      const financingOptions = [
        {
          name: 'Full Payment',
          description: 'Pay the entire tuition upfront',
          price: '$4,500',
          savings: 'Save $450',
          features: ['No interest', 'Immediate enrollment', 'Best value'],
          popular: false
        },
        {
          name: '12-Month Plan',
          description: 'Spread payments over 12 months',
          price: `$${calculateMonthlyPayment()}/month`,
          total: '$4,950',
          features: ['Low monthly payments', 'Flexible scheduling', 'No hidden fees'],
          popular: true
        },
        {
          name: '24-Month Plan',
          description: 'Extended payment plan for 24 months',
          price: '$208.33/month',
          total: '$5,000',
          features: ['Lowest monthly payment', 'Extra time to pay', 'Budget friendly'],
          popular: false
        }
      ];

      const handleApply = (option: string) => {
        toast.success(`Application started for ${option}. Our financing team will contact you soon!`);
      };

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
                    Financing Options
                  </h1>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Make your CDL training affordable with our flexible payment plans and financing options.
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Calculator Section */}
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 font-['Inter'] mb-4">
                    Payment Calculator
                  </h2>
                  <p className="text-xl text-slate-600">
                    Estimate your monthly payments with our interactive calculator.
                  </p>
                </div>

                <div className="max-w-4xl mx-auto">
                  <div className="bg-slate-50 rounded-2xl p-8 shadow-lg">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Loan Amount: ${loanAmount.toLocaleString()}
                          </label>
                          <input
                            type="range"
                            min="1000"
                            max="5000"
                            step="100"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="flex justify-between text-xs text-slate-500 mt-1">
                            <span>$1,000</span>
                            <span>$5,000</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Loan Term: {loanTerm} months
                          </label>
                          <input
                            type="range"
                            min="6"
                            max="24"
                            step="6"
                            value={loanTerm}
                            onChange={(e) => setLoanTerm(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="flex justify-between text-xs text-slate-500 mt-1">
                            <span>6 months</span>
                            <span>24 months</span>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 border border-slate-200">
                          <div className="text-sm text-slate-600">Interest Rate</div>
                          <div className="text-2xl font-bold text-slate-900">{interestRate}% APR</div>
                        </div>
                      </div>

                      <div className="bg-emerald-600 text-white rounded-lg p-6">
                        <div className="flex items-center space-x-2 mb-4">
                          <Calculator className="h-6 w-6" />
                          <span className="text-lg font-semibold">Monthly Payment</span>
                        </div>
                        <div className="text-4xl font-bold mb-2">${calculateMonthlyPayment()}</div>
                        <div className="text-emerald-100 text-sm">
                          For {loanTerm} months at {interestRate}% APR
                        </div>
                        <div className="mt-4 pt-4 border-t border-emerald-500">
                          <div className="flex justify-between text-sm">
                            <span>Total Amount:</span>
                            <span>${(Number(calculateMonthlyPayment()) * loanTerm).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm mt-1">
                            <span>Total Interest:</span>
                            <span>${(Number(calculateMonthlyPayment()) * loanTerm - loanAmount).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Financing Options */}
            <section className="py-16 bg-slate-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 font-['Inter'] mb-4">
                    Choose Your Payment Plan
                  </h2>
                  <p className="text-xl text-slate-600">
                    Flexible options to fit your budget and timeline.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {financingOptions.map((option, index) => (
                    <motion.div
                      key={option.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`bg-white rounded-xl shadow-lg p-6 border-2 ${
                        option.popular ? 'border-emerald-600' : 'border-slate-200'
                      }`}
                    >
                      {option.popular && (
                        <div className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold inline-block mb-4">
                          Most Popular
                        </div>
                      )}

                      <h3 className="text-2xl font-bold text-slate-900 font-['Inter'] mb-2">
                        {option.name}
                      </h3>
                      <p className="text-slate-600 mb-4">{option.description}</p>

                      <div className="mb-6">
                        <div className="text-3xl font-bold text-emerald-600 mb-1">{option.price}</div>
                        {option.total && (
                          <div className="text-sm text-slate-500">Total: {option.total}</div>
                        )}
                        {option.savings && (
                          <div className="text-sm text-emerald-600 font-medium">{option.savings}</div>
                        )}
                      </div>

                      <ul className="space-y-2 mb-6">
                        {option.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                            <span className="text-sm text-slate-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={() => handleApply(option.name)}
                        className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                          option.popular
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                        }`}
                      >
                        Apply Now
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Requirements Section */}
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-3xl font-bold text-slate-900 font-['Inter'] mb-6">
                      Financing Requirements
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-slate-900">Credit Check</h3>
                          <p className="text-slate-600 text-sm">Basic credit history review required</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-slate-900">Proof of Income</h3>
                          <p className="text-slate-600 text-sm">Recent pay stubs or tax returns</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-slate-900">Identification</h3>
                          <p className="text-slate-600 text-sm">Valid driver's license or ID</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-slate-900">Enrollment Agreement</h3>
                          <p className="text-slate-600 text-sm">Signed training enrollment contract</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-slate-50 rounded-xl p-8"
                  >
                    <h3 className="text-2xl font-bold text-slate-900 font-['Inter'] mb-6">
                      Need Help?
                    </h3>
                    <p className="text-slate-600 mb-6">
                      Our financing specialists are here to help you find the best payment option for your situation.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-emerald-600" />
                        <div>
                          <p className="font-medium text-slate-900">Financing Hotline</p>
                          <p className="text-slate-600">(123) 456-7890</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-emerald-600" />
                        <div>
                          <p className="font-medium text-slate-900">Email</p>
                          <p className="text-slate-600">financing@truckingvault.com</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-slate-200">
                      <p className="text-sm text-slate-600 mb-4">
                        Call us today to discuss your financing options and get pre-approved.
                      </p>
                      <button className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                        Get Pre-Approved
                      </button>
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

    export default Financing;