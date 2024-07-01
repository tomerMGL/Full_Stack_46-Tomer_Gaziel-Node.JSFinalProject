const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true
  },

  fullName: {
    type: String,
    required: [true, "Please add a full name"],
  },

  email: {
    type: String,
    required: [true, "Please add a email"],
  },

  username: {
    type: String,
    required: [true, "Please add a username"],
  },

  numOfActions: {
    type: Number,
    required: [true, "Please add a number of actions"],
  },

  actionsAllowed: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("User", userSchema);
