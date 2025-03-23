import React, { useState } from 'react'
import { Link } from 'react-router-dom';


const Register = () => {

    const [role, setRole] = useState("USER"); // Default role is USER
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
  const [profileImage, setProfileImage] = useState(null); // File state for profileImage
  const [certification, setCertification] = useState(null); // File state for certification

  // Handle role change
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  // Handle text input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    if (e.target.name === "profileImage") {
      setProfileImage(e.target.files[0]);
    } else if (e.target.name === "certification") {
      setCertification(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
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

    // Create FormData for file uploads
    const formDataToSend = new FormData();
    Object.keys(dataToSend).forEach((key) => {
      formDataToSend.append(key, dataToSend[key]);
    });
    if (profileImage) {
      formDataToSend.append("profileImage", profileImage);
    }
    if (certification && role === "TRAINER") {
      formDataToSend.append("certification", certification);
    }

    try {
      const response = await axios.post("http://localhost:8080/api/register", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Registration successful:", response.data);
      // Add redirection or success message here
    } catch (error) {
      console.error("Registration failed:", error);
      // Add error handling (e.g., display error message)
    }
  };




  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mt-3 mb-3">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Register for FitHub</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Role Selection */}
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

          {/* Two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
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

              {/* Profile Image Upload */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Profile Image</label>
                <input
                  type="file"
                  name="profileImage"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  accept="image/*"
                />
              </div>
            </div>

            {/* Right Column */}
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

                  <div className="mb-4">
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

                  <div className="mb-4">
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
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Certification</label>
                    <input
                      type="file"
                      name="certification"
                      onChange={handleFileChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      accept="image/*,application/pdf"
                      required
                    />
                  </div>

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
                </>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 mt-6"
          >
            Register
          </button>

          {/* Login Link */}
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

export default Register
