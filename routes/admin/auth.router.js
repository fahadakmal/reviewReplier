const router = require("express").Router();
const auth_controller = require("../../controllers/admin").auth_controller;
const passport = require("passport");

router.post("/register", auth_controller.register);

router.post("/login", auth_controller.login);

router.get("/login", auth_controller.login_page);

router.get(
  "/authenticate",
  passport.authenticate("jwt", { session: false }),
  auth_controller.authenticate
);

module.exports = router;
