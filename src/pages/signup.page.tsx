// src/pages/signup.page.tsx
import React, { useState } from 'react';
import { Link } from 'react-router';
import { User, USER_ROLES } from '../types/default-type';
import { Timestamp } from 'firebase/firestore';
import useUserStore from '../store/users-store';
import sorabhStore from '../store/sorabh-store';

export default function SignupPage() {

  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const {isLoading, setLoading} = sorabhStore();
  const { signup } = useUserStore();
  // const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    setSuccess(false);
    setMessage('');

    const formData = new FormData(e.target as HTMLFormElement);
    const cpassword = formData.get('cpassword') as string;

    const user: User = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      phone: '',
      address: '',
      create_date: Timestamp.now(),
      last_login: Timestamp.now(),
      role: USER_ROLES.SUBSCRIBER,
    };

    // Check if passwords match
    if (user.password !== cpassword) {
      return setMessage('Passwords do not match');
    }

    const result = await signup(user);

    setSuccess(result.success);
    if (!result.success) {
      setMessage('Failed to create an account: ' + result.error);
    } else {
      setMessage("You are register, successfully, Please login")
    }

    setLoading(false);
  };

  return (
    <div className="signup">
      <div className="flex-grow flex items-center justify-center py-10">
        <div className="w-full max-w-md p-4">
          <div className=" p-6">
            <h2 className="text-2xl font-bold text-green-600 text-center mb-4">Sign Up</h2>
            {message && (
              <div className={`${success ? 'bg-green-100 border border-green-400 text-green-700' :
                'bg-red-100 border border-red-400 text-red-700'} px-4 py-3 rounded mb-4`}>
                {message}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name='name'
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name='email'
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name='password'
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirm-password" className="block mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  name='cpassword'
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 disabled:opacity-50"
              >
                {isLoading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </form>
            <div className="text-center mt-4">
              Already have an account?{' '}
              <Link to="/login" className="text-green-600 hover:underline">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};