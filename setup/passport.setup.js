module.exports = (app, passport) => {
  //initiallizing Passport
  app.use(passport.initialize());

  //   adding strategies
  require("./../passport/jwt.strategy")(passport);
};
