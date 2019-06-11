//anything you need platform to save
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: ""
  },
  timeStamp: {
    type: Date,
    default: Date.now()
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("UserSession", UserSessionSchema);
