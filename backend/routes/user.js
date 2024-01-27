const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Post=require('../models/Post')
const Comment=require('../models/Comment');
const verifyToken = require('../verifyToekn');

const cloudinary=require ("../utils/cloudinary")
const upload = require ("../multer/multer")

// update
router.put('/:id',verifyToken, async (req, res) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hashSync(req.body.password, salt);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        // Define the 'err' variable within the catch block
        res.status(500).json(err);
    }
});

// delete
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        await Post.deleteMany({ userId: req.params.id });
        await Comment.deleteMany({ userId: req.params.id });
        res.status(200).json("User has been deleted!");
    } catch (err) {
        res.status(500).json(err);
    }
});

// get user
router.get('/:id', async (req, res) => {
  try {
      const user=await User.findById(req.params.id)
      const {password,...info}=user._doc
      res.status(200).json(info);
  } catch (err) {
      res.status(500).json(err);
  }
});


// image upload
router.post ('/upload', upload.single('image'), function(req,res){
  cloudinary.uploader.upload(req.file.path, function (err, result){
    if(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:"cloadinary have some errors"
        })
    }
    res.status(200).json({
        success:true,
        message:"uploaded! completed",
        data: result
    })
  })
})



module.exports = router;
