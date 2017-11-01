const Express = require('express') 

//make alias path config in package.json
const moduleAlias  = require('module-alias')


const App =  Express()

const  profil = require("./api/profil")

App.disable('x-powered-by');

App.use("/", profil)



module.exports = App