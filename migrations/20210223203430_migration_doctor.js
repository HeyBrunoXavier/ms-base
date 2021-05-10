
exports.up = function(knex) {
  return knex.schema.createTable('doctors', table => {
		table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('crm',[25]).notNull().unique();
    table.enu('specialty', ['Alergologia','Angiologia','Buco Maxilo','Cardiologia Clínica','Cardiologia Infantil','Cirurgia Cabeça e Pescoço',"Cirurgia Cardíaca","Cirurgia de Tórax"], {useNative: true, enumName: 'tp_espec', schemaName: 'public'});
    table.uuid("id_person").defaultTo(knex.raw("uuid_generate_v4()"));
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.foreign('id_person').references('people.id').onDelete('CASCADE');
    console.log("*** CREATE TABLE DOCTORS ***");
	})
};

exports.down = function(knex) {
  return knex.schema.dropTable('doctors');
};
