import React, { useState, useEffect } from 'react'
import { getAllWorkouts } from '../../../api/workout.api'
import { createExercise, updateExercise } from '../../../api/exercise.api'


const EditExercise = ({ exercise, onClose }) => {
  const [exerciseData, setExerciseData] = useState({
    name: exercise.name || '',
    description: exercise.description || '',
    sets: exercise.sets || '',
    repetitions: exercise.repetitions || '',
    durationInMinutes: exercise.durationInMinutes || '',
    targetMuscle: exercise.targetMuscle || '',
    equipment: exercise.equipment || '',
    workoutId: exercise.workoutId || ''
  })

  const [workouts, setWorkouts] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const fetchWorkouts = async () => {
      try {
        const data = await getAllWorkouts();
        console.log("Fetched workouts:", data);
        setWorkouts(data);
      } catch (error) {
        console.error('Error fetching workouts:', error.message);
      } 
    };


    useEffect(() => {
        fetchWorkouts();
      }, []);


    useEffect(() => {
        setExerciseData({
        
            name: exercise.name,
            description: exercise.description,
            sets: exercise.sets,
            repetitions: exercise.repetitions,
            durationInMinutes: exercise.durationInMinutes,
            targetMuscle: exercise.targetMuscle,
            equipment: exercise.equipment,
            workoutId: exercise.workoutId
          
        });
      }, [exercise]);


    
  

  const handleInputChange = (e) => {
    setExerciseData({ ...exerciseData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage('');
      setSuccessMessage('');
  
      try {
        const result = await updateExercise(exercise.id, exerciseData);
        setSuccessMessage('Exercise Updated Successfully.');
             
        
      } catch (error) {
        setErrorMessage(error.message || 'Something went wrong.');
      }
  
      setTimeout(() => {
        setErrorMessage('');
        setSuccessMessage('');
        onClose();
      }, 5000);
    };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Add Exercise</h2>

      {successMessage && <p className="text-green-600 text-center mb-2 text-sm">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 text-center mb-2 text-sm">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <label htmlFor="name" className="block font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={exerciseData.name}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={exerciseData.description}
            onChange={handleInputChange}
            rows="2"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="sets" className="block font-medium text-gray-700">Sets</label>
          <input
            type="number"
            id="sets"
            name="sets"
            value={exerciseData.sets}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="repetitions" className="block font-medium text-gray-700">Repetitions</label>
          <input
            type="number"
            id="repetitions"
            name="repetitions"
            value={exerciseData.repetitions}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="durationInMinutes" className="block font-medium text-gray-700">Duration (minutes)</label>
          <input
            type="number"
            id="durationInMinutes"
            name="durationInMinutes"
            value={exerciseData.durationInMinutes}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="targetMuscle" className="block font-medium text-gray-700">Target Muscle</label>
          <input
            type="text"
            id="targetMuscle"
            name="targetMuscle"
            value={exerciseData.targetMuscle}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="equipment" className="block font-medium text-gray-700">Equipment</label>
          <input
            type="text"
            id="equipment"
            name="equipment"
            value={exerciseData.equipment}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="workoutId" className="block font-medium text-gray-700">Select Workout</label>
          <select
            id="workoutId"
            name="workoutId"
            value={exerciseData.workoutId}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          >
            <option value="">-- Select a Workout --</option>
            {workouts.map((workout) => (
              <option key={workout.id} value={workout.id}>
                {workout.title}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2 flex justify-center">
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700"
          >
            Update Exercise
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditExercise
