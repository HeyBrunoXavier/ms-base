
exports.up = knex =>{
    return knex.schema.createTable('physical_people', table => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('date-birth',[15]).notNull();
        table.enu('genre', ['Male','feminine','Other'], {useNative: true, enumName: 'tp_genre', schemaName: 'public'});
        table.string("cpf",[15]).notNull().unique();
        table.uuid("id_person").defaultTo(knex.raw("uuid_generate_v4()")).unique();
        table.uuid("hash").defaultTo(knex.raw("uuid_generate_v4()"));
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.foreign('id_person').references('people.id').onDelete('CASCADE');
        console.log("*** CREATE TABLE Physical People ***");
    })
  };
  
  exports.down = knex => { return knex.schema.dropTable('physical_people') };
  