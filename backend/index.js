const express = require("express");
const cors = require("cors");
const colors = require("colors");
const cron = require("node-cron");

require("dotenv").config();
require("./Configs/DB");

const app = express();
const port = process.env.PORT || 8001;

app.use(cors());
app.use(express.json());

// Update All Users Actions Every Day
const { scheduleUpdateUserActions } = require("./Services/scheduleUpdateUser");
cron.schedule("0 0 * * *", () => {
  scheduleUpdateUserActions();
});

// Routes
app.use("/users", require("./Controllers/userController"));
app.use("/employees", require("./Controllers/employeeController"));
app.use("/departments", require("./Controllers/departmentController"));
app.use("/shifts", require("./Controllers/shiftController"));
app.use("/relations", require("./Controllers/employeeShiftController"));
app.use("/logs", require("./Controllers/logsController"));

app.listen(port, () => console.log(`Server runing on port: ${port.cyan}`));
