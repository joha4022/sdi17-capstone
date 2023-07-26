/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('meetings').del()
  await knex('meetings').insert([
    {
      meetingTitle: 'Capstone',
      meetingDescription: 'Work on Capstone',
      startTime: '7AM PT',
      endTime: '3PM PT',
      meetingDate: '7/25/2023'
    },

    {
      meetingTitle: 'Meeting A',
      meetingDescription: 'Work on A',
      startTime: '7AM PT',
      endTime: '3PM PT',
      meetingDate: '7/26/2023'
    },

    {
      meetingTitle: 'Meeting B',
      meetingDescription: 'Work on B',
      startTime: '7AM PT',
      endTime: '3PM PT',
      meetingDate: '7/27/2023'
    },
    {
      meetingTitle: 'Meeting C',
      meetingDescription: 'Work on C',
      startTime: '7AM PT',
      endTime: '3PM PT',
      meetingDate: '7/28/2023'
    },
    {
      meetingTitle: 'Meeting D',
      meetingDescription: 'Work on D',
      startTime: '7AM PT',
      endTime: '3PM PT',
      meetingDate: '7/29/2023'
    },
    {
      meetingTitle: 'Meeting E',
      meetingDescription: 'Work on E',
      startTime: '7AM PT',
      endTime: '3PM PT',
      meetingDate: '7/30/2023'
    },
    {
      meetingTitle: 'Meeting F',
      meetingDescription: 'Work on F',
      startTime: '7AM PT',
      endTime: '3PM PT',
      meetingDate: '7/31/2023'
    },
    {
      meetingTitle: 'Meeting G',
      meetingDescription: 'Work on G',
      startTime: '7AM PT',
      endTime: '3PM PT',
      meetingDate: '8/1/2023'
    },
    {
      meetingTitle: 'Meeting H',
      meetingDescription: 'Work on H',
      startTime: '7AM PT',
      endTime: '3PM PT',
      meetingDate: '8/2/2023'
    },
    {
      meetingTitle: 'Meeting I',
      meetingDescription: 'Work on I',
      startTime: '7AM PT',
      endTime: '3PM PT',
      meetingDate: '8/3/2023'
    },
    {
      meetingTitle: 'Meeting J',
      meetingDescription: 'Work on J',
      startTime: '7AM PT',
      endTime: '3PM PT',
      meetingDate: '8/4/2023'
    },

  ]);
};
