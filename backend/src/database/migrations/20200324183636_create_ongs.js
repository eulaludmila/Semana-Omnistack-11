//Responsável pela criação da tabela
exports.up = function(knex) {
    //criar a tabela e receber na função ela mesma
    return knex.schema.createTable('ongs', function (table){

        //o id será uma string, pois ela será utilizada para fazer o login
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    })
};

//Voltar atrás por causa de uma criação da tabela
exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};
