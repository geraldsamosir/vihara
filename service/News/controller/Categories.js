const {CategoriesModel}  = require("../model/")  
const {ModelRoot} = require("../registerpath")
const {ResponseController , BaseController}  = require("baseMvc")

module.exports =  new (class  Categories extends BaseController { 
    modelpath(req,res,next){
        req.headers.modelpath = ModelRoot+"Categories"
        req.headers.message = "Categories"
        req.headers.related = ["Posts","users"]
        req.headers.privatefield = []
        next();
    }
})

    
