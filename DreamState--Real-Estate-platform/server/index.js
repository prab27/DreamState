import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import cookieParser from "cookie-parser";
import path from 'path'

// config env variables
dotenv.config()
 
//create express app
const app = express();
const port = process.env.PORT

//connect the mongodb database
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB database is connected to the server.')
}).catch((err) => {
    console.log(err)
})

// because frontend use the api folder, but render doesnot have this type of folder 
// show we need to set the path manually by creating dynamic directory name. 
const __dirname = path.resolve()

// start the server on PORT
app.listen(port, () => {
    console.log('Server is running on port 3000')
})

// create the route
app.use(express.json()) //this allow us to send the json data to the server 
app.use(cookieParser()) // this allow us to get cookie token and verify user

app.use('/server/user', userRouter)
app.use('/server/auth', authRouter)
app.use('/server/listing', listingRouter)

// now we will join the directory name with the static build folder
// using vite folder will be "dist" but using create-react-app it will be "build"
// and then we can go to any address other than above 3
app.use(express.static(path.join(__dirname, '/client/dist')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})


// middleware (for error response)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error!"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})