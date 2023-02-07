import React from 'react'
import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div class='404'>
        <div class="text-center bg-dark p-5 mb-2">
          <Link class='text-center mb-3' to="/"><img src={"/logo.png"} alt="Sorabh86" /></Link>
        </div>
        <div class="container text-center">
            <h1 class="sos-heading">404 - Not Found</h1>
            <p>
                Page doesn't exist. <br/>
                <Link to="/">&lt; back to home</Link>
            </p>
        </div>
    </div>
  )
}
