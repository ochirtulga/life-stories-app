import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const result = await response.json();
        const userData = result.data;
        localStorage.setItem('token', userData.token);
        localStorage.setItem('user', JSON.stringify({
          email: userData.email,
          username: userData.username,
        }));
        login(userData.token);
        navigate('/');
      } else {
        const errorData = await response.json();
        alert(errorData.detail || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred while logging in');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary-600 text-gray-700 py-2 px-4 rounded hover:bg-gray-600 hover:text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;