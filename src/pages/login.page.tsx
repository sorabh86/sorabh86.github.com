import React from 'react';
import { Link, useNavigate } from 'react-router';
import sorabhStore from '../store/sorabh-store';
import useUserStore from '../store/users-store';

export default function LoginPage() {
  const { isLoading} = sorabhStore();
  const {login} = useUserStore();

  const [message, setMessage] = React.useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const res = await login(email, password);

    if(!res.success) {
      setMessage('Failed to create an account: ' + res.error);
    } else {
      // setMessage('Login Sucessfully');
      (e.target as HTMLFormElement).reset();
      // console.log(getState().currentUser);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full bg-dark p-5 mb-2 text-center">
        <Link to="/">
          <img src="/logo.png" alt="Sorabh86 Logo" className="mx-auto" />
        </Link>
      </div>
      <div className="w-full max-w-md mt-5">
        <div className="shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-so-orange text-center mb-4">Login</h2>
          {message && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2"> Email </label>
              <input type="email" name="email" required autoComplete='autoComplete' id='email'
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2"> Password </label>
              <input type="password" name="password" required id='password'
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className="text-center mt-4">
            Do not have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};