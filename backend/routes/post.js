// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const Post=require('../models/Post');
// const verifyToken = require('../verifyToekn');
// const Comment = require('../models/Comment');


// // create
// router.post("/create",verifyToken,async(req,res)=>{
//     try {
//         const newPost=new Post(req.body)
//         const savedPost=await newPost.save()
//         res.status(200).json(savedPost)
        
//     } catch (err) {
//         res.status(200).json(err)
//     }
// })

// // update

// router.put('/:id',verifyToken,async(req,res)=>{
//     try {
//         const updatedPost = await Post.findByIdAndUpdate(
//             req.params.id,
//             { $set: req.body },
//             { new: true }
//         );
//         res.status(200).json(updatedPost);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });


// // delete
// router.delete('/:id',verifyToken,async(req,res)=>{
//     try {
//         await Post.findByIdAndDelete(req.params.id);
//         await Comment.deleteMany({postId:req.params.id})
//         res.status(200).json("Post has been deleted!");
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });





// // get post details
// router.get("/:id", async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);
//         if (!post) {
//             // If the post is not found, respond with a 404 status
//             return res.status(404).json({ message: "Post not found" });
//         }
//         res.status(200).json(post);
//     } catch (err) {
//         // Respond with a 500 status and the actual error
//         res.status(500).json({ error: err.message });
//     }
// });

// // get all posts 
// router.get('/',async(req,res)=>{
//     const query=req.query
//     try {
//         const searchFilter={
//             title:{$regex:query.search, $options:"i"}
//         }
//         const posts = await Post.find(query.search?searchFilter:null);
//         res.status(200).json(posts);
//     } catch (err) {
//         res.status(500).json(err);
//     }
//   });

  
// // get user posts
// router.get('/user/:userId',async(req,res) => {
//     try {
//         const post=await Post.find({userId:req.params.userId})
//         res.status(200).json(post);
//     } catch (err) {
//         res.status(500).json(err);
//     }
//   });


// module.exports = router;




const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Post=require('../models/Post');
const verifyToken = require('../verifyToekn');
const Comment = require('../models/Comment');




// create
router.post('/create', verifyToken, async (req, res) => {
    try {
      const { title, description, username, userId, categories, image } = req.body;
  
      // Convert base64 image to buffer
      const imageBuffer = Buffer.from(image, 'base64');
  
      // Create a new Post instance with the base64 image data
      const newPost = new Post({
        title,
        description,
        username,
        userId,
        categories,
        // Save the base64 image data
        image: imageBuffer.toString('base64'),
      });
  
      // Save the post to the database
      const savedPost = await newPost.save();
  
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

// update

router.put('/:id',verifyToken,async(req,res)=>{
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});


// delete
router.delete('/:id',verifyToken,async(req,res)=>{
    try {
        await Post.findByIdAndDelete(req.params.id);
        await Comment.deleteMany({postId:req.params.id})
        res.status(200).json("Post has been deleted!");
    } catch (err) {
        res.status(500).json(err);
    }
});





// get post details
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            // If the post is not found, respond with a 404 status
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(post);
    } catch (err) {
        // Respond with a 500 status and the actual error
        res.status(500).json({ error: err.message });
    }
});

// get all posts 
router.get('/',async(req,res)=>{
    const query=req.query
    try {
        const searchFilter={
            title:{$regex:query.search, $options:"i"}
        }
        const posts = await Post.find(query.search?searchFilter:null);
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
  });

  
// get user posts
router.get('/user/:userId',async(req,res) => {
    try {
        const post=await Post.find({userId:req.params.userId})
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
  });


module.exports = router;
