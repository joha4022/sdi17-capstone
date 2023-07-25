/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('base').del()
  await knex('base').insert([
    {
      //baseid: 1, //created id
      basename: 'Los Angeles Space Force Base',
      basecity: 'El Segundo',
      basestate: 'CA'
    },
    {
      //baseid: 1, //created id
      basename: 'Wright-Patterson Air Force Base',
      basecity: 'Dayton',
      basestate: 'OH'
    },
    {
      //baseid: 1, //created id
      basename: 'White Sands Missile Range',
      basecity: 'Alamogordo',
      basestate: 'NM'
    },
  ]);
};

/**
         table.increments('baseid');
        table.string('basename')
        table.string('basecity')
        table.string('basestate')

 */