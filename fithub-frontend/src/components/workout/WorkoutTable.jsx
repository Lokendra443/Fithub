import React, { useEffect, useState } from 'react'
import { deleteWorkout, getAllWorkouts } from '../utils/ApiFunctions';
import { Pencil, Trash2 } from 'lucide-react';

const WorkoutTable = () => {

    const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWorkouts = async () => {
    try {
      const data = await getAllWorkouts();
      setWorkouts(data);
    } catch (error) {
      console.error("Error fetching workouts:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this workout?")) {
      try {
        await deleteWorkout(id);
        setWorkouts((prev) => prev.filter((w) => w.id !== id));
      } catch (error) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  if (loading) return <div className="text-center p-4">Loading workouts...</div>;



  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Workout List</h2>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
            <th className="px-4 py-2 border">Id</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Intensity</th>
              <th className="px-4 py-2 border">Duration (min)</th>
              <th className="px-4 py-2 border">Calories</th>
              <th className="px-4 py-2 border">Created</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {workouts.map((workout) => (
              <tr key={workout.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 border">{workout.id}</td>
                <td className="px-4 py-2 border">{workout.title}</td>
                <td className="px-4 py-2 border">{workout.description}</td>
                <td className="px-4 py-2 border">{workout.workoutType}</td>
                <td className="px-4 py-2 border">{workout.intensity}</td>
                <td className="px-4 py-2 border">{workout.duration}</td>
                <td className="px-4 py-2 border">{workout.caloriesBurned}</td>
                
                <td className="px-4 py-2 border">
                {workout.createdAt}
                </td>
                
                
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => alert("Edit functionality coming soon")}
                    className="text-blue-600 hover:text-blue-800 mx-1"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(workout.id)}
                    className="text-red-600 hover:text-red-800 mx-1"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {workouts.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center p-4">
                  No workouts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default WorkoutTable
