// import React from 'react'
import { Outlet } from 'react-router'

interface Props {}

function ProcessPage(props: Props) {
    const {} = props

    return (
        <div className="process-page">
            <Outlet />
        </div>
    )
}

export default ProcessPage
