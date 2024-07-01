const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, "Please add a date"],
  },

  startingHour: {
    type: String,
    required: [true, "Please add starting hour"],
  },

  endingHour: {
    type: String,
    required: [true, "Please add ending hour"],
  },
});

module.exports = mongoose.model("Shift", shiftSchema);