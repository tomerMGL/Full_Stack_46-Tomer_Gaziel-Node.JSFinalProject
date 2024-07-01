const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please add a first name"],
  },

  lastName: {
    type: String,
    required: [true, "Please add a last name"],
  },

  startWorkYear: {
    type: Number,
    required: [true, "Please add a start work year"],
  },

  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: [false, "Please add a department id"],
  },

});

module.exports = mongoose.model("Employee", employeeSchema);
