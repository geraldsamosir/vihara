const Models = require( "./model/")
const {ResponseController ,BaseController } = require("./Controller/")  
const Basefile =  require("./midleware/file")


module.exports = {
    Models:  Models,
    ResponseController : ResponseController,
    BaseController : BaseController,
    Basefile : Basefile

}

