const { default: mongoose } = require("mongoose")
const blogModel = require("../models/blogModel")

//GET All Blogs
exports.getAllBlogController = async (request,response) => {
    
    try {
        const blogs = await blogModel.find({})

        if (!blogs) {
            response.status(400).send({
                success:false,
                message:"No Blogs Found"
            })
        }
        
        return response.status(200).send({
            success:true,
            blogCount:blogs.length,
            message:"All blogs list is here",
            blogs
        })
    } catch(error){
        console.log(error)
        return response.status(500).send({
            success:false,
            message:"Get All - Problem in Controller Function"
        ,error
    })
    }
}

//Create Blog
exports.createBlogController = async (request,response) => {
    try {
        const {title,description,image} = request.body

        //validation - missing fields
        if( !title || !description || !image) {
            response.status(400).send({
                success:false,
                message:"Please fill everything"
            })
        }

        const newBlog = new blogModel({title,description,image})
        await newBlog.save()
        return response.status(201).send({
            success:true,
            message:"Blog successfully created",
            newBlog
        })

    } catch(error){
        console.log(error)
        return response.status(400).send({
            success:false,
            message:"Create - Problem in Controller Function"
        ,error
    })
    }
}

//Update Blog
exports.updateBlogController = async (request,response) => {
    try {
        const {id} = request.params
        const {title,description,image} = request.body
        const updatedBlog = await blogModel.findByIdAndUpdate(id,{...request.body},{new:true})
        return response.status(200).send({
            success:true,
            message:"Blog updated",
            updatedBlog
        })
    } catch(error){
        console.log(error)
        return response.status(500).send({
            success:false,
            message:"Update - Problem in Controller Function"
        ,error
    })
    }
}

//Delete Blog
exports.deleteBlogController = async (request,response) => {
    try {
        const deletedBlog = await blogModel.findByIdAndDelete(request.params.id)
        if (!deletedBlog) {
            return response.status(404).send({
                success:false,
                message:"Blog you are looking for is already deleted"
            })
        }
        return response.status(200).send({
            success:true,
            message:"Deleted one blog",
        })
    } catch(error){
        console.log(error)
        return response.status(500).send({
            success:false,
            message:"Delete - Problem in Controller Function"
        ,error
    })
    }
}

//GET Blog By ID
exports.getBlogByIdController = async (request,response) => {
    try {
        const {id} = request.params
        const currentBlog = await blogModel.findById(id)
        if (!currentBlog) {
            return response.status(404).send({
                success:false,
                message:"Could not find blog with this ID",
            })
        }
        return response.status(200).send({
            success:true,
            message:"Fetch single blog",
            currentBlog
        })
    } catch(error){
        console.log(error)
        return response.status(400).send({
            success:false,
            message:"Get By ID - Problem in Controller Function",
            error
    })
    }
}

