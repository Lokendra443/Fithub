import React from 'react'
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
    const navigate = useNavigate();

  // Function to redirect to the register page
  const handleCardClick = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <h1 className="text-4xl font-bold text-center mb-16 text-gray-800">Choose Your Plan</h1>
      <div className="flex flex-wrap justify-center gap-8">
        {/* 15-Day Free Trial Card */}
        <div
          className="w-full md:w-1/3 p-6 cursor-pointer"
          onClick={handleCardClick}
        >
          <div className="bg-white rounded-lg shadow-lg p-8 text-center transform transition duration-300 hover:scale-105 hover:shadow-xl min-h-[400px] flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">15-Day Free Trial</h2>
              <p className="text-5xl font-bold mb-6 text-green-600">Rs 0<span className="text-lg font-normal text-gray-600">/15 days</span></p>
              <ul className="text-gray-600 mb-8">
                <li className="mb-3">Access to all features</li>
                <li className="mb-3">No credit card required</li>
                <li className="mb-3">Cancel anytime</li>
              </ul>
            </div>
            <button className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition duration-300">
              Start Free Trial
            </button>
          </div>
        </div>

        {/* 3-Month Pack Card */}
        <div
          className="w-full md:w-1/3 p-6 cursor-pointer"
          onClick={handleCardClick}
        >
          <div className="bg-white rounded-lg shadow-lg p-8 text-center transform transition duration-300 hover:scale-105 hover:shadow-xl min-h-[400px] flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">3-Month Pack</h2>
              <p className="text-5xl font-bold mb-6 text-blue-600">Rs 100<span className="text-lg font-normal text-gray-600">/3 months</span></p>
              <ul className="text-gray-600 mb-8">
                <li className="mb-3">Full access to platform</li>
                <li className="mb-3">Personalized plans</li>
                <li className="mb-3">Priority support</li>
              </ul>
            </div>
            <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-300">
              Choose Plan
            </button>
          </div>
        </div>

        {/* 6-Month Pack Card */}
        <div
          className="w-full md:w-1/3 p-6 cursor-pointer"
          onClick={handleCardClick}
        >
          <div className="bg-white rounded-lg shadow-lg p-8 text-center transform transition duration-300 hover:scale-105 hover:shadow-xl min-h-[400px] flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">6-Month Pack</h2>
              <p className="text-5xl font-bold mb-6 text-blue-600">Rs 180<span className="text-lg font-normal text-gray-600">/6 months</span></p>
              <ul className="text-gray-600 mb-8">
                <li className="mb-3">All features included</li>
                <li className="mb-3">Advanced analytics</li>
                <li className="mb-3">24/7 support</li>
              </ul>
            </div>
            <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-300">
              Choose Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pricing
