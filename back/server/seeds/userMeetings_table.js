/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('userMeetings').del()
  await knex('userMeetings').insert([
    {userMeetingid: 1, user_id: 1, meeting_id: 1},
    {userMeetingid: 2, user_id: 2, meeting_id: 1},
    {userMeetingid: 3, user_id: 1, meeting_id: 2},
    {userMeetingid: 4, user_id: 2, meeting_id: 2}
  ]);
};
