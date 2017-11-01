exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('users', function(table) {
            table.increments('id').primary();
            table.string('username').notNullable();
            table.string('password').notNullable();
            table.string('email').unique().collate('utf8_unicode_ci').notNullable();
            table.integer('roles').unsigned().defaultTo(3);
            table.text('token').notNullable();
            table.timestamps();
            
            table.foreign('roles')
                .references('roles.id')
                .onDelete('cascade')
                .onUpdate('cascade');

        });
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTable('users')
};