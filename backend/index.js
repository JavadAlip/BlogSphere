const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const authRoute=require('./routes/auth.js')

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

// middleware
dotenv.config()
app.use(express.json())
app.use('/api/auth',authRoute)
app.listen(5000,()=>{
    connectDB()

    console.log("app is running on port 5000")
})