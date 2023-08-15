const express = require('express')
const { getAllUsers, registerUsers, loginUsers } = require('../controllers/userController')

//router object
const router=express.Router()

// router.method(URL Pattern, controller function)

//get all users - GET Method
router.get('/all-users',getAllUsers)

//register/create user - POST Method
router.post('/register',registerUsers)

//login user - POST Method
router.post('/login',loginUsers)

module.exports=router