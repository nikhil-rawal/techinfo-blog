const userModel=require('../models/userModel')
const bcrypt = require('bcrypt')

//register/create users
exports.registerUsers = async (request,response) => {
try {
    const {username, email, password} = request.body;

    //validation while creating user
    if(!username || !email || !password){
        return response.status(400).send({
            success:false,
            message:'Please filllll all fields ;; registerUsers from userController.js'
        })
    }

    //validation check if user already exists
    const existingUser = await userModel.findOne({email});
    if(existingUser){
        return response.status(400).send({
            success:false,
            message:'User already exists. Please login ;; registerUsers from userController.js'
        })
    }

    const hashedPassword = await bcrypt.hash(password,10)

    //save new users if all conditions satisfy
    const user=new userModel({username,email,password:hashedPassword})
    await user.save();
    return response.status(201).send({
        success:true,
        message:'User registration is complete ;; registerUsers from userController.js',
        user
    })
} catch (error) {
    console.log(error)
    return response.status(500).send({
        message:'Error in register callback',
        success:false,
        error
    })
}
}

//get all users
exports.getAllUsers = async (request,response) => {
    try {
        const users = await userModel.find({})
        return response.status(200).send({
            userCount:users.length,
            success:true,message:"All users data available ;; getAllUsers from userController.js",
            users
})
    } catch (error) {
        console.log(error)
        return response.status(500).send({
            success:false,
            message:"Get all users failed ;; getAllUsers from userController.js",
            error
        })
    }
}

//login users
exports.loginUsers = async (request, response) => {
try {
    const {email, password} = request.body;

    //validation login
    if(!email || !password){
        return response.status(400).send({
            success:false,
            message:'Please provide email or password ;; loginUsers from userController.js'
        })
    }

    //login user not found
    const user= await userModel.findOne({email})
    if (!user) {
        return response.status(200).send({
            success:false,
            message:'Could not find your account. Please register ;; loginUsers from userController.js'
        })
    }

    //check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return response.status(401).send({
            success:false,
            message:'Invalid username or password ;; loginUsers from userController.js'
        })
    }

    return response.status(200).send({
        success:true,
        message:"Login successful ;; loginUsers from userController.js"
    })

} catch(error){
    console.log(error)
    response.status(500).send({
        success:false,
        message:"Could not login ;; loginUsers from userController.js",
        error
    })
}
}