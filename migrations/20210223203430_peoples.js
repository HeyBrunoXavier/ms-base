
exports.up = function(knex) {
  return knex.schema.createTable('people', table => {
		table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
		table.string("name").notNull();
    table.string('cpf',[25]).notNull().unique();
    table.integer('idade').notNull();
    table.string('cep',[25]).notNull();
    table.string('estado').notNull();
    table.string('cidade').notNull();
    table.timestamp('created_at').defaultTo(knex.fn.now());
	})
};

exports.down = function(knex) {
  return knex.schema.dropTable('people');
};
