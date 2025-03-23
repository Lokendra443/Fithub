import React from 'react'


const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')`, // Fitness-themed image
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 animate-fade-in">
          Transform Your Fitness Journey
        </h1>
        <p className="text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto">
          Join FitHub to track workouts, set goals, and connect with a community that inspires you to thrive.
        </p>
        <a
          href="/register"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105"
        >
          Get Started
        </a>
      </div>

      
    </section>
  )
}

export default HeroSection
