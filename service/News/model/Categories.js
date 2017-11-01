const  Conf = require( '#Conf')


const bookshelf = require( 'bookshelf')

const Bookshelf  = bookshelf(Conf.db)


//add promise 
const  Promise = require("bluebird")


//get relation table 
const  PostsModel = require("./Post")
const UsersModel  = require("Service/auth/model/users")


//filter schema type data
const Joi = require("joi")


/**
 * get model base class
 */

const {Models }  = require("baseMvc") 
const BaseModel  = Models


const Model   =  BaseModel(Bookshelf)


const Categories  = Model.extend({
    tableName :'blogCategories',

    validate:{
        name : Joi.string().required(),
        users : Joi.number().integer().required(),
    },
    validateUpdate:{
        name : Joi.string(),
        users : Joi.number().integer(),
    },

    Posts(){
        return this.hasMany(PostsModel ,"category")
    },

    users(){
        return this.belongsTo(UsersModel,"users")
    }
})

module.exports =  Categories