exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('roles', function(table) {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.timestamps();;

        })
        .then(()=>{
            return knex("roles").insert(
                [
                    {
                        id : 1,
                        name:"SuperAuthenticatedUser"
                    },
                    {
                        id : 2 , 
                        name : "MaintenanerUser / Developer"
                    },
                    {
                        id :3 ,
                        name : "AuthenticatedUser"
                    }
                ]
            )
        });
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTable('roles')
};