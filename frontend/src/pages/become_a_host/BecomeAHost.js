import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const inputCls = 'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500';

const BecomeAHost = () => {
  const { token, updateUserRoles, login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const validate = () => {
    const n = {};
    if (!form.email.trim()) n.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) n.email = 'Enter a valid email';
    if (!form.password) n.password = 'Password is required';
    else if (form.password.length < 8) n.password = 'Password must be at least 8 characters';
    setErrors(n);
    return Object.keys(n).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/become-a-host', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        body: JSON.stringify({ email: form.email.trim(), password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to become a host');
      login(data.token, data.user);
      updateUserRoles(data.user.roles);
      showToast('You are now a host!');
      navigate('/host/dashboard');
    } catch (err) {
      showToast(err.message || 'Failed to become a host', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-md mx-auto px-4 pt-28 pb-16">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-md">
          <h1 className="text-2xl font-semibold text-gray-900">Become a Host</h1>
          <p className="mt-1 text-sm text-gray-500">Enter your credentials to unlock the host dashboard.</p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className={inputCls} placeholder="you@example.com" />
              {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} className={inputCls} placeholder="••••••••" />
              {errors.password && <p className="mt-1 text-xs text-rose-600">{errors.password}</p>}
            </div>
            <button type="submit" disabled={loading} className="w-full rounded-lg bg-rose-500 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-600 disabled:opacity-50">
              {loading ? 'Please wait...' : 'Become a Host'}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BecomeAHost;
