import React, { useState } from 'react';
import { createMealPlan } from '../../../api/meal-plan.api';


const AddMealPlan = ({ onClose }) => {
  const [mealPlanData, setMealPlanData] = useState({
    name: '',
    description: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    setMealPlanData({ ...mealPlanData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const result = await createMealPlan(mealPlanData);
      setSuccessMessage('Meal Plan Added Successfully.');

      setMealPlanData({
        name: '',
        description: '',
        calories: '',
        protein: '',
        carbs: '',
        fat: ''
      });
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong.');
    }

    setTimeout(() => {
      setErrorMessage('');
      setSuccessMessage('');
      onClose(); // close the modal
    }, 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto p-3 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-center text-gray-800 mb-2">Add Meal Plan</h2>

      {successMessage && <p className="text-green-600 text-center mb-1 text-sm">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 text-center mb-1 text-sm">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-2 text-sm">
        <div>
          <label htmlFor="name" className="block font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={mealPlanData.name}
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
            value={mealPlanData.description}
            onChange={handleInputChange}
            rows="2"
            className="mt-1 p-1.5 w-full border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="calories" className="block font-medium text-gray-700">Calories</label>
          <input
            type="number"
            id="calories"
            name="calories"
            value={mealPlanData.calories}
            onChange={handleInputChange}
            className="mt-1 p-1.5 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="protein" className="block font-medium text-gray-700">Protein (g)</label>
          <input
            type="number"
            step="0.1"
            id="protein"
            name="protein"
            value={mealPlanData.protein}
            onChange={handleInputChange}
            className="mt-1 p-1.5 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="carbs" className="block font-medium text-gray-700">Carbs (g)</label>
          <input
            type="number"
            step="0.1"
            id="carbs"
            name="carbs"
            value={mealPlanData.carbs}
            onChange={handleInputChange}
            className="mt-1 p-1.5 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="fat" className="block font-medium text-gray-700">Fat (g)</label>
          <input
            type="number"
            step="0.1"
            id="fat"
            name="fat"
            value={mealPlanData.fat}
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
            Add Meal Plan
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMealPlan;
