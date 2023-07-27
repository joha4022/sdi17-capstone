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
    {user_id: 2, category_id: 4},
    {user_id: 3, category_id: 15},
    {user_id: 4, category_id: 6},
    {user_id: 5, category_id: 21},
    {user_id: 6, category_id: 18},
    {user_id: 7, category_id: 17},
    {user_id: 8, category_id: 13},
    {user_id: 9, category_id: 4},
    {user_id: 10, category_id: 6},
    {user_id: 11, category_id: 9},
    {user_id: 12, category_id: 15},
    {user_id: 13, category_id: 10},
    {user_id: 15, category_id: 21},
    {user_id: 16, category_id: 3},
    {user_id: 17, category_id: 21},
    {user_id: 18, category_id: 5},
    {user_id: 19, category_id: 7},
    {user_id: 20, category_id: 11},
    {user_id: 21, category_id: 11},
    {user_id: 2, category_id: 3},
    {user_id: 3, category_id: 5},
    {user_id: 3, category_id: 6},
    {user_id: 3, category_id: 7},
    {user_id: 4, category_id: 1},

  ]);
};
