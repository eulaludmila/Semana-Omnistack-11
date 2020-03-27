const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

//biblioteca de validação
const {celebrate, Segments, Joi} = require('celebrate');

//Desacoplando as rotas para essa variável
const routes = express.Router();

routes.post('/session',SessionController.create)

routes.get('/ongs', OngController.index)

//colocando a validação antes da criação
routes.post('/ongs',celebrate({
    [Segments.BODY]:Joi.object().keys({
        name: Joi.string().required().min(2),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(15),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}) ,OngController.create)

routes.get('/incidents',celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index)
routes.post('/incidents',celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().min(3),
        title: Joi.string().required().min(2),
        description: Joi.string().required().min(3),
        value:Joi.number().required()
    },
    {
        [Segments.HEADERS] : Joi.object({
            authorization: Joi.string().required(),
        }).unknown(), //não precisar validar todas as propriedades do header
    }
    )
}), IncidentController.create)

routes.delete('/incidents/:id',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete)

routes.get('/profile',celebrate({
    [Segments.HEADERS] : Joi.object({
        authorization: Joi.string().required(),
    }).unknown(), //não precisar validar todas as propriedades do header
}), ProfileController.index)

module.exports = routes;