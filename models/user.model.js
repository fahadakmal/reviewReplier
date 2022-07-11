const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const user_schema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
});

module.exports = new mongoose.model("User", user_schema);
