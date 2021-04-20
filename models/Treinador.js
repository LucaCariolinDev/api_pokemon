const sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Treinador = sequelize.define("Treinador", {
        nome: Sequelize.STRING,
        idade: Sequelize.INTEGER,
        level: Sequelize.INTEGER ,
        pokemonPreferidoId: Sequelize.INTEGER
    })

    Treinador.associate = (models) => {
        Treinador.belongsTo(models.Pokemon, {
          foreignKey: {
            name: 'pokemonPreferidoId',
            allowNull: false
          },
          as: 'pokemons'
        });
      };

    return Treinador;
}