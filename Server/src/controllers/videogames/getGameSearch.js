//Debo devolver los primeros 15 videojuegos que contengan la palabra recibida por query.
require('dotenv').config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Videogame, Genre } = require("../../db");

const URL = "https://api.rawg.io/api/games"

module.exports = async (name) => {
    const rawData = (await axios.get(`${URL}?search=${name}&key=${API_KEY}`)).data.results
    if(!rawData.length) throw Error("No videogame matches the search.")
    
    const fifteenGames = [] //Creo un arrray para guardar la información de cada juego filtrada.

    rawData.map((game) => {
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
        fifteenGames.push(gameDataFiltered)
    })

    return fifteenGames.slice(0, 15)
};