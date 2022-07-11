const router = require("express").Router();
const passport = require("passport");
const app_controller = require("../../controllers/admin").app_controller;

router.post(
  "/deleteApp",
  passport.authenticate("jwt", { session: false }),
  app_controller.delete_app
);

router.post("/searchApp", app_controller.search_app);

router.get("/fetchReviews", app_controller.fetchReviews);

router.post("/replyAll", app_controller.replyAll);

router.get("/sub-category/add", app_controller.get_add_sub_category);

router.post(
  "/sub-category/add",
  passport.authenticate("jwt", { session: false }),
  app_controller.add_sub_category
);

router.get("/add", app_controller.get_add_app);

router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  app_controller.add_app
);

router.get("/getApp/:id", app_controller.get_app);

module.exports = router;
