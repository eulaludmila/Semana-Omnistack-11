
const request = require('supertest');
const app = require('../../src/app');
const connection  =require('../../src/database/connection');

describe('ONG', () => {

    //antes de executar o teste
    beforeEach(async () => {
        await connection.migrate.rollback();//zerar o banco
        
        //realizar a migration para o banco de tese
        await connection.migrate.latest();
    })

    //Depois de todos os testes
    afterAll(async () => {

        //desfazer a conexão
        await connection.destroy();
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app).post('/ongs').send({
            name: "EULA",
            email: "eulaludimila12@gmail.com",
            whatsapp: "5511974740514",
            city: "Itapevi",
            uf: "SP"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);

    });
});