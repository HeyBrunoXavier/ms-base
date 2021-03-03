'use strict';
exports.up = (knex) => knex.schema.createTable('authentication', table => {
    table.string('token').notNull().unique();
    table.uuid('user').notNull().unique();
    table.timestamp('created_at').defaultTo(knex.fn.now());
	table.foreign('user').references('users.id').onDelete('CASCADE');
	console.log("CREATE TABLE AUTHENTICATION");
});
exports.down = (knex) => knex.schema.dropTable('authentication');
