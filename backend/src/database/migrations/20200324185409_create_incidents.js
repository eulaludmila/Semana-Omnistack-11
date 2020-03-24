//Responsável pela criação da tabela
exports.up = function(knex) {
    //criar a tabela e receber na função ela mesma
    return knex.schema.createTable('incidentes', function (table){

        //terá um indetificador auto_increment
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        //campo relacionamento
        table.string('ong_id').notNullable();

        //criando a chave estrangeira do campo 'ong_id', onde ela referenciará a coluna 'id' da tabela ongs
        table.foreign('ong_id').references('id').inTable('ongs')
    })
};

//Voltar atrás por causa de uma criação da tabela
exports.down = function(knex) {
  return knex.schema.dropTable('incidentes');
};
