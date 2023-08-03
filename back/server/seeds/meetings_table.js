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
      startTime: '7:00',
      endTime: '08:00',
      meetingDate: '2023-08-13'
    },

    {
      meetingTitle: 'Tech change talk',
      meetingDescription: 'Discuss changes to some technology.',
      startTime: '13:00',
      endTime: '15:00',
      meetingDate: '2023-08-09'
    },

    {
      meetingTitle: 'Talk about JS',
      meetingDescription: 'Chat about how much we like JavaScript.',
      startTime: '09:00',
      endTime: '12:00',
      meetingDate: '2023-08-20'
    },
    {
      meetingTitle: 'Product wireframe design',
      meetingDescription: 'Meeting with a group to assist them in creation of a product.',
      startTime: '1000',
      endTime: '11:00',
      meetingDate: '2023-08-29'
    },
    {
      meetingTitle: 'Tech talk',
      meetingDescription: 'Discuss new technology coming up this year.',
      startTime: '14:00',
      endTime: '16:00',
      meetingDate: '2023-09-13'
    },
    {
      meetingTitle: 'Web change discussion',
      meetingDescription: 'Discuss minor changes to a website and gain some insight.',
      startTime: '15:00',
      endTime: '17:00',
      meetingDate: '2023-10-14'
    },
    {
      meetingTitle: 'Innovation Meet',
      meetingDescription: 'Discuss some innovating tachnology that some could be involved with.',
      startTime: '07:30',
      endTime: '10:30',
      meetingDate: '2023-11-17'
    },
    {
      meetingTitle: 'Morning Meet',
      meetingDescription: 'Morning sitdown to discuss way forward.',
      startTime: '08:30',
      endTime: '09:00',
      meetingDate: '2023-11-01'
    },
    {
      meetingTitle: 'Meeting H',
      meetingDescription: 'Supply needs to explain new ordering process.',
      startTime: '12:30',
      endTime: '14:45',
      meetingDate: '2023-12-13'
    },
    {
      meetingTitle: 'Hash out Vacation Timeline',
      meetingDescription: 'Discuss vacation timeline for section.',
      startTime: '15:35',
      endTime: '16:15',
      meetingDate: '2023-10-25'
    },
    {
      meetingTitle: 'Budget Overview',
      meetingDescription: 'Discuss upcoming changes to finacial sector.',
      startTime: '08:30',
      endTime: '09:00',
      meetingDate: '2023-09-02'
    },

  ]);
};
