import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://auth-backend-navy.vercel.app/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });

      // Handle non-2xx responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || 
          errorData.error?.details?.[0]?.message || 
          'Login failed. Please try again.'
        );
      }

      const result = await response.json();
      const { success, message, jwtToken, name } = result;

      if (success) {
        // Secure token storage
        localStorage.setItem('jwtToken', jwtToken);
        localStorage.setItem('loggedInUser', name);
        
        alert(message);
        navigate('/Home');
      } else {
        throw new Error(message || 'Login failed');
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError(err.message);
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='container'>
      <h1>Login</h1>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='email'>Email</label>
          <input 
            onChange={handleChange}
            type='email' 
            name='email' 
            placeholder='Enter your email...' 
            value={loginInfo.email}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input 
            onChange={handleChange}
            type='password' 
            name='password' 
            placeholder='Enter your password...' 
            value={loginInfo.password}
            required
            minLength="6"
          />
        </div>
        <button type='submit' disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        <span>
          Don't have an account? 
          <Link to='/Signup'>Signup here</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;