// import React from 'react'
import Footer from '../components/footer'
import Header from '../components/header'
import { Outlet } from 'react-router'

interface Props { }

function IndexPage(props: Props) {
  const { } = props

  return (
    <div className='flex flex-col h-full'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default IndexPage
