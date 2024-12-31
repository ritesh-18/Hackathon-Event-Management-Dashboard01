
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const eventRoutes = require("./Routes/eventRoutes")
const attendeeRoutes = require("./Routes/attendeeRoutes");
const taskRoutes = require("./Routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/events", eventRoutes);
app.use("/api/attendees", attendeeRoutes);
app.use("/api/tasks", taskRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((error) => console.log(error));
