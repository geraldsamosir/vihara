
exports.up = function(knex, Promise) {
   return knex.schema
        .createTable('ibadahs', function(table) {
            table.increments('id').primary();
            table.integer('users').unsigned();
            table.string("hari").notNullable()
            table.dateTime("tanggal").notNullable()
            table.string("ibadah").notNullable()
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
        .dropTable('ibadahs')
};
