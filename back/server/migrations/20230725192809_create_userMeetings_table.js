/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('userMeetings', table => {
    table.increments('userMeetingid');

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
  return knex.schema.alterTable('userMeetings', table => {
    table.dropForeign('user_id');
    table.dropForeign('meeting_id');
  })
    .then(function () {
      return knex.schema.dropTableIfExists('userMeetings')
    });
};
