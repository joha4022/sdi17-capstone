/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('base', table => {
        table.increments('baseid');
        table.string('basename')
        table.string('basecity')
        table.string('basestate')
        table.double('baselat')
        table.double('baselon')

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
