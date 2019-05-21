const Trip = require("../../models/TripF");

module.exports = app => {
  // Example:
  // curl -H "Content-Type: application/json" -X POST -d '{"userId":"5ce108828f50ba37926f4aec","tripName":"Banana","waypoints":[{"waypointName":"test","lat":"123","long":"44"},{"waypointName":"test2","lat":"4245","long":"52344"}]}' http://localhost:8080/api/account/savetrip
  app.post("/api/account/savetrip", (req, res, next) => {
    const { body } = req;
    const { userId, tripName, waypoints } = body;

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

    if (!waypoints || waypoints.length < 2) {
      return res.send({
        success: false,
        messages: "Not enough waypoints, can't save trip"
      });
    }

    var i;
    for (i = 0; i < waypoints.length; i++) {
      const { waypointName, lat, long } = waypoints[i];

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

      if (!long) {
        return res.send({
          success: false,
          messages: "Error: Missing a waypoint long, can't save trip"
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
      { $set: { waypoints: waypoints } },
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
