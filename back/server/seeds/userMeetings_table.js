/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('usermeetings').del()
  await knex('usermeetings').insert([
    {user_id: 1, meeting_id: 10},
    {user_id: 2, meeting_id: 10},
    {user_id: 3, meeting_id: 2},
    {user_id: 4, meeting_id: 2},
    {user_id: 5, meeting_id: 7},
    {user_id: 6, meeting_id: 7},
    {user_id: 7, meeting_id: 7},
    {user_id: 8, meeting_id: 7},
    {user_id: 10, meeting_id: 10},
    {user_id: 10, meeting_id: 11},
    {user_id: 10, meeting_id: 2},
    {user_id: 10, meeting_id: 7},
    {user_id: 2, meeting_id: 5},
    {user_id: 2, meeting_id: 7},
    {user_id: 2, meeting_id: 6},
    {user_id: 2, meeting_id: 1}
  ]);
};
