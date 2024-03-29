// const express = require('express');
// const router = express.Router();
// const User = require('../models/User.js');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // register
// // Use the 'router' object instead of 'register'
// router.post('/register', async (req, res) => {
//     try {
//         const { username, email, password } = req.body;
//         const salt=await bcrypt.genSalt(10)
//         const hashPassword=await bcrypt.hashSync(password,salt)
//         const newUser = new User({ username, email, password:hashPassword });
//         const savedUser = await newUser.save();
//         res.status(200).json(savedUser);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// // login
// router.post('/login',async(req,res)=>{
//     try{
//         const user=await User.findOne({email:req.body.email})
//         if(!user){
//             return res.status(404).json("User not found!")
//         }
//         const match=await bcrypt.compare(req.body.password,user.password)
//         if(!match){
//             return res.status(401).json("Wrong details!")
//         }
//         const token=jwt.sign({_id:user._id,username:user.username,email:user.email},process.env.SECRET,{expiresIn:"3d"})
//         const {password,...info}=user._doc
//         res.cookie("token",token).status(200).json(info)
//         // res.status(200).json(user)

//     }catch(err){
//         res.status(500).json(err)
//     }
// })

// // logout

// router.get("/logout",async (req,res)=>{
//     try{
//         res.clearCookie("token",{sameSite:"none",secure:true}).status(200).send("User logout successfully!")
//     }
//     catch(err){
//         res.status(500).json(err)
//     }
// })

// // refetch user
// router.get("/refetch", (req,res)=>{
//     const token=req.cookies.token
//     jwt.verify(token,process.env.SECRET,{},async(err,data)=>{
//         if(err){
//             return res.status(404).json(err)
//         }
//         res.status(200).json(data)
//     })
// })

// module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hashSync(password, salt);
        const newUser = new User({ username, email, password: hashPassword });
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }

        const match = await bcrypt.compare(req.body.password, user.password);

        if (!match) {
            return res.status(401).json({ error: "Wrong details!" });
        }

        const token = jwt.sign(
            { _id: user._id, username: user.username, email: user.email },
            process.env.SECRET,
            { expiresIn: "3d" }
        );

        const { password, ...info } = user._doc;

        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'None' })
            .status(200)
            .json(info);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Logout
router.get("/logout", async (req, res) => {
    try {
        res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'None' })
            .status(200)
            .send("User logout successfully!");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Refetch user
router.get("/refetch", (req, res) => {
    const token = req.cookies.token;

    jwt.verify(token, process.env.SECRET, {}, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(401).json({ error: "Token verification failed" });
        }
        res.status(200).json(data);
    });
});

module.exports = router;
