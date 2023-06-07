//Debo devolver un objeto con el detail del videojuego.
require('dotenv').config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Videogame, Genre } = require("../../db");

const URL = "https://api.rawg.io/api/games/"

module.exports = async (req, res) => {
    try {
        const { id } = req.params
        if(!id) return res.status(404).json({error: "Please, insert an ID."});
        
        const detailRaw = (await axios.get(`${URL}${id}?key=${API_KEY}`)).data;

        const detailFiltered = {
            id: detailRaw.id,
            name: detailRaw.name,
            image: detailRaw.background_image,
            platforms: detailRaw.platforms,
            description: detailRaw.description,
            releaseDate: detailRaw.releaseDate,
            rating: detailRaw.rating,
            genres: detailRaw.genres
        }

        return res.status(200).json(detailFiltered)
    } catch (error) {
        if(error.name.includes("Axios")){
            return res.status(404).json({error: "Invalid or non-existent ID."})
        } else {
            res.status(500).json({error: error.message})
        }
    }
};
// Necesito id, name, image, platforms, description, releaseDate, rating, genres. 