/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('category').del()
  await knex('category').insert([
    {
      categoryid: 1,
      categoryname: 'Orbital Mechanics'
    },
    {
      categoryid: 2,
      categoryname: 'Payroll'
    },
    {
      categoryid: 3,
      categoryname: 'Javascript'
    },
    {
      categoryid: 4,
      categoryname: 'Space Walking '
    }

  ])
    .catch(err => console.log(err));
};
