const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a department name"],
  },

  manager: {
    type: mongoose.Schema.Types.ObjectId,
    required: [false, "Please add a manager"],
  },
});

module.exports = mongoose.model("Department", departmentSchema);
