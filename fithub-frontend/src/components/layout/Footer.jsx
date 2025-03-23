import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex space-x-6 mb-4">
          <a href='/' className="hover:text-gray-300">Home</a>
          <a href='#features' className="hover:text-gray-300">Features</a>
          <a href='#pricing' className="hover:text-gray-300">Pricing</a>
        </div>
        <p className="text-sm">&copy; 2025 Fithub. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
