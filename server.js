const express = require ('express')
const cors = require ('cors')
const morgan = require ('morgan')
const colors = require ('colors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

//.env configuration
dotenv.config()

//Import routes
const userRoutes=require('./routes/userRoutes')
const blogRoutes=require("./routes/blogRoutes")

//Mongodb connection
connectDB()

//rest object
const app=express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes get method to test
/*
app.get('/',(request,response)=>{
    response.status(200).send({
        "message":"Node server"
    })
})
*/

//routes get method on userRoutes
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/blog',blogRoutes)

//PORT
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT,()=>{
    console.log(`Server running on ${process.env.DEV_MODE} mode at port ${PORT}`.bgCyan.white)
})