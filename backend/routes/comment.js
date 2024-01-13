const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const verifyToken = require('../verifyToken');

// create
router.post("/create", verifyToken, async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    console.log('Comment Author ID:', comment.userId.toString());
    console.log('Request User ID:', req.userId);

    if (comment.userId.toString() === req.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: 'Comment has been deleted!' });
    } else {
      return res.status(403).json({ error: 'You are not allowed to delete this comment' });
    }
  } catch (err) {
    console.error('Error deleting comment:', err);
    res.status(500).json(err);
  }
});

// get post comments
router.get('/post/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
