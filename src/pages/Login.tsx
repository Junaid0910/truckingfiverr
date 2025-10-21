import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

interface LoginProps {
  onSetUserRole?: (role: string) => void;
}

const Login: React.FC<LoginProps> = ({ onSetUserRole }) => {
  const navigate = useNavigate();

  const handleLogin = (userType: string) => {
    // store role locally and lift state to App
    localStorage.setItem('userRole', userType);
    if (onSetUserRole) onSetUserRole(userType);

    // Redirect to appropriate dashboard
    switch (userType) {
      case 'student':
        navigate('/student/dashboard');
        break;
      case 'instructor':
        navigate('/instructor/dashboard');
        break;
      case 'admin':
        navigate('/admin/dashboard');
        break;
      case 'employer':
        navigate('/employer/dashboard');
        break;
      default:
        navigate('/');
    }
  };

  return <LoginForm onLogin={handleLogin} />;
};

export default Login;