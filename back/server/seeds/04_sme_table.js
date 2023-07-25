/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('sme').del()
  await knex('sme').insert([
    {smeid: 1, user_id: 1, category_id: 1},
    {smeid: 2, user_id: 1, category_id: 2},
    {smeid: 3, user_id: 2, category_id: 2},
    {smeid: 4, user_id: 2, category_id: 3},
  ]);
};
