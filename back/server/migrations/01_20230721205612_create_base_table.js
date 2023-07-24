/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('base', table => {
        table.increments('baseid');
        table.string('name')
        table.string('branch')
        table.string('address')
        table.string('description')

    })
    .catch(err => console.log(err));
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('base')
};
