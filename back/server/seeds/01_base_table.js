/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('base').del()
  await knex('base').insert([
    {
      baseid: 1, //created id
      name: 'LASFB',
      branch: 'Space Force',
      address: '123 main st',
      description: 'Space Force Base'
    },
  ]);
};

/**
         table.increments('baseid');
        table.string('name')
        table.string('branch')
        table.string('address')
        table.string('description')

 */