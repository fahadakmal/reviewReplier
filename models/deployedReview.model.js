const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const deployedReview_schema = new Schema(
  {
    rewiewId: { type: Schema.Types.ObjectId, ref: "Review" },
    reviewDeveloperComment: { type: String },
    deployedStatus: { type: Boolean, default: false },
    appId: { type: Schema.Types.ObjectId, ref: "App" },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("DeployedReview", deployedReview_schema);
