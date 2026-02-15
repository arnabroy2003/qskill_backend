const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  certificateId: { type: String, required: true, unique: true },
  name: String,
  domain: String,
});

module.exports = mongoose.model("Certificate", certificateSchema);