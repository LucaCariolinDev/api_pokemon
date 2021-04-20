const sequelize = require("sequelize");
const { Treinador } = require ('.');

module.exports = (sequelize, Sequelize) => {
    const Pokemon = sequelize.define("Pokemon", {
        nome: Sequelize.STRING,
        tipo: Sequelize.STRING,
        numero: Sequelize.INTEGER,
        geracao: Sequelize.INTEGER    
    })

    Pokemon.associate = (models) => {
        Pokemon.hasMany(models.Treinador, {
            foreignKey: {
                name: 'pokemonPreferidoId',
                allowNull: false
              },
            as: 'treinadors'
        });
    };

    return Pokemon;
}