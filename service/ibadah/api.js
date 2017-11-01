const Express = require('express') 

//make alias path config in package.json
const moduleAlias  = require('module-alias')


const App =  Express()

const  ibadah = require("./api/ibadah")

App.disable('x-powered-by');

App.use("/", ibadah)


module.exports = App