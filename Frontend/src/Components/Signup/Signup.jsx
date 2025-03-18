import React, { useState } from 'react';
import './signup.css'
import { Link , useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:3000/user/signup', { // Replace '/api/signup' with your actual backend API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      setSuccess(true);
      setName('');
      setEmail('');
      setPassword('');
      setTimeout(()=>{
        navigate('/signin')
      },1000);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='signup-main'>
      <h2>Signup</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Signup successful!</p>}
      <form onSubmit={handleSubmit} className='signup-form'>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            required
          />
        </div>
        <button type="submit" id='signup-button'>Signup</button>
        <p>Already signed up? {<Link to='/signin'>SignIn</Link>}</p>
      </form>
    </div>
  );
}

export default Signup;