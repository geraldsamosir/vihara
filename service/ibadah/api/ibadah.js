const Express = require('express') 

const Router = Express.Router();

const ibadahController = require("../controller/ibadah")

const {RolesMidleware}  = require("Service/auth/midleware/")


Router.use(ibadahController.modelpath);

Router.get("/", ibadahController.get)


Router.post("/" ,
                RolesMidleware.allowedRolesid([1]),
                RolesMidleware.checkIsauth,
                RolesMidleware.getusersid,
                ibadahController.create)

Router.put("/",
                RolesMidleware.allowedRolesid([1]),
                RolesMidleware.checkIsauth,
                ibadahController.update)

Router.delete("/" , 
                  RolesMidleware.allowedRolesid([1]),
                  RolesMidleware.checkIsauth,
                  ibadahController.delete)

module.exports = Router;
