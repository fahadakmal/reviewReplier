const admin_router = require("../routes/admin");
// const admin_router = require("../routes/admin")
const path = require("path");
module.exports = (app) => {
  app.use("/", admin_router);
  app.use("/abc", (req, res) => {
    res.send("hello");
  });
};
