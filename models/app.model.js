const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const app_schema = new Schema(
  {
    name: { type: String, required: true },
    appId: { type: String, required: true, unique: true },
    iconUrl: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("App", app_schema);
