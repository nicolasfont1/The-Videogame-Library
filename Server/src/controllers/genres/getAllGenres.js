require('dotenv').config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Genre } = require("../../db");

const URL = `https://api.rawg.io/api/genres?key=${API_KEY}`;

module.exports = async (req, res) => {
    try {
        // En dbContentCheck guardo los registros que estén en la tabla Genres, si ya está cargada retorna su contenido.
        const dbContentCheck = await Genre.findAll();
        if(dbContentCheck.length) return res.status(200).json(dbContentCheck)

        // Si la database está vacía, hago una petición a la API y obtengo todos los géneros.
        const allGenresRaw = (await axios.get(`${URL}`)).data.results;
        if(!allGenresRaw.length) throw Error("Something went wrong in your petition.");

        // Al resultado de la petición le hago un .map() y me quedo con las propieades que necesito. 
        const allGenres = []
        allGenresRaw.map((genre) => {
            const genreFiltered = {
                id: genre.id,
                name: genre.name
            }
            allGenres.push(genreFiltered)
        })

        // Finalmente hago un bulkCreate y guardo todos los registros en la tabla Genres, luego los retorno.
        await Genre.bulkCreate(allGenres)
        return res.status(200).json(allGenres)   
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
};