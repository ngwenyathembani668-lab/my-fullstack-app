 
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import { useToast } from '../context/ToastContext';
import API_BASE_URL from '../config/api';

const inputCls =
  'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500';

const LoginModal = () => {
  const { login } = useAuth();
  const { isLoginOpen, closeLogin } = useModal();
  const { showToast } = useToast();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isLoginOpen) return null;

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const validate = () => {
    const n = {};
    if (!form.email.trim()) n.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) n.email = 'Enter a valid email';
    if (!form.password) n.password = 'Password is required';
    else if (form.password.length < 8) n.password = 'Min 8 characters';
    if (isRegister && !form.name.trim()) n.name = 'Name is required';
    setErrors(n);
    return Object.keys(n).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const url = `${API_BASE_URL}/auth/${isRegister ? 'register' : 'login'}`;
      const body = isRegister
        ? { name: form.name.trim(), email: form.email.trim(), password: form.password }
        : { email: form.email.trim(), password: form.password };
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Authentication failed');
      login(data.token, data.user);
      showToast(isRegister ? 'Account created!' : 'Welcome back!');
      closeLogin();
    } catch (err) {
      showToast(err.message || 'Authentication failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={closeLogin}>
      <div className="w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-semibold text-gray-900">
          {isRegister ? 'Create an account' : 'Welcome back'}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {isRegister ? 'Sign up to start booking stays.' : 'Log in to continue booking stays.'}
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {isRegister && (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} className={inputCls} placeholder="Jane Doe" />
              {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
            </div>
          )}
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
            {loading ? 'Please wait...' : isRegister ? 'Sign up' : 'Log in'}
          </button>
          <button type="button" onClick={() => setIsRegister((v) => !v)} className="w-full text-center text-sm text-gray-500 hover:text-gray-700">
            {isRegister ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
