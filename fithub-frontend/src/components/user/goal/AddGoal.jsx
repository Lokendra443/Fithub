import React, { useState } from 'react';
import { createGoal } from '../../../api/goal.api';


const AddGoal = ({ onClose }) => {
  const [goalData, setGoalData] = useState({
    title: '',
    description: '',
    targetDate: '',
    progress: '',
    status: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    setGoalData({ ...goalData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const formattedData = {
        ...goalData,
        targetDate: new Date(goalData.targetDate), // Convert string to Date object if needed by backend
        progress: parseInt(goalData.progress)
      };
      const result = await createGoal(formattedData);
      setSuccessMessage('Goal Added Successfully.');
      setGoalData({
        title: '',
        description: '',
        targetDate: '',
        progress: '',
        status: ''
      });
      
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong.');
    }

    setTimeout(() => {
      setSuccessMessage('');
      onClose(); // Close modal and trigger refresh
      setErrorMessage('');
    }, 5000);
  };

  return (
    <div className="w-full max-w-md mx-auto p-3 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-center text-gray-800 mb-2">Add Goal</h2>

      {successMessage && <p className="text-green-600 text-center mb-1 text-sm">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 text-center mb-1 text-sm">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-2 text-sm">
        <div>
          <label htmlFor="title" className="block font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={goalData.title}
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
            value={goalData.description}
            onChange={handleInputChange}
            rows="2"
            className="mt-1 p-1.5 w-full border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="targetDate" className="block font-medium text-gray-700">Target Date</label>
          <input
            type="date"
            id="targetDate"
            name="targetDate"
            value={goalData.targetDate}
            onChange={handleInputChange}
            className="mt-1 p-1.5 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="progress" className="block font-medium text-gray-700">Progress (%)</label>
          <input
            type="number"
            id="progress"
            name="progress"
            min="0"
            max="100"
            value={goalData.progress}
            onChange={handleInputChange}
            className="mt-1 p-1.5 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="status" className="block font-medium text-gray-700">Status</label>
          <select
            id="status"
            name="status"
            value={goalData.status}
            onChange={handleInputChange}
            className="mt-1 p-1.5 w-full border border-gray-300 rounded-md"
            required
          >
            <option value="">Select</option>
            <option value="NOT_STARTED">Not Started</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
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

export default AddGoal;
