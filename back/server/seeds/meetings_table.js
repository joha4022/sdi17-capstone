/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('meetings').del()
  await knex('meetings').insert([
    {
      meetingid: 1,
      meetingTitle: 'Capstone',
      meetingDescription: 'Work on Capstone',
      startTime: '7AM PT',
      endTime: '3PM PT',
      meetingDate: '7/25/2023'
    },
    {
      meetingid: 2,
      meetingTitle: 'something else',
      meetingDescription: 'Work on Capstone',
      startTime: '7AM PT',
      endTime: '3PM PT',
      meetingDate: '7/26/2023'
    }
  ]);
};
