const Conf = require( '#Conf')

const bookshelf = require( 'bookshelf')

const Bookshelf  = bookshelf(Conf.db)


//add promise 
const  Promise = require("bluebird") 


//get relation table 
const CategoriesModel = require("./Categories")
const UsersModel  = require("Service/auth/model/users")



//filter schema type data
const BaseJoi = require("joi")
const ExtensionDate = require('joi-date-extensions');
const Joi =BaseJoi.extend(ExtensionDate)


/**
 * get model base class
 */

const {Models}  = require("baseMvc")  
const BaseModel  = Models


const Model   =  BaseModel(Bookshelf)


const Posts  = Model.extend({
    tableName :'blogPosts',

    validate:{
        title : Joi.string().required(),
        bannerphoto :  Joi.string().required(),
        category : Joi.number().integer().required(),
        users : Joi.number().integer().required(),
        body  :Joi.string().required(),
        created_at: Joi.string().isoDate()
        
    },
    validateUpdate:{
        title : Joi.string(),
        bannerphoto :  Joi.string(),
        category : Joi.number().integer(),
        body  :Joi.string(),
        users : Joi.number().integer(),
        created_at: Joi.string().isoDate()
    },

    categori(){
        return this.belongsTo(CategoriesModel,"category")
    },

    users(){
            return this.belongsTo(UsersModel,"users")
    }
})

module.exports =  Posts