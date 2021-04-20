const { Pokemon } = require ('../models/');
const { Op } = require("sequelize");

class PokemonController {
    /* DEFINIR MÉTODOS */

    async create(req,res) {
        try {
            let pokemon = {
                nome: req.body.nome,
                tipo: req.body.tipo,
                numero: Number(req.body.numero),
                geracao: Number(req.body.geracao),   
            }
            console.log(pokemon)
            const pokemonResult = await Pokemon.create(pokemon);
            return res.status(200).json(pokemonResult); 
        } catch (err) {
            return res.status(400).json({error: err.mesage});
        }
    }

    async getAll(req,res) {
        try {
            /* fazer algum tratamento, ALGUMA REGRA DE NEGÓCIO */
            const pokemons = await Pokemon.findAll();
            return res.status(200).json(pokemons);
        }
        catch(err) {
            res.status(400).json({error: err.message})
        }
    }

    async getOne(req,res) {
        try {
            const pokemon = await Pokemon.findByPk(req.params.id);
            if (pokemon)
                return res.status(200).json(pokemon);
            else 
                return res.status(200).json({mensagem: "Pokemon não encontrado"});
        }
        catch(err) {
            res.status(400).json({error: err.message})
        }
    }

    async update(req,res) {
        try {
            const pokemon = await Pokemon.findByPk(req.params.id);
            if (pokemon) {
                /* req.body
                { nome, titulos, dataFundacao } */
                await pokemon.update(req.body);
                return res.status(200).json(pokemon);
            }
            else {
                return res.status(200).json({mensagem: "Pokemon não encontrado para atualizar"});
            }
        }
        catch(err) {
            res.status(400).json({error: err.message})
        }
    }

    async delete (req,res) {
        try {
            const pokemon = await Pokemon.findByPk(req.params.id);
            if (pokemon) {                
                await pokemon.destroy();
                return res.status(200).json(pokemon);
            }
            else {
                return res.status(200).json({mensagem: "Pokemon não encontrado para deletar"});
            }
        }
        catch(err) {
            res.status(400).json({error: err.message})
        }
    }

    async getAllByNome (req,res) {
        let nome = '%' + req.query.nome + '%';
        try {
            const pokemons = await Pokemon.findAll({
                where: {
                    nome: {
                        [Op.like]: nome
                        // [Op.eq]: // 
                    }
                }
            });

            if (pokemons)
                return res.status(200).json(pokemons);
            else
                return res.status(200).json({mensagem: "Não foram encontrados Pokemons"})
        }
        catch(err) {

        }
    }

}
module.exports = new PokemonController();