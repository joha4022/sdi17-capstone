/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert([
    {
      firstname: 'John', lastname: 'Doe', 
      username: 'User1', 
      email: 'John@gmail.com', 
      supervisoremail: 'super@gmail.com', 
      approveremail: 'approver@gmail.com', 
      phonenumber: '123-456-7890', 
      password: 'approver@gmail.com', 
      // sme: true, 
      admin: true,
    }
  ]);
};
