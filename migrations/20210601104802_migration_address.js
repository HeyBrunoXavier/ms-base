exports.up = function(knex) {
    return knex.schema.createTable('address', table =>{
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
		table.uuid("id_person").defaultTo(knex.raw("uuid_generate_v4()")).unique();
		table.string("zip_code",[15]).notNull().unique();
		table.string("complement",[30]);
		table.integer('number',[50]).notNull().unique();
		table.string("city",[100]).notNull();
		table.string("country",[100]).notNull();
		table.enu('uf', ['RO','AC','AM','RR','PA','AP','TO','MA','PI','CE','RN','PB','PE','AL','SE','BA','MG','ES','RJ','SP','PR','SC','RS','MS','MT','GO','DF'], {useNative: true, enumName: 'tp_uf', schemaName: 'public'});
		table.uuid('hash').defaultTo(knex.raw('uuid_generate_v4()'));
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.foreign('id_person').references('people.id').onDelete('CASCADE');
		console.log("*** CREATE TABLE ADDRESS ***");
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('address');
};
