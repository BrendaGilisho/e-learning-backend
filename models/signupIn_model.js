const mongoose = require('mongoose')

const signUpDetails = new mongoose.Schema({
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('signupIn_table', signUpDetails)