// modules
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//validators
const validateRegisterInput = require("../../validations/register.validation");
const validateLoginInput = require("../../validations/login.validation");

exports.register = async (req, res) => {
  try {
    const User = req.models.user_model;
    const config = req.config;
    //validating inputs using register validations rules
    const { errors, isValid } = validateRegisterInput(req.body);

    // genrating error if validation failed
    if (!isValid) return res.status(400).json(errors);

    // checking if user with provided email already exist.
    User.findOne({
      email: req.body.email,
    })
      .then((user) => {
        //   genrating if user already exist
        if (user) {
          return res.status(400).json({
            email: "Email already exists",
          });
        } else {
          // creating new user using the User Model
          const newUser = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password,
          });
          // Hashing the password of new user using bcrypt
          bcrypt.hash(newUser.password, 10, (err, hash) => {
            if (err) console.error("There was an error", err);
            else {
              // replacing the newuser password with hashed password.
              newUser.password = hash;
              newUser.save().then((user) => {
                res.status(200).json({ success: true });
              });
            }
          });
        }
      })
      .catch((err) =>
        res.status(500).json({
          server: "unknown error occured while connecting DB",
          error: err,
        })
      );
  } catch (err) {
    res
      .status(500)
      .json({ server: "unknown error occured in the server", error: err });
  }
};

exports.login = async (req, res) => {
  try {
    const User = req.models.user_model;
    const config = req.config;
    const { errors, isValid } = validateLoginInput(req.body);
    // validating inputs
    if (!isValid) {
      return res.status(400).json(errors);
    }
    // extracting email and password from body
    const email = req.body.email;
    const password = req.body.password;
    // finding the user with email
    User.findOne({ email }).then((user) => {
      // checking if user exist
      if (!user) {
        // genrating error if user does no exist
        errors.email = "User not found";
        return res.status(404).json(errors);
      }
      // comparing the password and encrypted password store in DB
      bcrypt.compare(password, user.password).then((isMatch) => {
        // Checking if Password Match or not
        if (isMatch) {
          // creating an object named payload that stores required user info to create the token
          const payload = {
            _id: user._id,
          };
          //creating token using JWT sign method
          jwt.sign(
            payload,
            config.jwt.secret,
            {
              expiresIn: "1 day",
            },
            (err, token) => {
              // logning error if existed
              if (err) console.error("There is some error in token", err);
              else {
                // sending res back to user with token
                res.json({
                  success: true,
                  token: `Bearer ${token}`,
                });
              }
            }
          );
        } else {
          errors.password = "Incorrect Password";
          return res.status(400).json(errors);
        }
      });
    });
  } catch {
    res.status(500).json({ server: "unknown error occured in server" });
  }
};

exports.login_page = async (req, res) => res.render("./dashboard/pages/login");

exports.authenticate = async (req, res) => {
  // const User = req.models.user_model;
  // const config = req.config;
  if (req.user) {
    return res.status(200).json(req.user);
  } else {
    return res.status(400).json({
      authentication: "unbale to authenticate.",
    });
  }
};
