/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('movie_table').del()
  await knex('movie_table').insert([
    {title: 'Mean Girls'},
    {title: 'Hackers'},
    {title: 'Sunshine'},
    {title: 'ex machina'}

  ]);
};
