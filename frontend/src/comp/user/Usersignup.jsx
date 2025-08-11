import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useUserStore from '../../stores/useUserStore';

export const Usersignup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const urlAPI = "https://project-final-xhjy.onrender.com/users";


    try {
      // Sign up
      const response = await fetch(`${urlAPI}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);

        // Auto-login after successful signup
        const loginRes = await fetch(`${urlAPI}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        });

        const loginData = await loginRes.json();

        if (loginRes.ok) {
          setUser({
            name: loginData.name,
            token: loginData.accessToken,
          });

          navigate('/admin'); // When successful signup, redirect to admin page
        } else {
          setError('Signup succeeded, but login failed');
        }
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Server error');
      console.error(err);
    }
  };
  return (
    <div className='max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-6 text-center'>Sign Up</h2>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-sm font-medium mb-1'>Name</label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </div>

        <div>
          <label className='block text-sm font-medium mb-1'>Email</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </div>

        <div>
          <label className='block text-sm font-medium mb-1'>Password</label>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">User created successfully!</p>}

        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200'
        >
          Sign up here
        </button>
      </form>
    </div>
  );
};
