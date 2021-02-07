'use strict';
exports.up = function(knex) {
	return knex.schema.createTable('users', table => {
		table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
		table.string('name').notNull();
		table.string('email').notNull().unique();
		table.string('password').notNull();
	})
};
exports.down = function(knex) {
	return knex.schema.dropTable('users')
};
