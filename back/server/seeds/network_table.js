/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  //network assigns the logged in user to a specific sme
  await knex('network').del()
  await knex('network').insert([
    {user_id: 1, sme_id: 2},
    {user_id: 2, sme_id: 1},
    {user_id: 1, sme_id: 4},
    {user_id: 3, sme_id: 4},
    {user_id: 4, sme_id: 4},

  ]);
};
