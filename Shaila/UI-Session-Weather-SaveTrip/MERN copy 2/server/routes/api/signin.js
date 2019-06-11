const User = require("../../models/User");
const UserSession = require("../../models/UserSession");
const bcrypt = require("bcrypt");

module.exports = app => {
  /*
    Sing Up 
    */
  app.post("/api/account/signup", (req, res, next) => {
    const { body } = req;
    const { password, firstName, lastName } = body;
    let { email } = body;

    if (!firstName) {
      return res.send({
        success: false,
        message: "Error: First Name cannot be blank. "
      });
    }
    if (!lastName) {
      return res.send({
        success: false,
        message: "Error: First Name cannot be blank. "
      });
    }
    //null check for email and pw
    if (!email) {
      return res.send({
        success: false,
        message: "Error: Email cannot be blank."
      });
    }
    if (!password) {
      return res.send({
        sucess: false,
        message: "Error: Password cannot be blank."
      });
    }

    email = email.toLowerCase();

    /*
        Steps in Sign Up:
        1.Verify email doesnt exist 
        2. save info
        */
    console.log("Dans le server OUT!");
    User.find(
      {
        email: email
      },
      (err, previousUsers) => {
        console.log("Dans le server ENCORE!");
        if (err) {
          console.log(" MDR ");
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        } else if (previousUsers.length > 0) {
          console.log(" MAYBE ");
          return res.send({
            success: false,
            message: "Error: Account already exists"
          });
        }
        //save the new user
        console.log(" ME DRIVING ");
        User.find(
          {
            email: email
          },
          (err, previousUsers) => {
            if (err) {
              return res.send({
                success: false,
                message: "Error: Server error"
              });
            } else if (previousUsers.length > 0) {
              return res.send({
                success: false,
                message: "Error: Account already exists."
              });
            }

            //save the new user
            const newUser = new User();
            newUser.email = email;
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.password = newUser.generateHash(password);
            //newUser.password=password;

            newUser.save((err, user) => {
              if (err) {
                return res.send({
                  success: false,
                  messsage: "Error: Server error"
                });
              }
              return res.send({
                success: true,
                message: "Signed Up"
              });
            });
          }
        );
      }
    );
  });

  app.post("/api/account/signin", (req, res, next) => {
    const { body } = req;
    const { password } = body;
    let { email } = body;

    if (!email) {
      return res.send({
        success: false,
        message: "Error: Email cannot be blank."
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: "Error: Password cannot be blank."
      });
    }
    email = email.toLowerCase();

    //find user and check password and verify
    console.log("SON EMAIL ", email);
    console.log("SON PASSWORD ", password);
    User.find(
      {
        email: email
      },
      (err, users) => {
        if (err) {
          console.log("ERREUR ICI ", err);
          return res.send({
            sucess: false,
            message: "Error: server error"
          });
        }
        console.log("LES USERS ", users);
        if (users.length != 1) {
          return res.send({
            sucess: false,
            message: "Error: User doesnt Exist. Please Sign up"
          });
        }
        const user = users[0];

        if (!user.validPassword(password)) {
          return res.send({
            sucess: false,
            message: "Error: Invalid Password"
          });
        }

        //otherwise, create user session
        console.log("ON ARRIVE ICI ");
        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err, doc) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error: server error"
            });
          }

          return res.send({
            success: true,
            message: "Valid sign in",
            token: doc._id
          });
        });
      }
    );
  });

  app.get("/api/account/verify", (req, res, next) => {
    //get token
    //verify token is one of a kind and its not deleted
    const { query } = req;
    const { token } = query;

    UserSession.find(
      {
        _id: token,
        isDeleted: false
      },
      (err, sessions) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error:Server error"
          });
        }

        if (sessions.length != 1) {
          return res.send({
            success: false,
            message: "Error: Invalid"
          });
        } else {
          return res.send({
            success: true,
            message: "Good"
          });
        }
      }
    );
  });

  app.get("/api/account/logout", (req, res, next) => {
    //find the user and update it
    const { query } = req;
    const { token } = query;

    UserSession.findOneAndUpdate(
      {
        _id: token,
        isDeleted: false
      },
      { $set: { isDeleted: true } },
      null,
      (err, sessions) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }
        return res.send({
          success: true,
          message: "Good"
        });
      }
    );
  });
};
