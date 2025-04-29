import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import CommunityPage from './components/user/community/CommunityPage'
import WorkoutPage from './components/user/workout/WorkoutPage'
import GoalPage from './components/user/goal/GoalPage'
import UserDashboard from './components/user/UserDashboard'
import TrainerDashboard from './components/trainer/TrainerDashboard'
import MyClients from './components/trainer/my_clients/MyClients'
import AssignWorkouts from './components/trainer/assign_workouts/AssignWorkouts'
import Messages from './components/trainer/messages/Messages'
import AdminDashboard from './components/admin/AdminDashboard'
import ManageTrainers from './components/admin/manage_trainers/ManageTrainers'
import ManageUsers from './components/admin/manage_users/ManageUsers'
import AdminDashboardPage from './components/admin/AdminDashboardPage'
import TrainerDashboardPage from './components/trainer/TrainerDashboardPage'
import UserDashboardPage from './components/user/UserDashboardPage'
import Profile from './components/auth/Profile'
import ExercisePage from './components/user/exercise/ExercisePage'
import MealPlanPage from './components/user/meal_plan/MealPlanPage'





function App() {


  return (

    <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />

          {/* User Dashboard */}
          <Route path="/user" element={<UserDashboard />}>
            <Route path="dashboard" element={<UserDashboardPage />} /> {/* Default route to show the Dashboard component */}
            <Route path="workout" element={<WorkoutPage />} />
            <Route path="exercise" element={<ExercisePage />} />
            <Route path="goal" element={<GoalPage />} />
            <Route path="meal-plan" element={<MealPlanPage />} />
            <Route path="community" element={<CommunityPage />} />
          </Route>

         {/* Trainer Dashboard */}
          <Route path="/trainer" element={<TrainerDashboard />} >
            <Route path="dashboard" element={<TrainerDashboardPage />} />
            <Route path="my-clients" element={<MyClients />} />
            <Route path="assign-workouts" element={<AssignWorkouts />} />
            <Route path="messages" element={<Messages />} />
          
          </Route>


          {/* Trainer Dashboard */}
          <Route path="/admin" element={<AdminDashboard />} >
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="manage-users" element={<ManageUsers />} />
            <Route path="manage-trainers" element={<ManageTrainers />} />
          
          </Route>
        

        </Routes>
      </main>
     
  )
}

export default App
