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
    {user_id: 5, sme_id: 14},
    {user_id: 6, sme_id: 4},
    {user_id: 8, sme_id: 5},
    {user_id: 13, sme_id: 11},
    {user_id: 15, sme_id: 1},
    {user_id: 12, sme_id: 13},
    {user_id: 4, sme_id: 2},
    {user_id: 20, sme_id: 19},
    {user_id: 18, sme_id: 10},
    {user_id: 18, sme_id: 9},
    {user_id: 18, sme_id: 7},
    {user_id: 3, sme_id: 7},


  ]);
};
