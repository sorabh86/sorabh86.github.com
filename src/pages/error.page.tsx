// import React from 'react'
import { Link } from 'react-router'
import Header from '../components/header'
import Footer from '../components/footer'

function ErrorPage() {

  return (
    <div className='error-page page'>
      <Header />
      <div className="flex flex-col items-center justify-center py-10 grow bg-white text-black">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-orange-400 mb-2">Page Not Found</h2>
        <p className="mb-6 text-center">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="px-6 py-3 text-lg font-medium shadow-md btn-orange" > &lt; Back to Home </Link>
      </div>
      <Footer />
    </div>
  )
}

export default ErrorPage
