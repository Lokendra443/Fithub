import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import UserDashboard from './components/user/UserDashboard'
import TrainerDashboard from './components/trainer/TrainerDashboard'
import AdminDashboard from './components/admin/AdminDashboard'
import WorkoutPage from './components/workout/WorkoutPage'
import GoalPage from './components/goal/GoalPage'
import CommunityPage from './components/community/CommunityPage'
import Dashboard from './components/user/Dashboard'



function App() {


  return (
    <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User Dashboard */}
          <Route path="/user" element={<UserDashboard />}>
            <Route path="dashboard" element={<Dashboard />} /> {/* Default route to show the Dashboard component */}
            <Route path="workout" element={<WorkoutPage />} />
            <Route path="goal" element={<GoalPage />} />
            <Route path="community" element={<CommunityPage />} />
          </Route>

         {/* Trainer Dashboard */}
          <Route path="/trainer/dashboard" element={<TrainerDashboard />} />


          {/* Trainer Dashboard */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        

        </Routes>
      </main>
  )
}

export default App
