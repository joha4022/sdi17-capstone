/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('meetings', table => {
    table.increments('meetingid');
    table.string('meetingTitle')
    table.string('meetingDescription')
    table.string('startTime')
    table.string('endTime')
    table.string('meetingDate')
})

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('meetings');
};
