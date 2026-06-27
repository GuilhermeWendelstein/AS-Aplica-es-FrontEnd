exports.up = function(knex) {
  return knex.schema.createTable('triagens', (table) => {
    table.increments('id').primary();
    table.string('sintomas');
    table.string('nivel_urgencia'); // ex: 'verde', 'amarelo', 'vermelho'
    table.integer('user_id').unsigned().references('id').inTable('users');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('triagens');
};