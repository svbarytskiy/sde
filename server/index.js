import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import authRoute from './routes/auth.js'
import projectRoute from './routes/project.js'
import filesRoute from './routes/files.js'
import commentRoute from './routes/comment.js'
import fileUpload from 'express-fileupload'

dotenv.config();
const app = express()

//Constants

const PORT = process.env.PORT || 3001
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

// Middleware
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))

//Routes
app.use('/api/auth', authRoute);
app.use('/api/projects', projectRoute);
app.use('/api/files', filesRoute);
app.use('/api/comments', commentRoute)

async function start() {
    try {
        await mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.i7ztjje.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
        )
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    }
    catch (error) {
        console.log(error);
    }
}
start()