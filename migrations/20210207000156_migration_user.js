'use strict';
exports.up = function(knex) {
	return knex.schema.createTable('users', table => {
		table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
		table.string('name').notNull();
		table.string('email').notNull().unique();
		table.string('password').notNull();
    table.uuid("people").defaultTo(knex.raw("uuid_generate_v4()"));
    table.uuid("hash").defaultTo(knex.raw("uuid_generate_v4()"));
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.foreign('people').references('people.id');
	})
};
exports.down = function(knex) {
	return knex.schema.dropTable('users')
};
