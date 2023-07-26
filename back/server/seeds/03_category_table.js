/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('category').del()
  await knex('category').insert([
    {categoryname: 'Space Launch Operations'},

    {categoryname: 'Finance'},

    {categoryname: 'Javascript'},

    {categoryname: 'Space Operations'},

    {categoryname: 'Space Security'},

    {categoryname: 'Space Mobility'},

    {categoryname: 'Space Logistics'},

    {categoryname: 'Space Domain Awarenes'},

    {categoryname: 'Special Operations'},

    {categoryname: 'Psychological Operations'},

    {categoryname: 'Army Medical'},

    {categoryname: 'Judge Advocate General'},

    {categoryname: 'Army Cyber Warfare'},

    {categoryname: 'Army Aviation'},

    {categoryname: 'Chaplain Services'},

    {categoryname: 'Linguistics'},

    {categoryname: 'USSF Cyber Warfare'},

    {categoryname: 'USSF Cyber WarFare'},

    {categoryname: 'Intelligence'},

    {categoryname: 'Information Technology'},

    {categoryname: 'Administration'},

    {categoryname: 'Major Range Test Facility'},

  ])
    .catch(err => console.log(err));
};
