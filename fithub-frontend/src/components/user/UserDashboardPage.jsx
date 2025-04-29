import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Container, 
  Grid, 
  Paper, 
  Typography,
  CircularProgress,
  useTheme,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  LinearProgress
} from '@mui/material';
import { 
  MoreVert as MoreVertIcon,
  Directions as DirectionsIcon,
  Restaurant as RestaurantIcon,
  EmojiEvents as EmojiEventsIcon,
  FitnessCenter as FitnessCenterIcon
} from '@mui/icons-material';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { format, subDays, isAfter } from 'date-fns';
import { getWorkoutsByUserId } from '../../api/workout.api';
import { getExercisesByUserId } from '../../api/exercise.api';
import { getGoalsByUserId } from '../../api/goal.api';
import { getMealPlansByUserId } from '../../api/meal-plan.api';

const UserDashboardPage = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [goals, setGoals] = useState([]);
  const [mealPlans, setMealPlans] = useState([]);
  const [workoutStats, setWorkoutStats] = useState({
    totalWorkouts: 0,
    totalCaloriesBurned: 0,
    totalDuration: 0,
    recentWorkouts: []
  });
  const [exerciseStats, setExerciseStats] = useState({
    totalExercises: 0,
    byMuscleGroup: {},
    byEquipment: {}
  });
  const [goalProgress, setGoalProgress] = useState([]);
  const [nutritionData, setNutritionData] = useState({
    caloriesData: [],
    macronutrientsData: []
  });

  const userId = localStorage.getItem('userId');

  // Colors for charts
  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.info.main,
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#ff8042'
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch all data
        const workoutsData = await getWorkoutsByUserId(userId);
        const exercisesData = await getExercisesByUserId(userId);
        const goalsData = await getGoalsByUserId(userId);
        const mealPlansData = await getMealPlansByUserId(userId);

        // Set raw data
        setWorkouts(workoutsData);
        setExercises(exercisesData);
        setGoals(goalsData);
        setMealPlans(mealPlansData);

        // Process workout data
        processWorkoutData(workoutsData);
        
        // Process exercise data
        processExerciseData(exercisesData);
        
        // Process goal data
        processGoalData(goalsData);
        
        // Process meal plan data
        processMealPlanData(mealPlansData);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const processWorkoutData = (workoutsData) => {
    // Calculate total workouts
    const totalWorkouts = workoutsData.length;
    
    // Calculate total calories burned
    const totalCaloriesBurned = workoutsData.reduce(
      (sum, workout) => sum + workout.caloriesBurned, 
      0
    );
    
    // Calculate total duration
    const totalDuration = workoutsData.reduce(
      (sum, workout) => sum + workout.duration, 
      0
    );

    // Get recent workouts (last 7 days)
    const sevenDaysAgo = subDays(new Date(), 7);
    const recentWorkouts = workoutsData.filter(workout => {
      const workoutDate = new Date(
        workout.createdAt[0],
        workout.createdAt[1] - 1,
        workout.createdAt[2]
      );
      return isAfter(workoutDate, sevenDaysAgo);
    });

    // Prepare workout activity data for the line chart
    const workoutActivityData = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const formattedDate = format(date, 'MM/dd');
      
      const workoutsOnThisDay = workoutsData.filter(workout => {
        const workoutDate = new Date(
          workout.createdAt[0],
          workout.createdAt[1] - 1,
          workout.createdAt[2]
        );
        return format(workoutDate, 'MM/dd') === formattedDate;
      });

      const caloriesBurned = workoutsOnThisDay.reduce(
        (sum, workout) => sum + workout.caloriesBurned, 
        0
      );

      workoutActivityData.push({
        date: formattedDate,
        calories: caloriesBurned,
        count: workoutsOnThisDay.length
      });
    }

    // Workout types distribution
    const workoutTypeData = {};
    workoutsData.forEach(workout => {
      const type = workout.workoutType;
      workoutTypeData[type] = (workoutTypeData[type] || 0) + 1;
    });
    
    const workoutTypeChartData = Object.keys(workoutTypeData).map(type => ({
      name: type,
      value: workoutTypeData[type]
    }));

    setWorkoutStats({
      totalWorkouts,
      totalCaloriesBurned,
      totalDuration,
      recentWorkouts: recentWorkouts.slice(0, 5), // Get the 5 most recent workouts
      workoutActivityData,
      workoutTypeChartData
    });
  };

  const processExerciseData = (exercisesData) => {
    // Calculate total exercises
    const totalExercises = exercisesData.length;
    
    // Group by muscle
    const byMuscleGroup = {};
    exercisesData.forEach(exercise => {
      const muscle = exercise.targetMuscle;
      byMuscleGroup[muscle] = (byMuscleGroup[muscle] || 0) + 1;
    });
    
    // Group by equipment
    const byEquipment = {};
    exercisesData.forEach(exercise => {
      const equipment = exercise.equipment;
      byEquipment[equipment] = (byEquipment[equipment] || 0) + 1;
    });

    const muscleChartData = Object.keys(byMuscleGroup).map(muscle => ({
      name: muscle,
      value: byMuscleGroup[muscle]
    }));

    const equipmentChartData = Object.keys(byEquipment).map(equipment => ({
      name: equipment,
      value: byEquipment[equipment]
    }));

    setExerciseStats({
      totalExercises,
      byMuscleGroup,
      byEquipment,
      muscleChartData,
      equipmentChartData
    });
  };

  const processGoalData = (goalsData) => {
    // Sort goals by progress percentage
    const sortedGoals = [...goalsData].sort((a, b) => b.progress - a.progress);
    setGoalProgress(sortedGoals.slice(0, 5)); // Get top 5 goals by progress
  };

  const processMealPlanData = (mealPlansData) => {
    // Prepare calories trend data
    const caloriesData = mealPlansData.map(meal => ({
      name: meal.name,
      calories: meal.calories
    })).slice(0, 7); // Limit to 7 meal plans for clarity
    
    // Prepare macronutrients data for the most recent meal plan
    const macronutrientsData = mealPlansData.length > 0 ? [
      { name: 'Protein', value: mealPlansData[0].protein },
      { name: 'Carbs', value: mealPlansData[0].carbs },
      { name: 'Fat', value: mealPlansData[0].fat }
    ] : [];

    setNutritionData({
      caloriesData,
      macronutrientsData
    });
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Summary Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Total Workouts
              </Typography>
              <Box display="flex" alignItems="center">
                <DirectionsIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                <Typography variant="h4">
                  {workoutStats.totalWorkouts}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Total Exercises
              </Typography>
              <Box display="flex" alignItems="center">
                <FitnessCenterIcon sx={{ color: theme.palette.secondary.main, mr: 1 }} />
                <Typography variant="h4">
                  {exerciseStats.totalExercises}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Calories Burned
              </Typography>
              <Box display="flex" alignItems="center">
                <EmojiEventsIcon sx={{ color: theme.palette.success.main, mr: 1 }} />
                <Typography variant="h4">
                  {workoutStats.totalCaloriesBurned}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Active Goals
              </Typography>
              <Box display="flex" alignItems="center">
                <RestaurantIcon sx={{ color: theme.palette.error.main, mr: 1 }} />
                <Typography variant="h4">
                  {goals.length}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content Row 1 */}
      <Grid container spacing={3} mb={3}>
        {/* Workout Activity Chart */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader
              title="Workout Activity (Last 7 Days)"
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent>
              <ResponsiveContainer width={600} height={350}>
                <LineChart
                  data={workoutStats.workoutActivityData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="calories"
                    name="Calories Burned"
                    stroke={theme.palette.primary.main}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="count"
                    name="Workout Count"
                    stroke={theme.palette.secondary.main}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Workout Types Pie Chart */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="Workout Types" />
            <Divider />
            <CardContent>
              <ResponsiveContainer width={400} height={350}>
                <PieChart>
                  <Pie
                    data={workoutStats.workoutTypeChartData || []}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {workoutStats.workoutTypeChartData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} workouts`, 'Count']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content Row 2 */}
      <Grid container spacing={3} mb={3}>
        {/* Target Muscle Groups */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Target Muscle Groups" />
            <Divider />
            <CardContent>
              <ResponsiveContainer width={600} height={350}>
                <BarChart
                  data={exerciseStats.muscleChartData || []}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Exercises" fill={theme.palette.primary.main} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Equipment Usage */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Equipment Usage" />
            <Divider />
            <CardContent>
              <ResponsiveContainer width={400} height={350}>
                <RadarChart outerRadius={90} data={exerciseStats.equipmentChartData || []}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis />
                  <Radar
                    name="Equipment Usage"
                    dataKey="value"
                    stroke={theme.palette.secondary.main}
                    fill={theme.palette.secondary.main}
                    fillOpacity={0.6}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content Row 3 */}
      <Grid container spacing={3}>

        {/* Nutrition Data */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Nutrition Overview" />
            <Divider />
            <CardContent>
              {nutritionData.macronutrientsData.length > 0 ? (
                <ResponsiveContainer width={500} height={350}>
                  <PieChart>
                    <Pie
                      data={nutritionData.macronutrientsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {nutritionData.macronutrientsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}g`, 'Amount']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <Typography variant="body2" color="textSecondary" align="center">
                  No nutrition data found.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>


        {/* Goal Progress */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Goal Progress" />
            <Divider />
            <CardContent>
              <List>
                {goalProgress.map((goal) => (
                  <ListItem key={goal.id} sx={{ display: 'block' }}>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <ListItemText primary={goal.title} secondary={goal.description} />
                      <Typography variant="body2" color="textSecondary">
                        {goal.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={goal.progress}
                      sx={{ mb: 2, height: 8, borderRadius: 5 }}
                    />
                  </ListItem>
                ))}
                {goalProgress.length === 0 && (
                  <Typography variant="body2" color="textSecondary" align="center">
                    No goals found.
                  </Typography>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>
        
      </Grid>
    </Container>
  );
};

export default UserDashboardPage;