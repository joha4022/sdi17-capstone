/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('network', table => {
    table.increments('networkid');

    table.integer('user_id');
    table.foreign('user_id').references('users.userid')

    table.integer('sme_id');
    table.foreign('sme_id').references('sme.smeid')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('network', table => {
    table.dropForeign('user_id');
    table.dropForeign('sme_id');
 })
.then(function() {
    return knex.schema.dropTableIfExists('network')
 });
};
