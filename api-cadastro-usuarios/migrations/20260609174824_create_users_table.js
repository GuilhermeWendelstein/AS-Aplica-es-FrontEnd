exports.up = function(knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.string('role').defaultTo('paciente'); // Já criamos a role aqui
    })
    .createTable('triagens', (table) => {
      table.increments('id').primary();
      table.text('sintomas');
      table.string('nivel_urgencia');
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('triagens').dropTableIfExists('users');
};