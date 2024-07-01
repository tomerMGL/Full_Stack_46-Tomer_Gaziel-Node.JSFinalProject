const mongoose = require("mongoose");

const employeeShiftSchema = new mongoose.Schema({
  shiftId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shift",
    required: true,
  },

  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },

});

module.exports = mongoose.model("EmployeeShiftRelation", employeeShiftSchema);
