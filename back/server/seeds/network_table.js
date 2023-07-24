/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('network').del()
  await knex('network').insert([
    {networkid: 1, user_id: 1, sme_id: 1}
  ]);
};
