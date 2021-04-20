const { Treinador, Pokemon } = require ('../models/');
const { Op } = require("sequelize");

class TreinadorController {
    /* DEFINIR MÉTODOS */

    async create(req,res) {
        try {
            let treinador = {
                nome: req.body.nome,
                idade: Number(req.body.idade),
                level: Number(req.body.level),
                pokemonPreferidoId: Number(req.body.pokemonPreferidoId),   
            }
            console.log(treinador)
            const treinadorResult = await Treinador.create(treinador);
            return res.status(200).json(treinadorResult); 
        } catch (err) {
            return res.status(400).json({error: err.mesage});
        }
    }

    async getAll(req,res) {
        try {
            /* fazer algum tratamento, ALGUMA REGRA DE NEGÓCIO */
            const treinadores = await Treinador.findAll({
                include: [{
                  model: Pokemon,
                  as: 'pokemons'
                }]
            });
            return res.status(200).json(treinadores);
        }
        catch(err) {
            res.status(400).json({error: err.message})
        }
    }

    async getOne(req,res) {
        try {
            const treinador = await Treinador.findByPk(req.params.id);
            if (treinador)
                return res.status(200).json(treinador);
            else 
                return res.status(200).json({mensagem: "Treinador não encontrado"});
        }
        catch(err) {
            res.status(400).json({error: err.message})
        }
    }

    async update(req,res) {
        try {
            const treinador = await Treinador.findByPk(req.params.id);
            if (treinador) {
                /* req.body
                { nome, titulos, dataFundacao } */
                await treinador.update(req.body);
                return res.status(200).json(treinador);
            }
            else {
                return res.status(200).json({mensagem: "Treinador não encontrado para atualizar"});
            }
        }
        catch(err) {
            res.status(400).json({error: err.message})
        }
    }

    async delete (req,res) {
        try {
            const treinador = await Treinador.findByPk(req.params.id);
            if (treinador) {                
                await treinador.destroy();
                return res.status(200).json(treinador);
            }
            else {
                return res.status(200).json({mensagem: "Treinador não encontrado para deletar"});
            }
        }
        catch(err) {
            res.status(400).json({error: err.message})
        }
    }

    async getAllByNome (req,res) {
        let nome = '%' + req.query.nome + '%';
        try {
            const treinadores = await Treinador.findAll({
                where: {
                    nome: {
                        [Op.like]: nome
                        // [Op.eq]: // 
                    }
                }
            });

            if (treinadores)
                return res.status(200).json(treinadores);
            else
                return res.status(200).json({mensagem: "Não foram encontrados Treinadores"})
        }
        catch(err) {

        }
    }

}

module.exports = new TreinadorController();