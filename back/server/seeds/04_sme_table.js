/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('sme').del()
  await knex('sme').insert([
    {user_id: 1, category_id: 1},
    {user_id: 1, category_id: 2},
    {user_id: 2, category_id: 2},
    {user_id: 2, category_id: 3},
    {user_id: 3, category_id: 5},
    {user_id: 3, category_id: 6},
    {user_id: 3, category_id: 7},
    {user_id: 4, category_id: 1},

  ]);
};
