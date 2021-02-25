'use strict';
exports.up = function(knex) {
	return knex.schema.createTable('authentication', table => {
    table.string('token').notNull().unique();
    table.uuid('user_id').defaultTo(knex.raw('uuid_generate_v4()'));
    table.timestamp('created_at').defaultTo(knex.fn.now());
		table.foreign('user_id').references('users.id');
	})
};
exports.down = function(knex) {
	return knex.schema.dropTable('authentication')
};
