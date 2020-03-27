const connection = require('../database/connection')
module.exports = {

    async index (req, res) {
        const { page = 1 } = req.query;
        console.log(page);

        const [count] = await connection('incidentes').count(); //fazendo a contagem do total de registros


        const incidentes = await connection('incidentes') //nome da tabela
        .join('ongs', 'ongs.id', "=", 'incidentes.ong_id') //inner join
        .limit(5)//limitar registros
        .offset((page - 1) * 5) //paginação
        .select(["incidentes.*","ongs.name","ongs.email", "ongs.whatsapp", "ongs.city", "ongs.uf"]);

        res.header('X-Total-Count', count['count(*)']) // inserindo no cabecalho a quantidade de regitros

        return res.json(incidentes);
    },

    async create (req, res) {
        const {title, description, value} = req.body;

        const ong_id = req.headers.authorization

        const [id] = await connection('incidentes').insert({
            title,
            description,
            value,
            ong_id,
        })

        return res.json({ id });
    },


    async delete (req,res) {
        const {id} = req.params;
        const ong_id = req.headers.authorization;

        const incident = await connection('incidentes').where('id', id).select('ong_id').first();

        if(incident.ong_id != ong_id){
            return res.status(401).json({error: 'Operation not permitted.'});
        }

        await connection('incidentes').where('id' , id).delete();


        return res.status(204).send();

    }
}