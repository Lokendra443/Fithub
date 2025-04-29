import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/auth.api';


const Login = () => {

    const [error, setError] = useState("");
    const navigate = useNavigate();



     // State for form data and error messages
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await loginUser(formData);
    console.log(res);


    if (res && res.token) {

        // Save token and role to localStorage
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.role);
        localStorage.setItem("email", res.email);
        localStorage.setItem("userId", res.userId);
        localStorage.setItem("name", res.name);
  
        // Redirect based on role
        if (res.role === "ADMIN") {
          navigate("/admin/dashboard");
        } else if (res.role === "TRAINER") {
          navigate("/trainer/dashboard");
        } else if (res.role === "USER") {
          navigate("/user/dashboard");
        } else {
          setError("Invalid role.");
        }
      } else {
        setError("Invalid email or password");
        setFormData({
            email: "",
            password: "",
          });
      }

      setTimeout(() =>{
        setError("")
    
    }, 5000)


    
  };

 


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login to FitHub</h2>

        {/* Error Message */}
        {error && (
            <div className="mb-4 text-red-500 text-center">{error}</div>
          )}

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Registration Link */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
