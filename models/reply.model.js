const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const language_schema = new Schema({
  lang: { type: String, required: true },
  reply: { type: String, required: true },
  keyWords: { type: String },
});

const reply_schema = new Schema(
  {
    supportedStars: { type: String, required: true },
    replyByLanguage: [language_schema],
    supportedApps: [{ type: Schema.Types.ObjectId, ref: "App" }],
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Reply", reply_schema);
