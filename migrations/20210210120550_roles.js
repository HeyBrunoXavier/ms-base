'use strict';
exports.up = function(knex) {
	return knex.schema.createTable('roles', table => {
		table.integer('id').primary().notNull();
		table.enu('action', ['master','admin','public'], {useNative: true, enumName: 'tp_action', schemaName: 'public'});
    table.string('description');
    table.uuid('user_id').defaultTo(knex.raw('uuid_generate_v4()'));
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.foreign('user_id').references('users.id');
	})
};
exports.down = function(knex) {
	return knex.schema.dropTable('roles')
};