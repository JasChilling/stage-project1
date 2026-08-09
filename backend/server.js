const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);
const taskRoutes = require("./routes/taskRoutes");
const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

dotenv.config();

const app = express();


app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});