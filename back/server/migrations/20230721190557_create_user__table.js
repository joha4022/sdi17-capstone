/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('user', table => {
        table.increments('userid');
        table.string('firstname')
        table.string('lastname')
        table.string('username')
        table.string('email')
        table.string('supervisoremail')
        table.string('approveremail')
        table.string('phonenumber')
        table.string('password')
        table.boolean('sme')
        table.boolean('admin')

    }); 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user') 
};
