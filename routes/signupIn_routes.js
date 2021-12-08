// const { request, response } = require('express')
const express = require('express')
const router = express.Router()

const signUpDetailsCopy = require('../models/signupIn_model')
const bcrypt = require('bcrypt')

router.post('/signup', async (request, response) => {

    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(request.body.password, saltPassword)

    console.log(securePassword);

    const signedUpUser = new signUpDetailsCopy({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        password: securePassword

    })

    signedUpUser.save()

        .then(data => {
            response.json(data)
        })

        .catch(error => {
            response.json(error)
        })
})

router.post('/login', async (request, response) => {
    console.log('Email ' + request.body.email + ' password ' + request.body.password);
    // find user by email
    let User = await signUpDetailsCopy.findOne({ email: request.body.email })
    // if doesn't exist - return error
    if (!User) {
        return response.status(401).json({
            status: false,
            message: "User does not exist",
        })
    }
    console.log(User);
    bcrypt.compare(request.body.password, User.password)
        .then((res) => {
            if (!res) {
                return response.status(401).json({
                    status: false,
                    message: "Authentication Failed: Incorrect password.",
                });
            }

            return response.status(200).json({
                status: true,
                message: "User login work success",
                data: {
                    email: request.body.email,
                    password: request.body.password
                },

            });
        });




})

module.exports = router