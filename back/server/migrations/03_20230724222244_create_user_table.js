// **
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
exports.up = function (knex) {
    return knex.schema.createTable('users', table => {
        table.increments('userid');
        table.string('firstname')
        table.string('lastname')
        table.string('username')
        table.string('email')
        table.string('supervisoremail')
        table.string('approveremail')
        table.string('phonenumber')
        table.string('password')
        table.string('hashedpassword')
        table.string('worklocation')
        table.string('bio').defaultTo('User has yet to fill out their bio!')
        table.string('photo')
        table.string('branch')
        table.varchar('img_url', 255)
        table.boolean('sme').defaultTo(false)
        table.boolean('admin').defaultTo(false)
        table.string('userverified').defaultTo('pending')
        table.integer('base_id')
        table.foreign('base_id').references('base.baseid')

    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    //return knex.schema.dropTableIfExists('users')
    return knex.schema.alterTable('users', table => {
        table.dropForeign('base_id');
    })
        .then(function () {
            return knex.schema.dropTableIfExists('users')
        });
};
