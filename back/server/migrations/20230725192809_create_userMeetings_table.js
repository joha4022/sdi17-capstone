/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('usermeetings', table => {
    table.increments('usermeetingid');

    table.integer('user_id');
    table.foreign('user_id').references('users.userid')

    table.integer('meeting_id');
    table.foreign('meeting_id').references('meetings.meetingid')

  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('usermeetings', table => {
    table.dropForeign('user_id');
    table.dropForeign('meeting_id');
  })
    .then(function () {
      return knex.schema.dropTableIfExists('usermeetings')
    });
};
