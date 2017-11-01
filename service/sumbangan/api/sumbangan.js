const Express = require('express') 

const Router = Express.Router();

const sumbanganController = require("../controller/sumbangan")

const {RolesMidleware}  = require("Service/auth/midleware/")


Router.use(sumbanganController.modelpath);

Router.get("/", sumbanganController.get)


Router.post("/" ,
                RolesMidleware.allowedRolesid([1]),
                RolesMidleware.checkIsauth,
                RolesMidleware.getusersid,
                sumbanganController.create)

Router.put("/",
                RolesMidleware.allowedRolesid([1]),
                RolesMidleware.checkIsauth,
                sumbanganController.update)

Router.delete("/" , 
                  RolesMidleware.allowedRolesid([1]),
                  RolesMidleware.checkIsauth,
                  sumbanganController.delete)

module.exports = Router;
