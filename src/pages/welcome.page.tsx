// import React from 'react'
import Flexslider from '../components/flexslider'
import Fullstack from '../components/fullstack'
import Ourwork from '../components/ourwork'
import Solution from '../components/solution'
import Aboutme from '../components/about-me'

interface Props { }

function WelcomePage(props: Props) {
  const { } = props

  return (
    <>
      <Flexslider />
      <Fullstack />
      <Ourwork />
      <Solution />
      <Aboutme />
    </>
  )
}

export default WelcomePage
