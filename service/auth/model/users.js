const  Conf = require('#Conf') 

//encription library
const  bookshelfBcrypt = require("bookshelf-bcrypt")


const  bookshelf  = require('bookshelf')

const Bookshelf  = bookshelf(Conf.db)

Bookshelf.plugin('registry')

Bookshelf.plugin(bookshelfBcrypt ,{
    rounds: 15
})


//add promise 
const  Promise = require("bluebird")


//get relation table 
const  RolesModel = require("./roles")

const PostModel  =  require("Service/News/model/Post")


//filter schema type data
const  Joi = require("joi")



/**
 * get model base class
 */

const {Models}  = require("baseMvc") 

const BaseModel =  Models


const Model   =  BaseModel(Bookshelf)



const Users  = Model.extend({
    tableName :'users',


    /**
     * validation when created new data
     */   
    validate: {
         username : Joi.string().required(),
         password : Joi.string().required(),
         email : Joi.string().email().required(),
         token : Joi.string(),
     },

     /**
      * validation when udpate data
      */
      validateUpdate :{
         username : Joi.string(),
         password : Joi.string(),
         email : Joi.string().email(),
         token : Joi.string(),
      },

    /**
     * Filed where would encrypt 
     */
    bcrypt: { 
         field: 'password' 
    } ,

    /**
     * Relation
     * this is the relation action for this model
     */
    roles(){
        return this.belongsTo(RolesModel,"roles")
    },    

    Post(){
        return this.hasMany(PostModel,"user")
    }

    
})


module.exports =  Users