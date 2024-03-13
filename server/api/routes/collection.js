const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const cloudinary = require("../helpers/cloudinary");

const Collection = require("../modules/collection");
const User = require("../modules/user");

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
    const result = await Collection.find().populate({
        path: "items", populate: "comments",
      }).exec();
    result.sort((a, b) => b.items.length - a.items.length);
    res.status(200).json({
      collections: result
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    Collection.findById(req.params.id)
      .populate("items")
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
router.post("/add-col", upload.single("image"), async (req, res, next) => {
  const uploader = async (path) => await cloudinary.uploads(path, "Images");
  const image = req.file;
  const { path } = image;
  const newPath = await uploader(path);
  const user = user()
  const collection = new Collection({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    discreption: req.body.discreption,
    image: newPath,
    topic: req.body.topic,
  });
  try {
    const result = await collection.save();
    const user = User.findById(req.body.user_id)
    user.collections.push(result._id)
    await user.save()
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
router.delete("/:id", (req, res, next) => {
  Collection.findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Collection deleted",
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
      discreption: req.body.discreption,
      image: newPath,
      topic: req.body.topic,
    }
    const options = { new: true };
    const result = await Collection.findByIdAndUpdate(id, updates, options);
    res.status(200).json({
      result,
      message:"Collection updated"
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});
module.exports = router;
