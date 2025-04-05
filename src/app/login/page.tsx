'use client';

import { useState } from 'react';
import Input from '@/components/Input';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '@/config';
import Link from 'next/link';
// import toast from 'react-hot-toast';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // For demo, let's add a direct login for testing
      if (formData.email === 'demo@growfi.com' && formData.password === 'password') {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Store dummy token and user data
        localStorage.setItem('token', 'demo-token-123456');
        localStorage.setItem('user', JSON.stringify({
          id: '1',
          name: 'Demo User',
          email: 'demo@growfi.com',
          role: 'user'
        }));
        
        router.push('/dashboard');
        return;
      }

      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Login failed');
      }

      // Store the token and user data in localStorage
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.data));

      // Navigate to dashboard/homepage after login
      router.push('/dashboard');

      // toast.success('Login successful!');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      // toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-6 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
        <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto bg-white relative overflow-hidden">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-10"></div>
          <div className="relative">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mb-8">
                <h3 className="text-gray-800 text-3xl font-bold">Sign in</h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                  Sign in to your account and explore a world of investment possibilities.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div className="mb-4">
                <label className="text-gray-800 text-sm mb-2 block">Email address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <Input
                label="Password"
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="/forgot-password" className="text-blue-600 hover:underline font-semibold">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-colors duration-200 flex justify-center items-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>

              <p className="text-sm !mt-8 text-center text-gray-500">
                Don't have an account?
                <Link href="/signup" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">
                  Register here
                </Link>
              </p>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Demo credentials: demo@growfi.com / password
              </p>
            </div>
          </div>
        </div>

        <div className="max-md:hidden">
          <img
            src="https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            className="w-full aspect-[71/50] max-md:w-4/5 mx-auto block object-cover rounded-lg shadow-lg"
            alt="Investment dashboard"
          />
        </div>
      </div>
    </div>
  );
} 