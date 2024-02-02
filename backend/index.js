// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const authRoute = require('./routes/auth.js');
// const userRoute = require('./routes/user.js');
// const postRoute = require('./routes/post.js');
// const commentRoute = require('./routes/comment.js');
// const multer = require('multer');
// const path = require('path');

// // Middleware
// dotenv.config();
// app.use(express.json());
// app.use(cookieParser());

// // Multer configuration
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "images");
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     },
// });
// const upload = multer({ storage: storage });

// app.use(cors({
//     origin: "https://blogssphere.netlify.app",
//     credentials: true,
// }));


// // Handling Preflight OPTIONS Requests

// app.options('*', cors()); // Enable preflight for all routes

// // Serving static images
// // app.use('/images', express.static('images'));
// app.use('/images', express.static('backend/images'));


// // Database
// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("Database connected successfully");
//     } catch (err) {
//         console.error(err);
//     }
// };

// // Connect to the database before starting the server
// connectDB().then(() => {
//     app.get('/', (req, res) => {
//         res.send('API connected');
//     });

//     // Routes and Middlewares
//     app.use('/api/auth', authRoute);
//     app.use('/api/users', userRoute);
//     app.use('/api/posts', postRoute);
//     app.use('/api/comments', commentRoute);

//     // Image upload endpoint
//     app.post('/api/upload', upload.single("file"), (req, res) => {
//         const imagePath = `/images/${req.file.filename}`;
//         res.status(200).json({ imagePath });
//     });

//     // Error handling middleware
//     app.use((err, req, res, next) => {
//         console.error(err.stack);
//         res.status(500).send('Something went wrong!');
//     });

//     // Start the server
//     const PORT = process.env.PORT || 10000;
//     app.listen(PORT, () => {
//         console.log(`App is running on port ${PORT}`);
//     });
// });




// base64 imeplemnt

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
const multer = require('multer');
const path = require('path');
const { request } = require('http');

// Middleware
dotenv.config();
app.use(express.json());
app.use(cookieParser());

// Multer configuration
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "images");
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     },
// });
// const upload = multer({ storage: storage });

app.use(cors({
    origin: "https://blogssphere.netlify.app",
    credentials: true,
}));


// Handling Preflight OPTIONS Requests

app.options('*', cors()); // Enable preflight for all routes

// Serving static images
// app.use('/images', express.static('images'));
// app.use('/images', express.static('backend/images'));


const Images=mongoose.model("Post")
// Database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully");
    } catch (err) {
        console.error(err);
    }
};

// Connect to the database before starting the server
connectDB().then(() => {
    app.get('/', (req, res) => {
        res.send('API connected');
    });

    // Routes and Middlewares
    app.use('/api/auth', authRoute);
    app.use('/api/users', userRoute);
    app.use('/api/posts', postRoute);
    app.use('/api/comments', commentRoute);

    // Image upload endpoint
    // app.post('/api/upload', upload.single("file"), (req, res) => {
    //     const imagePath = `/images/${req.file.filename}`;
    //     res.status(200).json({ imagePath });
    // });

    // // Error handling middleware
    // app.use((err, req, res, next) => {
    //     console.error(err.stack);
    //     res.status(500).send('Something went wrong!');
    // });

    // Start the server
    const PORT = process.env.PORT || 10000;
    app.listen(PORT, () => {
        console.log(`App is running on port ${PORT}`);
    });
});



app.post("/upload-image",async (req,res)=>{
    const {base64}=req.body;
    try{
        Images.create({image:base64})
         res.send({Status:"okkkk"})
    }catch(error){
        res.send({Status:"error",data:error})
    }
})





