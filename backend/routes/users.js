const router = require("express").Router();
let User = require("../models/user.model");
let UserSession = require("../models/userSession.model");

router.route("/:id").get((req, res) => {

  console.log(req.params.id);
  User.findOne({
      _id: req.params.id,
    })
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});


router.route("/add").post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  User.find({
      email: email
    })
    .then(users => {
      if (users.length > 0) {
        return res.status(400).json("Email is already used");
      }
      User.find({
          username: username
        })
        .then(users => {
          if (users.length > 0) {
            return res.status(400).json("Username is already used");
          }
          const newUser = new User();
          newUser.username = username;
          newUser.email = email;
          newUser.password = newUser.generateHash(password);

          newUser
            .save()
            .then(() => {
              return res.send({
                success: true,
                message: "User added"
              });
            })
            .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/login").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username.length < 6 || password.length < 8) {
    return res.status(400).json("Wrong username or password");
  }

  User.find({
      username: username
    })
    .then(users => {
      if (users.length < 1) {
        return res.status(400).json("User doesnt exist");
      }
      const user = users[0];
      if (!user.validPassword(password)) {
        return res.status(400).json("Wrong username or password");
      }

      UserSession.deleteMany({
        userid: user._id,
      }).then(() => {

        const userSession = new UserSession({
          userid: user._id,
        });
        userSession
          .save()
          .then(doc => {
            return res.send({
              success: true,
              message: "User logged",
              userSession: doc,
              user: user,
            });
          })
          .catch(err => {
            return res.status(400).json("Error: " + err);
          });
      })
    })
    .catch(err => {
      return res.status(400).json("Error: " + err);
    });
});

router.route("/verify").post((req, res) => {
  const {
    query
  } = req;
  const {
    userSessionId
  } = query;

  UserSession.find({
      _id: userSessionId,
    },
    (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server error"
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

router.route("/logout/:id").delete((req, res) => {
  const userSessionId = req.params.id;

  UserSession.deleteMany({
      _id: userSessionId
    }).then(() => res.send({
      success: true,
      message: 'Logout'
    }))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;