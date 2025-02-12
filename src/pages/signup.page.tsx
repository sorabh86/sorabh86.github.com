import React from 'react'
import Header from '../components/header'

interface Props {}

function SignupPage(props: Props) {
    const {} = props

    return (
        <div className="signup-page">
            <Header active='signup' />
        <h1>Signup Page</h1>
        </div>
    )
}

export default SignupPage
