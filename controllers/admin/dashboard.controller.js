exports.dashboard = async (req, res) => {
  const { app_model } = req.models;
  app_model
    .find()
    .then((data) => {
      res.render("./dashboard/pages/dashboard", {
        page: "dashboard",
        apps: data,
      });
    })
    .catch((err) => console.log(err));
};
