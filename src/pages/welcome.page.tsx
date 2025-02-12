import React from 'react'
import Header from '../components/header'
import Flexslider from '../components/flexslider'
import Fullstack from '../components/fullstack'
import Ourwork from '../components/ourwork'
import Solution from '../components/solution'
import Footer from '../components/footer'
import Aboutme from '../components/about-me'

interface Props { }

function WelcomePage(props: Props) {
  const { } = props

  return (
    <>
      <Header active='home' />
      <Flexslider />
      <Fullstack />
      <Ourwork />
      <Solution />
      <Aboutme />
      <Footer />
    </>
  )
}

export default WelcomePage
