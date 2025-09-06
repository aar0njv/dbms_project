import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import '../styles/AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = (e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      <h1>Ezygo</h1>
      <p className="subtitle">Sign in to your student account</p>
      {isLogin ? <LoginForm toggle={toggleForm} /> : <SignupForm toggle={toggleForm} />}
      <p className="copyright">&copy; Upgraded Ezygo Dashboard</p>
    </div>
  );
};

export default AuthPage;