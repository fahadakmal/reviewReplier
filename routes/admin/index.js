const router = require("express").Router();

const auth = require("./auth.router");
const reply = require("./reply.router");
const app = require("./app.router");

router.use("/auth", auth);
router.use("/reply", reply);
router.use("/app", app);

module.exports = router;
