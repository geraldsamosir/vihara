
exports.up = function(knex, Promise) {
   return knex.schema
        .createTable('sumbangans', function(table) {
            table.increments('id').primary();
            table.integer('users').unsigned();
            table.string("hari").notNullable()
            table.dateTime("tanggal").notNullable()
            table.string("dari").notNullable()
            table.integer("Jumlah").notNullable()
            table.timestamps();
                
            table.foreign('users')
                .references('users.id')
                .onDelete('cascade')
                .onUpdate('cascade');

        });
};

exports.down = function(knex, Promise) {
     return knex.schema
        .dropTable('sumbangans')
};
