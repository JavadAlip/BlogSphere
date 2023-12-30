const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const authRoute=require('./routes/auth.js')
const userRoute=require('./routes/user.js')
const postRoute=require('./routes/post.js')
const commentRoute=require('./routes/comment.js')

// database
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database connected successesfully")
    }
    catch(err){
        console.log(err)
    }
}
dotenv.config()

// middleware
dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use('/api/auth',authRoute)
app.use('/api/users',userRoute)
app.use('/api/posts',postRoute)
app.use('/api/comments',commentRoute)
app.listen(5000,()=>{
    connectDB()
    console.log("app is running on port 5000")
})