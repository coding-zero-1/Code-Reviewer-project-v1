import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './signin.css'

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/user/signin', { // Replace with your actual API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Signin failed');
      }

      // Assuming your backend returns a success response (e.g., a token)
      // You can handle the response data here if needed.
      const responseData = await response.json();

      // Store the token or user data in local storage or cookies
      localStorage.setItem('token', responseData.token); // Example: storing a token

      setTimeout(()=>{
        navigate('/')
      },1000); // Redirect to the home page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='signin-main'>
      <h2>Signin</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} className='signin-form'>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='enter your email..'
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='enter your password..'
            required
          />
        </div>
        <button type="submit" id='signin-button'>Signin</button>
        <p>Don't have an account? {<Link to='/signup'>SignUp</Link>}</p>
      </form>
    </div>
  );
}

export default Signin;