import React from 'react'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import About from '../components/About'
import Campaigns from '../components/Campaigns'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Campaigns />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  )
}
