const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const cloudinary = require("../helpers/cloudinary");

const Collection = require("../modules/collection");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./tmp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res, next) => {
  try {
    const result = await Collection.find().populate("items").exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const result = await Collection.findOneById(req.params.id).populate("items").exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

router.post("/add-col", upload.single("image"), async (req, res, next) => {
  const uploader = async (path) => await cloudinary.uploads(path, "Images");
  const image = req.file;
  const { path } = image;
  const newPath = await uploader(path);
  const collection = new Collection({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    discreption: req.body.discreption,
    image: newPath,
    topic: req.body.topic,
    author: req.body.userId,
  });
  try {
    const result = await collection.save();
    res.status(200).json({
      message: "Successfully",
      collection: result,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
