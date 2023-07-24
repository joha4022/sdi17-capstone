/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('sme').del()
  await knex('sme').insert([
    {smeid: 1, user_id: 1, base_id: 1}
  ]);
};
