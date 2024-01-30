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

// Middleware
dotenv.config();
app.use(express.json());
app.use(cookieParser());

// Multer image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.img);
        // cb(null, "imageme.jpg");
    },
});
const upload = multer({ storage: storage });
app.post('/api/upload', upload.single("file"), (req, res) => {
    res.status(200).json("Image has been uploaded successfully!");
});

// Serving static images
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(cors({
    origin: "https://blogssphere.netlify.app",
    credentials: true,
}));

// Database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully");
    } catch (err) {
        console.error(err);
    }
};

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

// // Set the static folder for images based on the environment
// const imageFolder = process.env.NODE_ENV === 'production' ? '/images' : path.join(__dirname, '/images');
// app.use('/images', express.static(imageFolder));

// app.use(
//   cors({
//     origin: 'https://blogssphere.netlify.app',
//     credentials: true,
//   })
// );

// // Handle preflight OPTIONS requests
// app.options('*', cors());

// // Database
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL);
//     console.log('Database connected successfully');
//   } catch (err) {
//     console.error(err);
//   }
// };

// // multer image upload
// const storage = multer.diskStorage({
//   destination: (req, file, fn) => {
//     fn(null, imageFolder);
//   },
//   filename: (req, file, fn) => {
//     fn(null, req.body.img);
//     // fn(null, "imageme.jpg")
//   },
// });
// const upload = multer({ storage: storage });
// app.post('/api/upload', upload.single('file'), (req, res) => {
//   res.status(200).json('Image has been uploaded successfully!');
// });

// // Connect to the database before starting the server
// connectDB().then(() => {
//   app.get('/', (req, res) => {
//     res.send('api connected');
//   });

//   // Routes
//   app.use('/api/auth', authRoute);
//   app.use('/api/users', userRoute);
//   app.use('/api/posts', postRoute);
//   app.use('/api/comments', commentRoute);

//   // Start the server
//   const PORT = process.env.PORT || 10000;
//   app.listen(PORT, () => {
//     console.log(`App is running on port ${PORT}`);
//   });
// });


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

// dotenv.config();
// app.use(express.json());
// app.use(cookieParser());

// // Set the static folder for images
// // const imageFolder = process.env.NODE_ENV === 'production' ? 'images' : path.join(__dirname, 'images');
// // app.use('/images', express.static(imageFolder));

// // app.use('/images',express.static(path.join(__dirname,"/images")))

// app.use(
//   cors({
//     origin: 'https://blogssphere.netlify.app',
//     credentials: true,
//   })
// );

// app.options('*', cors());

// // Database connection
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL);
//     console.log('Database connected successfully');
//   } catch (err) {
//     console.error(err);
//   }
// };

// connectDB().then(() => {
//   app.get('/', (req, res) => {
//     res.send('api connected');
//   });

//   // Routes
//   app.use('/api/auth', authRoute);
//   app.use('/api/users', userRoute);
//   app.use('/api/posts', postRoute);
//   app.use('/api/comments', commentRoute);

//  // multer image upload
// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, "images");
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, Date.now() + path.extname(file.originalname));
// //   },
// // });

// // const upload = multer({ storage: storage });

// // app.post('/api/upload', upload.single('file'), (req, res) => {
// //   // Set CORS headers
// //   res.header('Access-Control-Allow-Origin', 'https://blogssphere.netlify.app');
// //   res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
// //   res.header('Access-Control-Allow-Headers', 'Content-Type','image/*');

// //   // Set other headers for image upload response
// //   res.header('Content-Type', 'application/json');

// //   console.log("Uploaded file details:", req.file);
// //   res.status(200).json('Image has been uploaded successfully!');
// // });


//   // Start the server
//   const PORT = process.env.PORT || 10000;
//   app.listen(PORT, () => {
//     console.log(`App is running on port ${PORT}`);
//   });
// });






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

// dotenv.config();
// app.use(express.json());
// app.use(cookieParser());

// // Middleware for CORS (place it at the top)
// app.use(
//   cors({
//     origin: 'https://blogssphere.netlify.app',
//     credentials: true,
//   })
// );

// app.options('*', cors());

// // Database connection
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('Database connected successfully');
//   } catch (err) {
//     console.error(err);
//   }
// };

// // Connect to the database and then start the server
// connectDB().then(() => {
//   // Routes
//   app.use('/api/auth', authRoute);
//   app.use('/api/users', userRoute);
//   app.use('/api/posts', postRoute);
//   app.use('/api/comments', commentRoute);

//   // Set the static folder for images
//   app.use('/images', express.static(path.join(__dirname, 'images')));

//   // Multer image upload
//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'images');
//     },
//     filename: (req, file, cb) => {
//       cb(null, req.body.img);
//     },
//   });

//   const upload = multer({ storage: storage });

//   app.post('/api/upload', upload.single('file'), (req, res) => {
//     console.log('Image has been uploaded successfully!', req.file);
//     res.status(200).json('Image has been uploaded successfully!');
//   });

//   // Default route
//   app.get('/', (req, res) => {
//     res.send('API connected');
//   });

//   // Start the server
//   const PORT = process.env.PORT || 10000;
//   app.listen(PORT, () => {
//     console.log(`App is running on port ${PORT}`);
//   });
// });
