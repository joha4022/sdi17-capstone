/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('category').del()
  await knex('category').insert([
    {
      categoryid: 1,
      name: 'Orbital Mechanics'
    }
  ])
  .catch(err => console.log(err));
};
