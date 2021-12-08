const express = require('express')
const app = express()

const http = require("http").Server(app)
const io = require("socket.io");

const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routesUrls = require('./routes/signupIn_routes')
const cors = require('cors')

dotenv.config()

const socket = io(http)

mongoose.connect(process.env.DATABASE_ACCESS, () => console.log('Database connected...'))

app.use(express.json()) /*body parser*/
app.use(cors())
app.use('/app', routesUrls)  /*routes urls will be appended to app path e.g http/home-decor/app/signup*/


//To listen to messages
socket.on('connection', (socket) =>{
    console.log('user connected!');

    socket.on('disconnect', () =>{
        console.log('user disconnected!')
    })
});

app.listen(8080, () => console.log("Server is running..."))

