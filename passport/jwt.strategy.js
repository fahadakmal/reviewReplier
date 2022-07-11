const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
const config = require("./../config/keys.config");
const User = require("./../models/user.model");

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwt.secret;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      User.findOne({ _id: jwt_payload._id })
        .then((user) => {
          if (user) {
            return done(null, user);
          }
        })
        .catch((err) => done(err, false));
    })
  );
};
