const  {ProfilModel} = require("../model/profil")
const   {ModelRoot} = require("../registerpath")  
const  {ResponseController , BaseController} = require("baseMvc")  

module.exports =  new ( class  Profil extends BaseController { 
    modelpath(req,res,next){
        req.headers.modelpath = ModelRoot+"profil"
        req.headers.message = "Profil"
        req.headers.related = ["users"]
        req.headers.privatefield = []
        req.headers.filter_field ="name"
        next();
    }
})

    
