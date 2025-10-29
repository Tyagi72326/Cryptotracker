import React, { useState } from 'react';
import API from '../api';
import './auth.css';

const AuthForm = ({ mode = 'login', onAuth }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (mode === 'login') {
        const res = await API.post('/auth/login', { email: form.email, password: form.password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        onAuth && onAuth(res.data.user);
      } else {
        const res = await API.post('/auth/register', form);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        onAuth && onAuth(res.data.user);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="auth-card">
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        {mode === 'register' && (
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        )}
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" required />
        <button type="submit" className="btn-primary">{mode === 'login' ? 'Login' : 'Create account'}</button>
      </form>
    </div>
  );
};

export default AuthForm;
