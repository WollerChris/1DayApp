/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('movie_table').del()
  await knex('movie_table').insert([
    {id: 1, title: 'Mean Girls'},
    {id: 2, title: 'Hackers'},
    {id: 3, title: 'Sunshine'},
    {id: 4, title: 'ex machina'}

  ]);
};
