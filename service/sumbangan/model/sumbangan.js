const  Conf = require( '#Conf')


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

const {Models }  = require("baseMvc") 
const BaseModel  = Models


const Model   =  BaseModel(Bookshelf)


const Sumbangan  = Model.extend({
    tableName :'sumbangans',

    validate:{
        hari : Joi.string().required(),
        users : Joi.number().integer().required(),
        tanggal: Joi.string().isoDate().required(),
        dari : Joi.string().required(),
        Jumlah : Joi.number().integer().required(),
    },
    validateUpdate:{
        hari : Joi.string(),
        users : Joi.number().integer(),
        tanggal: Joi.string().isoDate(),
        dari : Joi.string(),
        Jumlah : Joi.number().integer(),
    },

    users(){
        return this.belongsTo(UsersModel,"users")
    }
})

module.exports =  Sumbangan