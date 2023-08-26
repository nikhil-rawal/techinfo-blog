const express=require("express")
const { getAllBlogController, createBlogController, updateBlogController, deleteBlogController, getBlogByIdController } = require("../controllers/blogControllers")
const router=express.Router()

//routes
//GET - all blog
router.get('/all-blog',getAllBlogController)

//POST - create blog
router.post('/create-blog',createBlogController)

//PUT - update blog
router.put('/update-blog/:id', updateBlogController)

//DELETE - delete blog
router.delete('/delete-blog/:id', deleteBlogController)

//GET - single blog
router.get('/get-blog/:id',getBlogByIdController)


module.exports=router