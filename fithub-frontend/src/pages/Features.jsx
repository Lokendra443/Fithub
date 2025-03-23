import React from 'react'
import { FaBullseye, FaChartLine, FaDumbbell, FaUsers } from 'react-icons/fa';


const Features = () => {


    // Array of feature data for cards
  const features = [
    {
      title: 'Track Workouts',
      description: 'Log your exercises, sets, and reps effortlessly to stay on top of your fitness routine.',
      icon: <FaDumbbell/>, 
    },
    {
      title: 'Set Goals',
      description: 'Define achievable fitness goals and track your journey toward success.',
      icon: <FaBullseye/>,
    },
    {
      title: 'Monitor Progress',
      description: 'Visualize your improvements with intuitive charts and stats.',
      icon: <FaChartLine/>,
    },
    {
      title: 'Join Community',
      description: 'Connect with others, share achievements, and stay motivated.',
      icon: <FaUsers/>,
    },
  ];


  return (
    <div className="min-h-screen bg-gray-100 pt-20">
    {/* Header */}
    <header className="text-center py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Key Features</h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
        Discover how FitHub empowers you to take control of your fitness journey.
      </p>
    </header>

    {/* Features Grid */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 text-center transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="flex justify-center items-center h-16 mb-4">
                <span className="text-4xl">{feature.icon}</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h2>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
   
  )
}

export default Features
