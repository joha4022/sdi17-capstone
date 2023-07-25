/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      userid: 1, //created id
      firstname: 'John',
      lastname: 'Doe',
      username: 'User1',
      email: 'John@gmail.com',
      supervisoremail: 'super@gmail.com',
      approveremail: 'approver@gmail.com',
      phonenumber: '123-456-7890',
      password: 'password1',
      bio:'Active Duty Space Force , Engineer ',
      photo:'back/server/photos/soldier.png',
      sme: true,
      admin: true,
      base_id: 1 //changed the table name here
    },
    {
      userid: 2, //created id
      firstname: 'Jane',
      lastname: 'Doe',
      username: 'User2',
      email: 'Jane@gmail.com',
      supervisoremail: 'super2@gmail.com',
      approveremail: 'approver2@gmail.com',
      phonenumber: '123-456-0000',
      password: 'password2',
      bio:'10 year Air Force veteran, meteorologist ',
      photo:'back/server/photos/Lady.jpg',
      sme: true,
      admin: false,
      base_id: 2 //changed the table name here
    },
  ])
  .catch(err => console.log(err));
};
