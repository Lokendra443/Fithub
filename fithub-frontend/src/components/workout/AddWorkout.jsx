import React, { useState } from 'react';
import { createWorkout } from '../utils/ApiFunctions';

const AddWorkout = ({ onClose }) => {
  const [workoutData, setWorkoutData] = useState({
    title: '',
    description: '',
    workoutType: '',
    intensity: '',
    duration: '',
    caloriesBurned: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    setWorkoutData({ ...workoutData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const result = await createWorkout(workoutData);
      setSuccessMessage('Workout Added Successfully.');
      setWorkoutData({
        title: '',
        description: '',
        workoutType: '',
        intensity: '',
        duration: '',
        caloriesBurned: ''
      });
      onClose();
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong.');
    }

    setTimeout(() => {
      setErrorMessage('');
      setSuccessMessage('');
    }, 5000);
  };

  return (
    <div className="w-full max-w-md mx-auto p-3 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-center text-gray-800 mb-2">Add Workout</h2>

      {successMessage && <p className="text-green-600 text-center mb-1 text-sm">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 text-center mb-1 text-sm">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-2 text-sm">
        <div>
          <label htmlFor="title" className="block font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={workoutData.title}
            onChange={handleInputChange}
            className="mt-1 p-1.5 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={workoutData.description}
            onChange={handleInputChange}
            rows="2"
            className="mt-1 p-1.5 w-full border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="workoutType" className="block font-medium text-gray-700">Workout Type</label>
          <select
            id="workoutType"
            name="workoutType"
            value={workoutData.workoutType}
            onChange={handleInputChange}
            className="mt-1 p-1.5 w-full border border-gray-300 rounded-md"
            required
          >
            <option value="">Select</option>
            <option value="STRENGTH">Strength</option>
            <option value="CARDIO">Cardio</option>
            <option value="FLEXIBILITY">Flexibility</option>
            <option value="BODYWEIGHT">Bodyweight</option>
            <option value="SPORTS">Sports</option>
            <option value="DANCE">Dance</option>
          </select>
        </div>

        <div>
          <label htmlFor="intensity" className="block font-medium text-gray-700">Intensity</label>
          <select
            id="intensity"
            name="intensity"
            value={workoutData.intensity}
            onChange={handleInputChange}
            className="mt-1 p-1.5 w-full border border-gray-300 rounded-md"
            required
          >
            <option value="">Select</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <div>
          <label htmlFor="duration" className="block font-medium text-gray-700">Duration (minutes)</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={workoutData.duration}
            onChange={handleInputChange}
            className="mt-1 p-1.5 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="caloriesBurned" className="block font-medium text-gray-700">Calories Burned</label>
          <input
            type="number"
            id="caloriesBurned"
            name="caloriesBurned"
            value={workoutData.caloriesBurned}
            onChange={handleInputChange}
            className="mt-1 p-1.5 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-2 px-4 py-1.5 bg-blue-600 text-white font-medium rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddWorkout;
