import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  userType: z.enum(['student', 'instructor', 'admin', 'employer'], {
    required_error: 'Please select your user type'
  })
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onLogin: (userType: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const userType = watch('userType');

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, password: data.password })
      });
      const body = await res.json();
      if (!res.ok) {
        const message = body?.error || 'Login failed. Please check your credentials.';
        toast.error(message);
        return;
      }
      // store token
      if (body.token) localStorage.setItem('token', body.token);

      // fetch real user info from /api/auth/me using the token
      try {
        const meRes = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${body.token}` }
        });
        if (!meRes.ok) throw new Error('Failed to verify token');
        const me = await meRes.json();
        const role = me.role || data.userType || 'student';
        toast.success(`Welcome back! Logging in as ${role}...`);
        onLogin(role);
      } catch (err) {
        console.error('verify token error', err);
        toast.error('Login succeeded but could not verify user role.');
        onLogin(data.userType);
      }
    } catch (error: any) {
      console.error('login error', error);
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const userTypeOptions = [
    { value: 'student', label: 'Student', description: 'Access courses and track progress' },
    { value: 'instructor', label: 'Instructor', description: 'Manage classes and students' },
    { value: 'admin', label: 'Administrator', description: 'Full system access' },
    { value: 'employer', label: 'Employer', description: 'Manage employee training' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 font-['Inter']">
            Welcome Back
          </h2>
          <p className="mt-2 text-slate-600">
            Sign in to your account to continue
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                I am a...
              </label>
              <div className="grid grid-cols-2 gap-3">
                {userTypeOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`relative flex flex-col p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      userType === option.value
                        ? 'border-emerald-600 bg-emerald-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      value={option.value}
                      {...register('userType')}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-slate-600" aria-hidden="true" />
                      <span className="font-medium text-sm text-slate-900">
                        {option.label}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 mt-1">
                      {option.description}
                    </span>
                  </label>
                ))}
              </div>
              {errors.userType && (
                <p className="mt-2 text-sm text-red-600">{errors.userType.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register('email')}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                    errors.email ? 'border-red-300' : 'border-slate-300'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  {...register('password')}
                  className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                    errors.password ? 'border-red-300' : 'border-slate-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600" aria-hidden="true" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Links */}
            <div className="flex items-center justify-between text-sm">
              <a href="/forgot-password" className="text-emerald-600 hover:text-emerald-500 transition-colors">
                Forgot your password?
              </a>
              <a href="/register" className="text-emerald-600 hover:text-emerald-500 transition-colors">
                Create account
              </a>
            </div>
          </form>
        </div>

        {/* Demo Credentials */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-yellow-800 mb-2">Demo Credentials</h3>
          <div className="text-xs text-yellow-700 space-y-1">
            <p><strong>Email:</strong> demo@truckingvault.com</p>
            <p><strong>Password:</strong> demo123</p>
            <p className="text-yellow-600">Use any user type to explore the system</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;