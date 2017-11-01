const  Conf = require('#Conf') 



const  bookshelf  = require('bookshelf')

const Bookshelf  = bookshelf(Conf.db)

Bookshelf.plugin('registry')




//get relation table 
const User_Model  = require("./users")



//filter schema type data
const Joi  = require( "joi")

/**
 * get model base class
 */

const {Models}   = require( "baseMvc")

const BaseModel =  Models


const Model   =  BaseModel(Bookshelf)

const Roles  = Model.extend({
    tableName :'roles',

     validate: {
        name : Joi.string().required(),
     },

    validateUpdate  :{
        name : Joi.string()
    },
    /**
    * Relation
    * this is the relation action for this model
    */
    Users(){
        return this.hasMany(User_Model,"roles")
    }
})


module.exports = Roles