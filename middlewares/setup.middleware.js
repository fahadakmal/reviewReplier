const USER = require("../models/user.model");
const REPLY = require("../models/reply.model");
const APP = require("../models/app.model");
const REVIEW = require("../models/review.model");
const DEPLOYED_REVIEW = require("../models/deployedReview.model");

const config = require("./../config/keys.config");
module.exports = (req, res, next) => {
  const models = {
    user_model: USER,
    reply_model: REPLY,
    app_model: APP,
    review_model: REVIEW,
    deployedReview_model: DEPLOYED_REVIEW,
  };

  req["models"] = models;
  req["config"] = config;
  next();
};
