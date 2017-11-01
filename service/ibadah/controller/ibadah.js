const {SumbanganModel}  = require("../model/ibadah")  
const {ModelRoot} = require("../registerpath")
const {ResponseController , BaseController}  = require("baseMvc")

module.exports =  new (class  Ibadah extends BaseController { 
    modelpath(req,res,next){
        req.headers.modelpath = ModelRoot+"ibadah"
        req.headers.message = "Ibadah"
        req.headers.related = ["users"]
        req.headers.privatefield = []
        req.headers.filter_field = "tanggal",
        req.headers.filter_type ="Desc"
        next();
    }
})

    
