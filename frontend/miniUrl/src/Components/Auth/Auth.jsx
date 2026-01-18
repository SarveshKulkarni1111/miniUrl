import { useState } from 'react';
import api from '../../api';

export default function Auth({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setMessage('');
    setLoading(true);
    try {
      const url = isLogin ? '/auth/login' : '/auth/signup';
      const payload = isLogin
        ? { email: form.email, password: form.password }
        : form;

      const res = await api.post(url, payload);

      localStorage.setItem('token', res.data.token);
      setMessage(isLogin ? 'Login successful!' : 'Signup successful!');
      onAuth();
    } catch (err) {
      console.error(err);
      setMessage('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-xl bg-white p-6 sm:p-8 shadow-lg">
        <h2 className="mb-4 text-center text-xl font-semibold sm:text-2xl">
          {isLogin ? 'Login' : 'Create Account'}
        </h2>

        {/* Message */}
        {message && (
          <p
            className={`mb-3 text-center text-sm sm:text-base ${
              message.includes('successful') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}

        {/* Name input only for signup */}
        {!isLogin && (
          <input
            className="mb-3 w-full rounded border p-2 sm:p-3"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        )}

        <input
          className="mb-3 w-full rounded border p-2 sm:p-3"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="mb-4 w-full rounded border p-2 sm:p-3"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={submit}
          disabled={loading}
          className="w-full rounded bg-black py-2 sm:py-3 text-white hover:bg-gray-800 disabled:opacity-50 transition-colors duration-200"
        >
          {loading ? 'Please wait...' : isLogin ? 'Login' : 'Signup'}
        </button>

        <p
          className="mt-4 cursor-pointer text-center text-sm sm:text-base text-blue-600"
          onClick={() => {
            setIsLogin(!isLogin);
            setMessage('');
          }}
        >
          {isLogin ? 'Create a new account' : 'Already have an account?'}
        </p>
      </div>
    </div>
  );
}
