const  {UsersModel} = require("../model/")

const {Catcherr} = require("*Catcherr")

const Jwt = require('jwt-simple');

const {ResponseController , BaseController}  =  require( "baseMvc")



const {ModelRoot} = require("../registerpath")

module.exports = new  class  Users extends BaseController{

    modelpath(req,res,next){
        req.headers.modelpath = ModelRoot+"users"
        req.headers.message = "Users"
        req.headers.related = ["roles"]
        req.headers.privatefield = ["password","id" ,"roles"]
        next();
    }

    /**
     * this method handle for login 
     * @param {Object} req request from users
     * @param {Object} res response of end point
     */
    async login (req,res){
        let user =  req.body
        let User ,err,checkPassword , token , logs;
        [err,User] = await Catcherr( UsersModel.forge({email: user.email}).fetch())        
        
        if(User != null){
            [err ,checkPassword ]  =  await  Catcherr(User.compare(user.password || "")) 
            if(checkPassword == true ){
                token  = Jwt.encode(
                    user.password,
                    req.app.get('key')
                )
            }                            
        }
       let response = ResponseController.authResponse(
                            (User != null)?User.toJSON(): null,
                            checkPassword ,
                            err
                        )
        res.set({
            token : token
        })
        res.status(response.code)
        res.json(response)
        res.end()
    }
}