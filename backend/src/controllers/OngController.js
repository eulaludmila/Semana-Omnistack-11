const crypto = require('crypto');
const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
    
    async index (req, res) {
        const ongs = await connection('ongs').select('*'); //pegando todas as informações
    
        return res.json(ongs)
    },

    async create(req, res) {
        const { name, email, whatsapp, city, uf } = req.body;

        //Gerar 4 bytesCaracter hexadecimal
        const id = generateUniqueId();

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        return res.json({ id });
    }

}