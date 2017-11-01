const Express = require('express')

const Router = Express.Router();

const fs = require('fs');

const  {PostController} = require( "../controller/")

const {RolesMidleware}  = require("Service/auth/midleware/")

const file  = require("../midleware/file")

Router.use(PostController.modelpath);

Router.get("/", PostController.get)

Router.post("/" , RolesMidleware.allowedRolesid([1,3]),
                RolesMidleware.checkIsauth,
                RolesMidleware.getusersid,
                PostController.create)


Router.put("/" , 
                RolesMidleware.allowedRolesid([1,3]),
                RolesMidleware.checkIsauth,
                RolesMidleware.getusersid,
                PostController.update)

Router.delete("/" , RolesMidleware.allowedRolesid([1,3])
                   ,RolesMidleware.checkIsauth
                   ,RolesMidleware.getusersid
                   ,PostController.delete)


//router for upload file
Router.post("/upload", 
                RolesMidleware.allowedRolesid([1,3]),
                RolesMidleware.checkIsauth,
                file.upload_single(file.env()),
                file.getfilename ,
                (req,res)=>{
                        res.status(200)
                        res.json({
                            code : "200",
                            message : "File uploaded" ,
                            result: [
                                {
                                    url : req.body.bannerphoto
                                }
                            ],
                            err : {errmessage:""}
                        })
                    }
                )


//get all files in directory
Router.get("/files",(req,res)=>{
        let path  = file.env().folderpath;
        let name = req.query.name
        fs.readdir(path,(err,files)=>{
            files =(name == undefined || name  == "")?
                    files
                    :files.filter((data)=>{
                        return data == name
                    })

            res.json({
                code : "200",
                message : "Files" ,
                result: files,
                url : file.env().url,
                err : {errmessage:""}
            })
    })

})


//delete file
Router.delete("/files/",
        RolesMidleware.allowedRolesid([1,3]),
        RolesMidleware.checkIsauth,
        (req,res)=>{
        let path  = file.env().folderpath+req.query.name;
        fs.unlink(path,(err)=>{
            if(!err){
                res.json({
                    code : "200",
                    message : "File deleted" ,
                    result: [],
                    err : {errmessage:""}
                })
            }
        })
        
})

module.exports = Router;
