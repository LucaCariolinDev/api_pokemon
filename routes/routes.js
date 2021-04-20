const { Router } = require('express');
const PokemonController = require('../controllers/PokemonController');
const TreinadorController = require('../controllers/TreinadorController');
const routes = Router();


routes.get('/pokemons', PokemonController.getAll);
routes.get('/pokemon/:id', PokemonController.getOne);
routes.post('/pokemon', PokemonController.create);
routes.put('/pokemon/:id', PokemonController.update);
routes.delete('/pokemon/:id', PokemonController.delete);
routes.get('/pokemonsNome', PokemonController.getAllByNome);

routes.get('/treinadores', TreinadorController.getAll);
routes.get('/treinador/:id', TreinadorController.getOne);
routes.post('/treinador', TreinadorController.create);
routes.put('/treinador/:id', TreinadorController.update);
routes.delete('/treinador/:id', TreinadorController.delete);
routes.get('/treinadoresNome', TreinadorController.getAllByNome);


/* get, put, delete, update FIND */

module.exports = routes;