/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('usermeetings').del()
  await knex('usermeetings').insert([
    {user_id: 1, meeting_id: 1},
    {user_id: 2, meeting_id: 1},
    {user_id: 1, meeting_id: 2},
    {user_id: 2, meeting_id: 2}
  ]);
};
