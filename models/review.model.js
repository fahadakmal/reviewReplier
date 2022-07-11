const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const review_schema = new Schema(
  {
    rewiewId: { type: String, required: true, unique: true },
    reviewAurther: { type: String, required: true },
    reviewRating: { type: String, required: true },
    reviewLanguage: { type: String },
    reviewUserComment: { type: String, required: true },
    reviewDeveloperComment: { type: String },
    reviewRepliedStatus: { type: Boolean, default: false },
    reviewRepliedByAutoReplier: { type: Boolean, default: false },
    appId: { type: Schema.Types.ObjectId, ref: "App" },
    publishedDate: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Review", review_schema);
