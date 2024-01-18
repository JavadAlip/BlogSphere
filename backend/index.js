const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth.js');
const userRoute = require('./routes/user.js');
const postRoute = require('./routes/post.js');
const commentRoute = require('./routes/comment.js');
const multer=require('multer')
const path=require("path")


// Middleware
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use('/images',express.static(path.join(__dirname,"/images")))


app.use(cors({ origin: "https://blog-app-javads-projects-7199ba88.vercel.app", credentials: true }));


// Database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully");
    } catch (err) {
        console.error(err);
    }
};

    // multer image upload
    const storage=multer.diskStorage({
        destination:(req,file,fn)=>{
            fn(null,"images")
        },
        filename:(req,file,fn)=>{
            fn(null,req.body.img)
            // fn(null, "imageme.jpg")
        },
    })
    const upload=multer({storage:storage})
    app.post('/api/upload',upload.single("file"),(req,res)=>{
        res.status(200).json("Image has been uploaded successfully!")
    })

// Connect to the database before starting the server
connectDB().then(() => {
    
    app.get('/', (req, res) => {
        res.send('api connected');
    });

    // Routes
    app.use('/api/auth', authRoute);
    app.use('/api/users', userRoute);
    app.use('/api/posts', postRoute);
    app.use('/api/comments', commentRoute);

    // Start the server
    const PORT = process.env.PORT || 10000;
    app.listen(PORT, () => {
        console.log(`App is running on port ${PORT}`);
    });
});
