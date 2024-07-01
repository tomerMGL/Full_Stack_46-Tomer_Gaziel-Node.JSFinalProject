const mongoose = require("mongoose");
const colors = require("colors")
mongoose.connect("mongodb://127.0.0.1:27017/NodeFinalDB")
    .then(() => console.log('DATABASE CONNECTED!'.green.underline))

