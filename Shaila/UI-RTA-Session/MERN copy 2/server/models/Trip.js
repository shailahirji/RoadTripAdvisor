const mongoose = require("mongoose");

const WaypointSchema = new mongoose.Schema({
  waypointName: {
    type: String,
    default: ""
  },
  lat: {
    type: Number,
    default: 0.0
  },
  lng: {
    type: Number,
    default: 0.0
  }
});

const TripSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: ""
  },
  tripName: {
    type: String,
    default: ""
  },
  from: {
    type: String,
    default: ""
  },
  to: {
    type: String,
    default: ""
  },
  waypoints: {
    type: [WaypointSchema],
    default: []
  }
});

module.exports = mongoose.model("Trip", TripSchema);
