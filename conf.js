const _db  = require("./db");

let Conf  =  {
    db : require('knex')(_db)
}


module.exports = Conf;