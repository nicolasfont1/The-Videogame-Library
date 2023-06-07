//Debo traer 100 videogames y paginarlos cada 15, de cada uno necesito image, name, genres.
require('dotenv').config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Videogame, Genre } = require("../../db");

const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

module.exports = async () => {
    const twentyGamesRaw = (await axios.get(`${URL}`)).data.results
    if(!twentyGames.length) throw Error("Something went wrong in your petition.")
    const twentyGames = []

    twentyGamesRaw.map((game) => {
        const gameDataFiltered = {
            id: game.id,
            name: game.name,
            image: game.background_image,
            rating: game.rating,
            genres: game.genres,
            fromDatabase: false
        }
        gameDataFiltered.genres.map(((genre) => {
            delete genre.slug
            delete genre.games_count
            delete genre.image_background
        }))
        twentyGames.push(gameDataFiltered)
    })
    
    return twentyGames;
};

// Del objeto data.results necesito las propiedades:
// name: "", genres: [{}], background_image: "".
//Debo poder filtrar los juegos por género y/o origen (API/DB).
//Debo poder ordenar los juegos por orden alfabético y/o rating (de forma ascendente y descendente).