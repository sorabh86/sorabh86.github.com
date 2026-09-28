import React from 'react';
import { Link, useNavigate } from 'react-router';
import sorabhStore from '../store/sorabh-store';
import useUserStore from '../store/users-store';

export default function LoginPage() {
  const { isLoading, setLoading} = sorabhStore();
  const {login, sendPasswordReset} = useUserStore();

  const [message, setMessage] = React.useState<string>('');
  const [messageType, setMessageType] = React.useState<'success' | 'error'>('error');
  const [email, setEmail] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('error');

    const formData = new FormData(e.target as HTMLFormElement);
    const submittedEmail = formData.get('email') as string;
    const password = formData.get('password') as string;

    const res = await login(submittedEmail, password);

    if(!res.success) {
      setMessage('Failed to login: ' + res.error);
    } else {
      // setMessage('Login Sucessfully');
      (e.target as HTMLFormElement).reset();
      // console.log(getState().currentUser);
      navigate('/dashboard');
    }
    setLoading(false);
  };

  const handlePasswordReset = async () => {
    if (!email.trim()) {
      setMessage('Enter your email address first, then request a reset link.');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');
    const result = await sendPasswordReset(email.trim());
    setMessageType(result.success ? 'success' : 'error');
    setMessage(result.success
      ? 'If an account uses that email, Firebase will send a password reset link.'
      : 'Unable to send a reset email. Check the address and try again.');
    setLoading(false);
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
            <div role={messageType === 'error' ? 'alert' : 'status'} className={`${messageType === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'} border px-4 py-3 rounded mb-4`}>
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2"> Email </label>
              <input type="email" name="email" required autoComplete="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2"> Password </label>
              <input type="password" name="password" required id='password'
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4 text-right">
              <button type="button" onClick={handlePasswordReset} disabled={isLoading} className="text-sm text-blue-600 hover:underline disabled:opacity-50">
                Forgot password?
              </button>
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