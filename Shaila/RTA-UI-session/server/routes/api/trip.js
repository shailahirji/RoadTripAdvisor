const Trip = require("../../models/Trip");

module.exports = app => {
  // Example:
  // curl -H "Content-Type: application/json" -X POST -d '{"userId":"5ce108828f50ba37926f4aec","tripName":"Banana","waypoints":[{"waypointName":"test","lat":"123","lng":"44"},{"waypointName":"test2","lat":"4245","lng":"52344"}]}' http://localhost:8080/api/account/savetrip
  app.post("/api/account/savetrip", (req, res, next) => {
    const { body } = req;
    const { userId, tripName, from, to, waypoints } = body;

    if (!userId) {
      return res.send({
        success: false,
        messages: "Error: No user id, can't save trip"
      });
    }

    if (!tripName) {
      return res.send({
        success: false,
        messages: "Error: No trip name, can't save trip"
      });
    }

    if (!from) {
      return res.send({
        success: false,
        messages: "Error: No from, can't save trip"
      });
    }

    if (!to) {
      return res.send({
        success: false,
        messages: "Error: No to, can't save trip"
      });
    }

    if (!waypoints) {
      return res.send({
        success: false,
        messages: "Not enough waypoints, can't save trip"
      });
    }

    var i;
    for (i = 0; i < waypoints.length; i++) {
      const { waypointName, lat, lng } = waypoints[i];

      if (!waypointName) {
        return res.send({
          success: false,
          messages: "Error: Missing a waypoint name, can't save trip"
        });
      }

      if (!lat) {
        return res.send({
          success: false,
          messages: "Error: Missing a waypoint lat, can't save trip"
        });
      }

      if (!lng) {
        return res.send({
          success: false,
          messages: "Error: Missing a waypoint lng, can't save trip"
        });
      }
    }

    // Steps:
    // SAVE TRIP
    // 2. save it
    Trip.findOneAndUpdate(
      {
        userId: userId,
        tripName: tripName
      },
      { $set: { waypoints: waypoints, from: from, to: to } },
      { upsert: true },
      (err, sessions) => {
        if (err) {
          return res.send({
            success: false,
            message: "Server error"
          });
        }
        return res.send({
          success: true,
          message: "good"
        });
      }
    );
  });

  // Example:
  // curl -d "userId=5ce108828f50ba37926f4aec" -X POST http://localhost:8080/api/account/getuserstrips
  app.post("/api/account/getuserstrips", (req, res, next) => {
    const { body } = req;
    const { userId } = body;

    if (!userId) {
      return res.send({
        success: false,
        messages: "Error: No user id, can't save trip"
      });
    }

    // Steps:
    // return the trips
    // 2. save it
    Trip.find(
      {
        userId: userId
      },
      (err, trips) => {
        if (err) {
          return res.send({
            success: false,
            message: "Server error"
          });
        }
        return res.send({
          success: true,
          trips: trips
        });
      }
    );
  });
};
