const Jwt = require('jwt-simple') ;
const {UsersModel ,UsersLogs } =  require("../model/")
const {Catcherr} = require("*Catcherr")

const { ResponseController }  =  require("baseMvc");


module.exports =  new (class Roles  {
    /**
     *
     * @param {Array} idallow  int array for show rule to spesific endpoint 
     *
     */
    allowedRolesid(idallow){
        return (req,res,next)=>{
             req.headers.allowedRoles = idallow
             next();
        }
    }

    /**
     * Midleware for handle logs of users
     * @param {int} usersid   users id
     * @param {string} action  action user do
     */
    async logs(usersid ,action ){
        let result,err;
        [err,result]  = await Catcherr (UsersLogs.create({users:usersid,action:action}))
        return (!err)?true:false
    }

    
    /**
     * this midleware use for auth check allow or not
     * @param {Object} req  request  from client
     * @param {Object} res  response to client
     * @param {function} next  go to next midleware or endpoint
     */
    async checkIsauth(req,res,next){
        let requestdata = {
            email  : req.headers.email || "", 
            idallow : req.headers.allowedRoles ,
            token :  req.headers.token || "",
        }
        
        try{requestdata.token = Jwt.decode(
                               requestdata.token,
                                req.app.get('key')
                         )}catch(e){}
        //check auth
        let User, err ,checkPassword , checkRoles;
        [ err, User ] =  await Catcherr(UsersModel.forge({email:requestdata.email}).fetch())     
        if(User != null){
            [err ,checkPassword ]  =  await  Catcherr(User.compare(requestdata.token)) 
            User  = User.toJSON()
            //check roles
            checkRoles = (requestdata.idallow.indexOf(parseInt(User.roles))!= -1)
        }
        if(checkPassword && checkRoles){
            next()
         }  
         else{
            let response  =  ResponseController.authResponse(null,false,-1)
            res.status(response.code)
            res.json(response)
            res.end()
         } 
     }
     
     /**
      *  this midleware for get user id and user data
      * @param {Object} req 
      * @param {Object} res 
      * @param {function} next 
      */
    async getusersid (req,res,next){
        let requestdata = {
            email  : req.headers.email || "",
        }
        let User ,err 
        [ err, User ] =  await Catcherr(UsersModel.forge({email:requestdata.email}).fetch())     
        if(User !=  null){
            User  = User.toJSON()
            req.body.users = User.id
            req.headers.users =  User
            next()
        }
        else{
           let response  = ResponseController.filterResponse("Users",[], null)
           res.status(response.code)
           res.json(response)
           res.end()
        }

     }

    /**
     * this midleware for validation is the owner of data for update user
     * so only the owner of acount can update he/she data
     * @param {Object} req 
     * @param {Object} res 
     * @param {function} next 
     */ 
    async checkIsOwner(req,res,next){
        let id =  req.query.id
        let email =  req.headers.email
        let Users,err ;
        [ err , Users  ] =  await Catcherr(UsersModel.forge({email:email}).fetch())
        if(Users != null){
            Users =  Users.toJSON()
        }
        if(Users !=null && Users.id == id) {
            next()
        }
        else{
            let response  =  ResponseController.authResponse(null,false,-1)
            res.status(response.code)
            res.json(response)
            res.end()
        }

    }
    /**
      * this midleware for validation is the owner of data for update user or Superusers
     * so only the owner or Superuser of acount can do the next midleware/ endpoint
     * @param {Object} req 
     * @param {Object} res 
     * @param {function} next 
     */
    async checkIsOwnerOrSuperUsers(req,res,next){
        let id =  req.query.id
        let email =  req.headers.email
        let Users,err ;
        [ err , Users  ] =  await Catcherr(UsersModel.forge({email:email}).fetch())

        Users =  Users.toJSON()
        /**
         * in this roles 1 is super users
         */
        if(Users.id == id  || Users.roles == 1) {
            next()
        }
        else{
            let response  =  ResponseController.authResponse(null,false,-1)
            res.status(response.code)
            res.json(response)
            res.end()
        }

    }

    

})