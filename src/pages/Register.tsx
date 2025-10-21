import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import Header from '../components/Header';
    import Footer from '../components/Footer';
    import { useForm } from 'react-hook-form';
    import { zodResolver } from '@hookform/resolvers/zod';
    import { z } from 'zod';
    import { Eye, EyeOff, User, Mail, Calendar, MapPin, CreditCard } from 'lucide-react';
    import { motion } from 'framer-motion';
    import { toast } from 'react-toastify';

    const registerSchema = z.object({
      firstName: z.string().min(2, 'First name must be at least 2 characters'),
      lastName: z.string().min(2, 'Last name must be at least 2 characters'),
      email: z.string().email('Please enter a valid email address'),
      phone: z.string().min(10, 'Please enter a valid phone number'),
      dateOfBirth: z.string().min(1, 'Date of birth is required'),
      address: z.string().min(5, 'Please enter your full address'),
      city: z.string().min(2, 'City is required'),
      state: z.string().min(2, 'State is required'),
      zipCode: z.string().min(5, 'ZIP code is required'),
      program: z.enum(['cdl-a', 'cdl-b', 'refresher'], {
        required_error: 'Please select a program'
      }),
      experience: z.enum(['none', 'some', 'experienced'], {
        required_error: 'Please select your experience level'
      }),
      financing: z.enum(['full', 'installments', 'loan'], {
        required_error: 'Please select a payment option'
      }),
      password: z.string().min(8, 'Password must be at least 8 characters'),
      confirmPassword: z.string(),
      agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms and conditions')
    }).refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

    type RegisterFormData = z.infer<typeof registerSchema>;

    const Register: React.FC = () => {
      const navigate = useNavigate();
      const [showPassword, setShowPassword] = useState(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState(false);
      const [isSubmitting, setIsSubmitting] = useState(false);

      const {
        register,
        handleSubmit,
        formState: { errors },
        watch
      } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema)
      });

      const selectedProgram = watch('program');

      const programs = {
        'cdl-a': { name: 'CDL Class A', price: '$4,500', duration: '4-6 weeks' },
        'cdl-b': { name: 'CDL Class B', price: '$3,200', duration: '3-4 weeks' },
        'refresher': { name: 'Refresher Course', price: '$1,800', duration: '1-2 weeks' }
      };

      const onSubmit = async (formData: RegisterFormData) => {
        setIsSubmitting(true);
        try {
          const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formData.email, password: formData.password })
          });
          const body = await res.json();
          if (!res.ok) {
            toast.error(body?.error || 'Registration failed. Please try again.');
            return;
          }
          toast.success('Registration successful! Please log in.');
          navigate('/login');
        } catch (err) {
          console.error('register error', err);
          toast.error('Registration failed. Please try again.');
        } finally {
          setIsSubmitting(false);
        }
      };

      return (
        <div className="min-h-screen">
          <Header />
          <main className="pt-16 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8"
              >
                <h1 className="text-3xl font-bold text-slate-900 font-['Inter'] mb-4">
                  Start Your Trucking Career
                </h1>
                <p className="text-xl text-slate-600">
                  Complete your registration to begin training with The Trucking Vault.
                </p>
              </motion.div>

              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                  {/* Personal Information */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-slate-900 font-['Inter'] mb-6 flex items-center">
                      <User className="h-5 w-5 mr-2 text-emerald-600" />
                      Personal Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">
                          First Name *
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          {...register('firstName')}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                            errors.firstName ? 'border-red-300' : 'border-slate-300'
                          }`}
                          placeholder="John"
                        />
                        {errors.firstName && (
                          <p className="mt-2 text-sm text-red-600">{errors.firstName.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          {...register('lastName')}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                            errors.lastName ? 'border-red-300' : 'border-slate-300'
                          }`}
                          placeholder="Doe"
                        />
                        {errors.lastName && (
                          <p className="mt-2 text-sm text-red-600">{errors.lastName.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          id="email"
                          type="email"
                          {...register('email')}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                            errors.email ? 'border-red-300' : 'border-slate-300'
                          }`}
                          placeholder="john.doe@email.com"
                        />
                        {errors.email && (
                          <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          {...register('phone')}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                            errors.phone ? 'border-red-300' : 'border-slate-300'
                          }`}
                          placeholder="(123) 456-7890"
                        />
                        {errors.phone && (
                          <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-slate-700 mb-2">
                          Date of Birth *
                        </label>
                        <input
                          id="dateOfBirth"
                          type="date"
                          {...register('dateOfBirth')}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                            errors.dateOfBirth ? 'border-red-300' : 'border-slate-300'
                          }`}
                        />
                        {errors.dateOfBirth && (
                          <p className="mt-2 text-sm text-red-600">{errors.dateOfBirth.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-slate-900 font-['Inter'] mb-6 flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-emerald-600" />
                      Address Information
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-2">
                          Street Address *
                        </label>
                        <input
                          id="address"
                          type="text"
                          {...register('address')}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                            errors.address ? 'border-red-300' : 'border-slate-300'
                          }`}
                          placeholder="123 Main Street"
                        />
                        {errors.address && (
                          <p className="mt-2 text-sm text-red-600">{errors.address.message}</p>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-2">
                            City *
                          </label>
                          <input
                            id="city"
                            type="text"
                            {...register('city')}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                              errors.city ? 'border-red-300' : 'border-slate-300'
                            }`}
                            placeholder="Dallas"
                          />
                          {errors.city && (
                            <p className="mt-2 text-sm text-red-600">{errors.city.message}</p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-slate-700 mb-2">
                            State *
                          </label>
                          <input
                            id="state"
                            type="text"
                            {...register('state')}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                              errors.state ? 'border-red-300' : 'border-slate-300'
                            }`}
                            placeholder="TX"
                          />
                          {errors.state && (
                            <p className="mt-2 text-sm text-red-600">{errors.state.message}</p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="zipCode" className="block text-sm font-medium text-slate-700 mb-2">
                            ZIP Code *
                          </label>
                          <input
                            id="zipCode"
                            type="text"
                            {...register('zipCode')}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                              errors.zipCode ? 'border-red-300' : 'border-slate-300'
                            }`}
                            placeholder="75201"
                          />
                          {errors.zipCode && (
                            <p className="mt-2 text-sm text-red-600">{errors.zipCode.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Program Selection */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-slate-900 font-['Inter'] mb-6 flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-emerald-600" />
                      Program Selection
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-3">
                          Choose Your Program *
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {Object.entries(programs).map(([key, program]) => (
                            <label
                              key={key}
                              className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                selectedProgram === key
                                  ? 'border-emerald-600 bg-emerald-50'
                                  : 'border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <input
                                type="radio"
                                value={key}
                                {...register('program')}
                                className="sr-only"
                              />
                              <div className="text-center">
                                <h3 className="font-semibold text-slate-900 mb-1">{program.name}</h3>
                                <p className="text-2xl font-bold text-emerald-600 mb-1">{program.price}</p>
                                <p className="text-sm text-slate-600">{program.duration}</p>
                              </div>
                            </label>
                          ))}
                        </div>
                        {errors.program && (
                          <p className="mt-2 text-sm text-red-600">{errors.program.message}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="experience" className="block text-sm font-medium text-slate-700 mb-2">
                            Driving Experience *
                          </label>
                          <select
                            id="experience"
                            {...register('experience')}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                              errors.experience ? 'border-red-300' : 'border-slate-300'
                            }`}
                          >
                            <option value="">Select experience level</option>
                            <option value="none">No experience</option>
                            <option value="some">Some driving experience</option>
                            <option value="experienced">Experienced driver</option>
                          </select>
                          {errors.experience && (
                            <p className="mt-2 text-sm text-red-600">{errors.experience.message}</p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="financing" className="block text-sm font-medium text-slate-700 mb-2">
                            Payment Option *
                          </label>
                          <select
                            id="financing"
                            {...register('financing')}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                              errors.financing ? 'border-red-300' : 'border-slate-300'
                            }`}
                          >
                            <option value="">Select payment option</option>
                            <option value="full">Pay in full</option>
                            <option value="installments">Monthly installments</option>
                            <option value="loan">Financing loan</option>
                          </select>
                          {errors.financing && (
                            <p className="mt-2 text-sm text-red-600">{errors.financing.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Account Setup */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-slate-900 font-['Inter'] mb-6 flex items-center">
                      <Mail className="h-5 w-5 mr-2 text-emerald-600" />
                      Account Setup
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                          Password *
                        </label>
                        <div className="relative">
                          <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password')}
                            className={`w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                              errors.password ? 'border-red-300' : 'border-slate-300'
                            }`}
                            placeholder="Create a password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5 text-slate-400" />
                            ) : (
                              <Eye className="h-5 w-5 text-slate-400" />
                            )}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                          Confirm Password *
                        </label>
                        <div className="relative">
                          <input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            {...register('confirmPassword')}
                            className={`w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                              errors.confirmPassword ? 'border-red-300' : 'border-slate-300'
                            }`}
                            placeholder="Confirm your password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-5 w-5 text-slate-400" />
                            ) : (
                              <Eye className="h-5 w-5 text-slate-400" />
                            )}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="mb-8">
                    <div className="flex items-start space-x-3">
                      <input
                        id="agreeToTerms"
                        type="checkbox"
                        {...register('agreeToTerms')}
                        className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded"
                      />
                      <div className="text-sm">
                        <label htmlFor="agreeToTerms" className="text-slate-700">
                          I agree to the{' '}
                          <a href="/terms" className="text-emerald-600 hover:text-emerald-700 underline">
                            Terms and Conditions
                          </a>{' '}
                          and{' '}
                          <a href="/privacy" className="text-emerald-600 hover:text-emerald-700 underline">
                            Privacy Policy
                          </a>
                          *
                        </label>
                        {errors.agreeToTerms && (
                          <p className="mt-2 text-sm text-red-600">{errors.agreeToTerms.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-4 w-4" />
                          <span>Complete Registration</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      );
    };

    export default Register;