const mongoose = require("mongoose");

const collectionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, require: true },
  discreption: { type: String, require: true },
  topic: { type: String, require: true }, 
  image: { type: String},
  items: { type: Array}
});

module.exports = mongoose.model("collection", collectionSchema);