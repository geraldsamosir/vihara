
exports.up = function(knex, Promise) {
   return knex.schema
        .createTable('profiles', function(table) {
            table.increments('id').primary();
            table.integer('users').unsigned();
            table.string("name").notNullable()
            table.string("photo").notNullable()
            table.text("body").notNullable()
            table.timestamps();
                
            table.foreign('users')
                .references('users.id')
                .onDelete('cascade')
                .onUpdate('cascade');

        });
};

exports.down = function(knex, Promise) {
     return knex.schema
        .dropTable('profiles')
};
