import React from 'react'
import Header from '../components/header'
import { Outlet } from 'react-router'
import Footer from '../components/footer'

interface Props {}

function ProcessPage(props: Props) {
    const {} = props

    return (
        <div className="process-page">
            <Header active='process' />
            <Outlet />
            <Footer />
        </div>
    )
}

export default ProcessPage
