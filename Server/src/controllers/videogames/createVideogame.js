const { Videogame, Genre } = require("../../db");

module.exports = async (name, description, platforms, image, releaseDate, rating) => {
    const newGame = await Videogame.findOrCreate({
        where: {
            name,
            description,
            platforms,
            image,
            releaseDate,
            rating
        }
    });
    return newGame;
};

// Quizas deba agregar la propiedad fromDatabase.