const Express = require('express') 

const Router = Express.Router();

const {categoryController} = require("../controller/")

const {RolesMidleware}  = require("../../auth/midleware/")


Router.use(categoryController.modelpath);

Router.get("/", categoryController.get)


Router.post("/" ,
                RolesMidleware.allowedRolesid([1]),
                RolesMidleware.checkIsauth,
                RolesMidleware.getusersid,
                categoryController.create)

Router.put("/",
                RolesMidleware.allowedRolesid([1]),
                RolesMidleware.checkIsauth,
                categoryController.update)

Router.delete("/" , 
                  RolesMidleware.allowedRolesid([1]),
                  RolesMidleware.checkIsauth,
                  categoryController.delete)

module.exports = Router;
