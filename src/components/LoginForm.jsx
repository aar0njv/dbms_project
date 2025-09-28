import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const LoginForm = ({ toggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert('Invalid email or password.');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="auth-card">
      <h2 className="title">Log in</h2>
      <p>to Ezygo+</p>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <a href="#">Forgot password?</a>
        <button type="submit">Log In</button>
      </form>
      <p className="signup-text">
        Don't have an account?&nbsp;<a href="#" onClick={toggle}>Sign up now!</a>
      </p>
    </div>
  );
};

export default LoginForm;