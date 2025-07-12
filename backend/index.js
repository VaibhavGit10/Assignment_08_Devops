const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const connect = require("./database/mongoDb");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config({ path: "config.env" });

// Routes
const studentRoutes = require("./routes/student.routes");
const adminRoutes = require("./routes/admin.routes");
const careerServiceRoutes = require("./routes/careerService.routes");
const facultyRoute = require("./routes/facultyRoute");
const questionUploadRoute = require("./routes/questionUpload.routes");
const batchRegisterRoute = require("./routes/batchRegister.route");
const getBatchRoute = require("./routes/common.route");
const attendanceRoute = require("./routes/attendance.routes");

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Route Usage
app.use("/student", studentRoutes);
app.use("/admin", adminRoutes);
app.use("/careerService", careerServiceRoutes);
app.use("/faculty", facultyRoute);
app.use("/", getBatchRoute);
app.use("/", questionUploadRoute);
app.use("/batch", batchRegisterRoute);
app.use("/attendance", attendanceRoute);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Hello World! check");
});

// Start Server
app.listen(port, () => {
  connect();
  console.log(`Server listening at http://localhost:${port}`);
});
