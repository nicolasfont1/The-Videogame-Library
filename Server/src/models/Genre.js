const { DataTypes } = require("sequelize");

// Exportamos la funcion que define el modelo Genre.

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