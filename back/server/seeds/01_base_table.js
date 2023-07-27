/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('base').del()
  await knex('base').insert([
    {
       basename: 'Joint Base Lewis McChord',
       basecity: 'Tacoma',
       basestate: 'WA'
    },

    {  
      basename: 'Los Angeles Space Force Base',
      basecity: 'El Segundo',
      basestate: 'CA'
    },

    {
      basename: 'Wright-Patterson Air Force Base',
      basecity: 'Dayton',
      basestate: 'OH'
    },

    {
      basename: 'White Sands Missile Range',
      basecity: 'Alamogordo',
      basestate: 'NM'
    },

    {
      basename: 'Cape Canaveral Space Force Station',
      basecity: 'Cape Canaveral',
      basestate: 'FL'
    },

    {
      basename: 'Vandenberg Space Force Base',
      basecity: 'Vandenberg Space Force Base',
      basestate: 'CA'
    },
    
    {
      basename: 'Joint Base McGuire-Dix-Lakehurst',
      basecity: 'Vandenberg Space Force Base',
      basestate: 'NJ'
    },
    
    {
      basename: 'Joint Base San Antonio',
      basecity: 'San Antonio',
      basestate: 'TX'
    },
    
    {
      basename: 'Ft Bliss',
      basecity: 'El Paso',
      basestate: 'TX'
    },
    
    {
      basename: 'Dugway Proving Grounds',
      basecity: 'Dugway',
      basestate: 'UT'
    },
    
    {
      basename: 'Fort Meade',
      basecity: 'Fort Meade',
      basestate: 'MD'
    },
    
    {
      basename: 'Fort Carson',
      basecity: 'Fort Carson',
      basestate: 'CO'
    },
    
    {
      basename: 'Fort Gordon',
      basecity: 'Fort Gordon',
      basestate: 'GA'
    },

    {
      basename: 'Peterson Air Force Base',
      basecity: 'Colorado Springs',
      basestate: 'CO'
    },

  ]);
};

/**
         table.increments('baseid');
        table.string('basename')
        table.string('basecity')
        table.string('basestate')

 */