const Conf = require( '#Conf')

const bookshelf = require( 'bookshelf')

const Bookshelf  = bookshelf(Conf.db)


//add promise 
const  Promise = require("bluebird") 


//get relation table 
const UsersModel  = require("Service/auth/model/users")



//filter schema type data
const Joi = require("joi")


/**
 * get model base class
 */

const {Models}  = require("baseMvc")  
const BaseModel  = Models


const Model   =  BaseModel(Bookshelf)


const Profil  = Model.extend({
    tableName :'profiles',

    validate:{
        name : Joi.string().required(),
        photo :  Joi.string().required(),
        users : Joi.number().integer().required(),
        body  :Joi.string().required(),
        
    },
    validateUpdate:{
        name : Joi.string(),
        photo :  Joi.string(),
        users : Joi.number().integer(),
        body  :Joi.string(),
    },

    categori(){
        return this.belongsTo(CategoriesModel,"category")
    },

    users(){
            return this.belongsTo(UsersModel,"users")
    }
})

module.exports =  Profil