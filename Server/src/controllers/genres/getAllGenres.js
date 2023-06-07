// Debo traer todos los géneros de la API y guardarlos en la database. Se me ocurre chequear si la DB está vacia
// usando Genre.findAll(), si devuelve un array vacio, hacer un bulkCreate con el array devuelto por la request a la API.
require('dotenv').config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Videogame, Genre } = require("../../db");

const URL = `https://api.rawg.io/api/genres?key=${API_KEY}`;

module.exports = async (req, res) => {
    try {
        const dbContentCheck = await Genre.findAll(); // dbContentCheck se fija si la database estaba cargada.
        if(dbContentCheck.length) return res.status(200).json({success: "La database ha sido cargada."})

        const allGenresRaw = (await axios.get(`${URL}`)).data.results;
        if(!allGenresRaw.length) throw Error("Something went wrong in your petition.");

        const allGenres = []
        allGenresRaw.map((genre) => {
            const genreFiltered = {
                id: genre.id,
                name: genre.name
            }
            allGenres.push(genreFiltered)
        })

        await Genre.bulkCreate(allGenres)
        return res.status(200).json({success: "La database ha sido cargada."})   
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
};