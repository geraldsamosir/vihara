
exports.up = function(knex, Promise) {
   return knex.schema
        .createTable('blogPosts', function(table) {
            table.increments('id').primary();
            table.integer('users').unsigned();
            table.string("title").notNullable()
            table.string("bannerphoto").notNullable()
            table.integer("category").unsigned()
            table.text("body").notNullable()
            table.timestamps();

            table.foreign('category')
                .references("blogCategories.id")
                .onDelete('cascade')
                .onUpdate('cascade');
                
            table.foreign('users')
                .references('users.id')
                .onDelete('cascade')
                .onUpdate('cascade');

        });
};

exports.down = function(knex, Promise) {
     return knex.schema
        .dropTable('blogPosts')
};
