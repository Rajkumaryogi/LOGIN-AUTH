import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';


const Signup = () => {
  
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target; // Extract name and value from input
    console.log(name, value); // Print the name and value
  
    setSignupInfo((prevState) => ({        // Update the state
      ...prevState,  // Keep the existing values
      [name]: value  // Update the specific field
    }));
  };
  
  // console.log('loginInfo -> ', signupInfo);

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      alert('Name, email and password are required');
      // return handleError('Name, email and password are required')
      return ;
    }
    try {
      const url = 'https://auth-backend-navy.vercel.app/auth/signup';
      const response = await fetch( url , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      });
      const result = await response.json();
      console.log('data -> ', result);
      if (result.success) {
        alert(result.message);
        setTimeout(() => {
          window.location.href = '/login';
        }, );
        return ;
      }else if (result.error) {
        alert(result.error.details[0].message);
        // return handleError(data.error);
      }
       else {
        alert(result.message);
        // return handleError(data.message);
      }
    }
    catch (err) {
      console.log('Error -> ', err);
      // return handleError('Error occurred. Please try again');
    }
  };
  return (
    <div className='container'>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor='name'>Name</label>
          <input 
           onChange={handleChange}
           type='text' 
           name ='name' 
           autoFocus
           placeholder='Enter your name...' 
           value={signupInfo.name}
          />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input 
           onChange={handleChange}
           type='email' 
           name ='email' 
           placeholder='Enter your email...' 
           value={signupInfo.email}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input 
           onChange={handleChange}
           type='password' 
           name ='password' 
           placeholder='Enter your password...' 
           value={signupInfo.password}
          />
        </div>
        <button type='submit'>Signup </button>
         <span>Already have an account? 
           <Link to ='/login'>Login
           </Link>
         </span>
      </form>
      
    </div>
  )
}

export default Signup
