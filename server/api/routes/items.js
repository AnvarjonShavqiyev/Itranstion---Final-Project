const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const cloudinary = require("../helpers/cloudinary");

const Items = require("../modules/items");

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
  
  router.post("/add-item", upload.single("image"), async (req, res, next) => {
    const uploader = async (path) => await cloudinary.uploads(path, "Images");
    const image = req.file;
    const { path } = image;
    const newPath = await uploader(path);
    console.log(newPath);
    const items = new Items({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      image: newPath,
      tags: req.body.tags,
      additionalInfo: req.body.additionalInfo
    });
    try {
      const result = await items.save();
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
  
  module.exports = router;