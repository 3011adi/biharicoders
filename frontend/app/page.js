'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Page = () => {
  // Refs for GSAP animations
  const heroRef = useRef(null)
  const servicesRef = useRef(null)

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)
    
    // Hero section animations
    const heroElements = heroRef.current.children
    gsap.fromTo(
      heroElements, 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power3.out" }
    )
    
    // Services section animations
    const serviceCards = document.querySelectorAll('.service-card')
    gsap.fromTo(
      serviceCards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 80%",
        }
      }
    )
    
    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Service card hover animation
  const handleCardHover = (e, isEnter) => {
    gsap.to(e.currentTarget, {
      y: isEnter ? -10 : 0,
      scale: isEnter ? 1.05 : 1,
      boxShadow: isEnter ? "0 10px 25px rgba(0,0,0,0.1)" : "0 4px 6px rgba(0,0,0,0.05)",
      duration: 0.3
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 relative overflow-hidden">
        <div ref={heroRef} className="max-w-3xl mx-auto text-center">
          <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium inline-block mb-4">Find Local Professionals</span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            Connecting You to Local Service Professionals
          </h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            We bring local service businesses like plumbing, carpentry, electrical work, and more directly to customers who need them.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/loginuser">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-md text-lg font-medium shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                Find Services
              </button>
            </Link>
            <Link href="/loginprovider">
              <button className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-md text-lg font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
                List Your Business
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium inline-block mb-4">Services</span>
          <h2 className="text-4xl font-bold mb-4">Our Featured Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Connect with top-rated service professionals in your area for all your home improvement and maintenance needs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: 'Plumbing', icon: '🔧', description: 'From leaky faucets to complete bathroom renovations.' },
            { name: 'Carpentry', icon: '🪚', description: 'Custom woodwork, furniture repair, and installations.' },
            { name: 'Electrical', icon: '⚡', description: 'Wiring, lighting, and electrical system maintenance.' },
            { name: 'Painting', icon: '🎨', description: 'Interior and exterior painting services for homes and businesses.' },
            { name: 'Landscaping', icon: '🌿', description: 'Garden design, maintenance, and outdoor transformations.' },
            { name: 'Cleaning', icon: '✨', description: 'Professional cleaning services for homes and commercial spaces.' }
          ].map((service) => (
            <div 
              key={service.name} 
              className="service-card bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col"
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{service.name}</h3>
              <p className="text-gray-600 flex-grow">{service.description}</p>
              <Link href={`/services/${service.name.toLowerCase()}`} className="text-blue-600 font-medium mt-4 inline-block hover:text-blue-800 transition-colors">
                Find {service.name} Pros →
              </Link>
            </div>
          ))}
        </div>
      </section>

      
    </div>
  )
}

export default Page