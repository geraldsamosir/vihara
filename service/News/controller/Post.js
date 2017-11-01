const  {PostsModel} = require("../model/")
const   {ModelRoot} = require("../registerpath")  
const  {ResponseController , BaseController} = require("baseMvc")  

module.exports =  new( class  Post extends BaseController { 
    modelpath(req,res,next){
        req.headers.modelpath = ModelRoot+"Post"
        req.headers.message = "Posts"
        req.headers.related = ["users"]
        req.headers.privatefield = []
        req.headers.filter_type ="DESC"
        next();
    }
})

    
