import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const SignupForm = ({ toggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match, please try again.");
      return;
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (authError) {
      alert('Signup failed: ' + authError.message);
      return;
    }

    const { error: usersTableError } = await supabase
      .from('users')
      .insert([
        { id: authData.user.id, username: email.split('@')[0] }
      ]);
      
    if (usersTableError) {
      alert('Could not save user profile. Please try again.');
    } else {
      alert('Account created successfully! Please check your email to confirm your account.');
    }
  };

  return (
    <div className="auth-card">
      <h2 className="title">Sign up</h2>
      <p>for Ezygo+</p>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <button type="submit">Sign up</button>
      </form>
      <p className="login-text">
        Already have an account?&nbsp;<a href="#" onClick={toggle}>Log in here</a>
      </p>
    </div>
  );
};

export default SignupForm;