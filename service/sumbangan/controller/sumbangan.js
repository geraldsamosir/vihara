const {SumbanganModel}  = require("../model/sumbangan")  
const {ModelRoot} = require("../registerpath")
const {ResponseController , BaseController}  = require("baseMvc")

module.exports =  new (class  Sumbangan extends BaseController { 
    modelpath(req,res,next){
        req.headers.modelpath = ModelRoot+"sumbangan"
        req.headers.message = "Sumbangan"
        req.headers.related = ["users"]
        req.headers.privatefield = []
        req.headers.filter_field = "tanggal",
        req.headers.filter_type ="DESC"
        next();
    }
})

    
