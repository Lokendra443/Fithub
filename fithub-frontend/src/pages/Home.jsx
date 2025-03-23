import React from 'react'
import HeroSection from '../components/layout/HeroSection'
import Features from './Features'
import Navbar from '../components/layout/Navbar'
import Pricing from './Pricing'
import Footer from '../components/layout/Footer'


const Home = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <section id='features'>
        <Features/>
      </section>

      <section id='pricing'>
        <Pricing/>
      </section>
      <Footer/>
      
      
      
    </div>
  )
}

export default Home
