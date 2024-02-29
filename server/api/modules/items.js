const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, require: true },
  tags: { type: String, require: true },
  image: {type: String},
  additionalInfo: {type: Array}
});

module.exports = mongoose.model("items", itemSchema);
