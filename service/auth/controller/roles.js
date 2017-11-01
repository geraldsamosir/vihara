const {RolesModel} = require("../model/") 
const Catcherr = require("*Catcherr")

const {ResponseController ,BaseController } = require("baseMvc")

const {ModelRoot} = require("../registerpath")

module.exports =  new (class Roles extends BaseController{

     modelpath(req,res,next){
        req.headers.modelpath = ModelRoot+"roles"
        req.headers.message = "Roles"
        req.headers.related = []
        req.headers.privatefield = []
        next();
    }
})