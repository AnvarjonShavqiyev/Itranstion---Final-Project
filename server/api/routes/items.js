const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const cloudinary = require("../helpers/cloudinary");

const Items = require("../modules/items");
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
    const result = await Items.find().exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    Items.findById(req.params.id)
      .exec()
      .then((result) => {
        res.status(200).json(result);
      });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});
router.post("/add-item", upload.single("image"), async (req, res, next) => {
  const uploader = async (path) => await cloudinary.uploads(path, "Images");
  const image = req.file;
  const { path } = image;
  const newPath = await uploader(path);
  const item = new Items({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    image: newPath,
    tags: req.body.tags,
    additionalInfo: req.body.additionalInfo,
  });

  const result = await item.save();

  const collection = await Collection.findById(req.body.collection_id);

  if (!collection) {
    throw Error("Collection not found");
  }

  collection.items.push(item.id);

  await collection.save();
  try {
    res.status(200).json({
      message: "Successfully",
      item: result,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});
router.delete("/:id", (req, res, next) => {
  Items.findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Item deleted",
        status: 200,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});
router.patch("/:id", upload.single("image"), async (req, res, next) => {
  try {
    const uploader = async (path) => await cloudinary.uploads(path, "Images");
    const image = req.file
    const {path} = image
    const newPath = await uploader(path);
    const id = req.params.id;
    const updates = {
      name: req.body.name,
      image: newPath,
      tags: req.body.tags,
      additionalInfo: req.body.additionalInfo,
    }
    const options = { new: true };
    const result = await Items.findByIdAndUpdate(id, updates, options);
    res.status(200).json({
      result,
      message:"Item updated"
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});
module.exports = router;
