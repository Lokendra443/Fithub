import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { registerUser } from '../../api/auth.api';

const Register = () => {
  const [role, setRole] = useState("USER");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    dateOfBirth: "",
    height: "",
    weight: "",
    fitnessLevel: "",
    fitnessGoal: "",
    experience: "",
  });

  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const dataToSend =
      role === "USER"
        ? {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            gender: formData.gender,
            dateOfBirth: formData.dateOfBirth,
            height: formData.height,
            weight: formData.weight,
            fitnessLevel: formData.fitnessLevel,
            fitnessGoal: formData.fitnessGoal,
            role: "USER",
          }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            gender: formData.gender,
            experience: formData.experience,
            role: "TRAINER",
          };

    try {
      const result = await registerUser(dataToSend);
      setSuccessMessage("Registration successful! Please login.");
      setFormData({
        name: "",
        email: "",
        password: "",
        gender: "",
        dateOfBirth: "",
        height: "",
        weight: "",
        fitnessLevel: "",
        fitnessGoal: "",
        experience: "",
      });
      setRole("USER");
    } catch (error) {
      setErrorMessage(error.message);
    }

    setTimeout(() => {
      setErrorMessage("")
      setSuccessMessage("")
    }, 5000)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-2xl mt-3 mb-3">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Register for FitHub</h2>

        {successMessage && <h3 className="text-green-600 text-center mb-4">{successMessage}</h3>}
        {errorMessage && <h3 className="text-red-600 text-center mb-4">{errorMessage}</h3>}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Role</label>
            <select
              value={role}
              onChange={handleRoleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="USER">User</option>
              <option value="TRAINER">Trainer</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>

            <div>
              {role === "USER" && (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Height (cm)</label>
                      <input
                        type="number"
                        name="height"
                        value={formData.height}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Weight (kg)</label>
                      <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Fitness Level</label>
                    <select
                      name="fitnessLevel"
                      value={formData.fitnessLevel}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Fitness Level</option>
                      <option value="BEGINNER">Beginner</option>
                      <option value="INTERMEDIATE">Intermediate</option>
                      <option value="ADVANCED">Advanced</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Fitness Goal</label>
                    <select
                      name="fitnessGoal"
                      value={formData.fitnessGoal}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Fitness Goal</option>
                      <option value="WEIGHT_LOSS">Weight Loss</option>
                      <option value="MUSCLE_GAIN">Muscle Gain</option>
                      <option value="MAINTENANCE">Maintenance</option>
                      <option value="STRENGTH_TRAINING">Strength Training</option>
                      <option value="FLEXIBILITY">Flexibility</option>
                      <option value="GENERAL_FITNESS">General Fitness</option>
                      <option value="IMPROVE_POSTURE">Improve Posture</option>
                    </select>
                  </div>
                </>
              )}

              {role === "TRAINER" && (
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Experience (years)</label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 mt-6"
          >
            Register
          </button>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register;
