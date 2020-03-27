/*

 1º parâmetro - Uma categoria (qualquer nome)
 2º parâmetro - Função

*/

const generateUniqueId = require('../../src/utils/generateUniqueId')
describe('Generate Unique ID', () => {
    //Isto (It)
    it('should generate an unique ID', () => {
        //espera algo que aconteça
        // expect(2 + 2).toBe(5);

        const id = generateUniqueId();

        expect(id).toHaveLength(8);
    })
})