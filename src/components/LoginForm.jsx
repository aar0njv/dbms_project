import React from 'react';

const LoginForm = ({ toggle }) => {
  return (
    <div className="auth-card">
      <h2 className="title">Log in</h2>
      <p>to Ezygo+</p>
      <form>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
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