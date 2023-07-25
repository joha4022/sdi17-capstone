/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('sme', table => {
    table.increments('smeid');

    table.integer('user_id');
    table.foreign('user_id').references('users.userid')

    table.integer('category_id');
    table.foreign('category_id').references('category.categoryid')

})
.catch(err => console.log(err));
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
      return knex.schema.alterTable('sme', table => {
        table.dropForeign('user_id');
        table.dropForeign('category_id');
     })
    .then(function() {
        return knex.schema.dropTableIfExists('sme')
     });
};
