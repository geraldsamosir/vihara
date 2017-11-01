var express = require('express');


//make alias path config in package.json
const  moduleAlias  = require('module-alias') 

moduleAlias()

const App =  express()

App.disable('x-powered-by');

/**
 * list of service
 */

const  { News ,Users ,Sumbangan , Ibadah , Profile} = require("../service/service")

  

App.get("/",(req,res)=>{
  res.json({message :"Welcome to Api"})
})

App.use("/News",News)

App.use("/sumbangan",Sumbangan)

App.use("/Ibadah",Ibadah)

App.use("/profile", Profile)

App.use("/usercore",Users.usersApi)






module.exports = App;
