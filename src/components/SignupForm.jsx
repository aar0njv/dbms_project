import React from 'react';

const SignupForm = ({ toggle }) => {
  return (
    <div className="auth-card">
      <h2 className="title">Sign up</h2>
      <p>for Ezygo+</p>
      <form>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <input type="password" placeholder="Confirm Password" required />
        <button type="submit">Sign up</button>
      </form>
      <p className="login-text">
        Already have an account?&nbsp;<a href="#" onClick={toggle}>Log in here</a>
      </p>
    </div>
  );
};

export default SignupForm;