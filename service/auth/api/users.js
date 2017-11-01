const  Express = require('express')  

const Router = Express.Router();

const {UsersController} = require("../controller") 

const {RolesMidleware} = require("../midleware/")


/**
 * @api {get} / index
 */

Router.use(UsersController.modelpath)

Router.get('/',  UsersController.get);


Router.post('/',
            RolesMidleware.allowedRolesid([1]),
            RolesMidleware.checkIsauth,
            UsersController.create);

Router.post('/auth',UsersController.login);

Router.put('/',  RolesMidleware.allowedRolesid([1,3])
                ,RolesMidleware.checkIsauth
                ,RolesMidleware.checkIsOwner 
                ,UsersController.update);

Router.delete('/',RolesMidleware.allowedRolesid([1,3])
                 ,RolesMidleware.checkIsauth
                 ,RolesMidleware.checkIsOwnerOrSuperUsers
                 ,UsersController.delete);



module.exports = Router;