const Express = require('express') 

//make alias path config in package.json
const moduleAlias  = require('module-alias')


const App =  Express()

const  Post = require("./api/post")
const Category = require( "./api/category")

App.disable('x-powered-by');

App.use("/post", Post)

App.use("/categories",Category)

module.exports = App