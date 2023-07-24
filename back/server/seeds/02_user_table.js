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
      password: 'approver@gmail.com',
      bio:'20 year Air Force veteran, meteorologist ',
      //image_url: 'myimage.jpg'
      // sme: true,
      admin: true,
      base_id: 1 //changed the table name here
    },
  ])
  .catch(err => console.log(err));
};
