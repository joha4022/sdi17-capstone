/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      //userid: 10001, //created id
      firstname: 'John',
      lastname: 'Doe',
      username: 'user1',
      email: 'John@gmail.com',
      supervisoremail: 'super@gmail.com',
      approveremail: 'approver@gmail.com',
      phonenumber: '123-456-7890',
      password: 'password1',
      worklocation: 'BLDG 272 RM 5',
      bio:'Active Duty Space Force , Engineer ',
      photo:'back/server/photos/soldier.png',
      branch: 'USSF',
      sme: true,
      admin: true,
      base_id: 1 //changed the table name here
    },
    {
      //userid: 10002, //created id
      firstname: 'Jane',
      lastname: 'Doe',
      username: 'user2',
      email: 'Jane@gmail.com',
      supervisoremail: 'super2@gmail.com',
      approveremail: 'approver2@gmail.com',
      phonenumber: '123-456-0000',
      password: 'password2',
      worklocation: 'BLDG 271 RM 4',
      bio:'10 year Air Force veteran, meteorologist ',
      photo:'back/server/photos/Lady.jpg',
      branch: 'USAF',
      sme: true,
      admin: false,
      base_id: 2 //changed the table name here
    },
  ])
  .catch(err => console.log(err));
};
