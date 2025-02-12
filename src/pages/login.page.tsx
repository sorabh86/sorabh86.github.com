import React from 'react'
import Header from '../components/header'

interface Props {}

function LoginPage(props: Props) {
    const {} = props

    return (
        <div className="login-page">
            <Header active='login' />
            <h1>Login Page</h1>
        </div>
    )
}

export default LoginPage
