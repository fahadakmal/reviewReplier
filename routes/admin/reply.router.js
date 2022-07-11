const router = require("express").Router();
const { reply_controller } = require("../../controllers/admin");
const passport = require("passport");

router.get("/add", reply_controller.get_add_reply);

router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  reply_controller.add_reply
);

router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  reply_controller.add_reply
);
router.get("/editReply/:id", reply_controller.get_edit_reply);

router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  reply_controller.updateReply
);

router.post(
  "/updateReplyBeforeDeply",
  passport.authenticate("jwt", { session: false }),
  reply_controller.updateReplyBeforeDeply
);

router.post(
  "/deployAllReply",
  passport.authenticate("jwt", { session: false }),
  reply_controller.deployAllReply
);

router.get("/", reply_controller.get);
router.get("/getDeployedReviews/:appId", reply_controller.get_deployed_reply);

module.exports = router;
