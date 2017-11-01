const Express = require('express')  

const Router = Express.Router();

const {RolesControlller} = require("../controller")

const {RolesMidleware} = require("../midleware/")



/**
 * @api {get} / index
 */



Router.use(RolesControlller.modelpath)

Router.get('/',RolesControlller.get);

Router.post('/', RolesMidleware.allowedRolesid([1,2]) 
                ,RolesMidleware.checkIsauth,RolesControlller.create)

Router.put('/', RolesMidleware.allowedRolesid([1,2]) 
                , RolesMidleware.checkIsauth,RolesControlller.update)

Router.delete('/', RolesMidleware.allowedRolesid([1,2]) 
                    ,RolesMidleware.checkIsauth,RolesControlller.delete)


module.exports = Router;