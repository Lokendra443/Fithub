import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { getAllUsers } from "../../api/user.api";


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminDashboardPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllUsers();
      setUsers(data);
    };
    fetchData();
  }, []);

  const userList = users.filter((user) => user.role === "USER");
  const trainerList = users.filter((user) => user.role === "TRAINER");
  const adminList = users.filter((user) => user.role === "ADMIN");

  const genderData = [
    { name: "Male", value: users.filter((u) => u.gender === "MALE").length },
    {
      name: "Female",
      value: users.filter((u) => u.gender === "FEMALE").length,
    },
    { name: "Other", value: users.filter((u) => u.gender === "OTHER").length },
  ];

  const goalData = [
    {
      name: "Lose Weight",
      count: userList.filter((u) => u.fitnessGoal === "WEIGHT_LOSS").length,
    },
    {
      name: "Muscle Gain",
      count: userList.filter((u) => u.fitnessGoal === "MUSCLE_GAIN").length,
    },
    {
      name: "Strength Training",
      count: userList.filter((u) => u.fitnessGoal === "STRENGTH_TRAINING")
        .length,
    },
    {
      name: "Flexibility",
      count: userList.filter((u) => u.fitnessGoal === "FLEXIBILITY").length,
    },
    {
      name: "General Fitness",
      count: userList.filter((u) => u.fitnessGoal === "GENERAL_FITNESS").length,
    },
  ];

  const levelData = [
    {
      name: "Beginner",
      count: userList.filter((u) => u.fitnessLevel === "BEGINNER").length,
    },
    {
      name: "Intermediate",
      count: userList.filter((u) => u.fitnessLevel === "INTERMEDIATE").length,
    },
    {
      name: "Advanced",
      count: userList.filter((u) => u.fitnessLevel === "ADVANCED").length,
    },
  ];

  const registrationsByMonth = () => {
    const monthCounts = Array(12).fill(0);

    userList.forEach((user) => {
      const createdAt = user.createdAt;

      if (Array.isArray(createdAt) && createdAt.length >= 7) {
        const date = new Date(
          createdAt[0], // Year
          createdAt[1] - 1, // Month (0-based in JS)
          createdAt[2], // Day
          createdAt[3], // Hour
          createdAt[4], // Minute
          createdAt[5], // Second
          createdAt[6] / 1000 // Microseconds → milliseconds
        );

        const month = date.getMonth(); // 0-11
        monthCounts[month]++;
      }
    });

    return monthCounts.map((count, index) => ({
      month: new Date(0, index).toLocaleString("default", { month: "short" }),
      count,
    }));
  };

  return (
    <Box p={3}>
      <Grid container spacing={4}>
        {" "}
        {/* Increased spacing */}
        {[
          { title: "Total Users", value: userList.length, bg: "#f87171" },
          { title: "Total Trainers", value: trainerList.length, bg: "#60a5fa" },
          { title: "Total Admins", value: adminList.length, bg: "#34d399" },
          { title: "Total Registrations", value: users.length, bg: "#fbbf24" },
        ].map((card, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card
              sx={{
                borderRadius: 3,
                backgroundColor: card.bg,
                color: "white",
                boxShadow: 4,
                minHeight: 140, // Increased card height
              }}
            >
              <CardContent sx={{ p: 3 }}>
                {" "}
                {/* Increased padding */}
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  {" "}
                  {/* Bigger title */}
                  {card.title}
                </Typography>
                <Typography variant="h3" fontWeight="bold" textAlign="center">
                  {" "}
                  {/* Bigger value */}
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} mt={5}>
        <Card
          sx={{
            p: 2,
            borderRadius: 3,
            boxShadow: 3,
            backgroundColor: "#f3f4f6",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Monthly Registrations
          </Typography>
          <Box sx={{ overflowX: "auto" }}>
            <BarChart
              width={650} // Increase width to show all months clearly
              height={350}
              data={registrationsByMonth()}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" radius={[10, 10, 0, 0]} />
            </BarChart>
          </Box>
        </Card>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 2,
              borderRadius: 3,
              boxShadow: 3,
              backgroundColor: "#f3f4f6",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Gender Distribution
            </Typography>
            <ResponsiveContainer width={350} height={350}>
              <PieChart>
                <Pie
                  data={genderData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                >
                  {genderData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={5}>
        {/* Fitness Goal + Fitness Level */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 2,
              borderRadius: 3,
              boxShadow: 3,
              backgroundColor: "#f3f4f6",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Fitness Goal Distribution
            </Typography>
            <ResponsiveContainer width={650} height={350}>
              <BarChart data={goalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 2,
              borderRadius: 3,
              boxShadow: 3,
              backgroundColor: "#f3f4f6",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Fitness Level Stats
            </Typography>
            <ResponsiveContainer width={350} height={350}>
              <BarChart data={levelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#f59e0b" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboardPage;
