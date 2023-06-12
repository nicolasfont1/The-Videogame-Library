const { DataTypes } = require("sequelize");

// Exporto la funcion que define al modelo Genre.
module.exports = (database) => {
    database.define("genre", { // Observar que en la database, este nombre se guarda en plural.
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false
    });
};