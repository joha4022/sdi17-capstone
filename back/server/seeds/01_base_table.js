/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('base').del()
  await knex('base').insert([
    {
      basename: 'Not Listed ',
      basecity: 'N/A',
      basestate: 'N/A',
      baselat: 39.8283,
      baselon: -98.5795
   },
    
    {  
      basename: 'Los Angeles Space Force Base',
      basecity: 'El Segundo',
      basestate: 'CA',
      baselat: 33.9181,
      baselon: -118.375
    },

    {
      basename: 'Wright-Patterson Air Force Base',
      basecity: 'Dayton',
      basestate: 'OH',
      baselat: 39.8137,
      baselon: -84.0537
    },

    {
      basename: 'White Sands Missile Range',
      basecity: 'Alamogordo',
      basestate: 'NM',
      baselat: 33.2385,
      baselon: -106.3464
    },

    {
      basename: 'Cape Canaveral Space Force Station',
      basecity: 'Cape Canaveral',
      basestate: 'FL',
      baselat: 28.4887,
      baselon: -80.5728
    },

    {
      basename: 'Vandenberg Space Force Base',
      basecity: 'Vandenberg Space Force Base',
      basestate: 'CA',
      baselat: 34.7399,
      baselon:-120.5320
    },
    
    {
      basename: 'Joint Base McGuire-Dix-Lakehurst',
      basecity: 'Burlington',
      basestate: 'NJ',
      baselat: 40.0352,
      baselon: -74.5844
    },
    
    {
      basename: 'Joint Base San Antonio',
      basecity: 'San Antonio',
      basestate: 'TX',
      baselat: 29.4503,
      baselon: -98.4510
    },
    
    {
      basename: 'Ft Bliss',
      basecity: 'El Paso',
      basestate: 'TX',
      baselat: 31.8124,
      baselon: -106.4213
    },
    
    {
      basename: 'Dugway Proving Grounds',
      basecity: 'Dugway',
      basestate: 'UT',
      baselat: 40.2212,
      baselon: -112.7356
    },
    
    {
      basename: 'Fort Meade',
      basecity: 'Fort Meade',
      basestate: 'MD',
      baselat: 39.1043,
      baselon: -76.7342
    },
    
    {
      basename: 'Fort Carson',
      basecity: 'Fort Carson',
      basestate: 'CO',
      baselat: 38.7375,
      baselon: -104.7889
    },
    
    {
      basename: 'Fort Gordon',
      basecity: 'Fort Gordon',
      basestate: 'GA',
      baselat: 33.4161,
      baselon: -82.1381
    },

    {
      basename: 'Peterson Air Force Base',
      basecity: 'Colorado Springs',
      basestate: 'CO',
      baselat: 38.8257,
      baselon: -104.6996
    },

  ]);
};

/**
         table.increments('baseid');
        table.string('basename')
        table.string('basecity')
        table.string('basestate')

 */