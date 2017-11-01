const Express = require('express') 

//make alias path config in package.json
const moduleAlias  = require('module-alias')


const App =  Express()

const  sumbangan = require("./api/sumbangan")

App.disable('x-powered-by');

App.use("/", sumbangan)


module.exports = App