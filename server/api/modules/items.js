const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, require: true },
  tags: { type: String, require: true },
  image: {type: String},
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
    },
  ],
  likes: {type: Number},
  additionalInfo: {type: Array}
});

module.exports = mongoose.model("items", itemSchema);
