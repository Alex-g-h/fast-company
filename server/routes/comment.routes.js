const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");
const Comment = require("../models/Comment");

router.get("/", auth, async (req, res) => {
  try {
    const { orderBy, equalTo } = req.query;

    const comments = await Comment.find({ [orderBy]: equalTo });
    res.send(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server side error occurred. Try again later" });
  }
});

router.put("/:commentId", auth, async (req, res) => {
  try {
    const commentId = req.params;

    const newComment = await Comment.create({
      ...req.body,
      userId: req.user._id,
      commentId,
    });

    res.status(201).send(newComment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server side error occurred. Try again later", error });
  }
});

router.delete("/:commentId", auth, async (req, res) => {
  try {
    const { commentId } = req.params;
    // const removedComment = await Comment.findById(commentId);
    const removedComment = await Comment.find({ _id: commentId });

    if (removedComment.userId.toString() === req.user._id) {
      await removedComment.remove();
      return res.send(null);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server side error occurred. Try again later" });
  }
});

module.exports = router;
