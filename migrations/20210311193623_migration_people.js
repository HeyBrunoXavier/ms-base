
exports.up = function(knex) {
  return knex.schema.createTable('people', table => {
		table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
		table.string("name",[120]).notNull();
		table.string("phone",[12]);
		table.string('email',[100]).notNull().unique();
		table.enu('type', ['Juridica','Fisica'], {useNative: true, enumName: 'tp_type', schemaName: 'public'});
		table.timestamp('created_at').defaultTo(knex.fn.now());
		console.log("*** CREATE TABLE PEOPLE ***");
	})
};

exports.down = function(knex) {
  return knex.schema.dropTable('people');
};
