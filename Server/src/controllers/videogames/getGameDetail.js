require('dotenv').config();
const { API_KEY } = process.env;
const axios = require("axios");
const getByIdFromDB = require("../../utils/getByIdFromDB");
// getByIdFromDB recibe una UUID y realiza una peticion a la DB para ver si corresponde a algún videogame almacenado.

const URL = "https://api.rawg.io/api/games/"

module.exports = async (req, res) => {
    try {
        // Hago destructuring del id que recibo por params y compruebo si ha llegado con éxito.
        const { id } = req.params
        if(!id) return res.status(404).json({error: "Please, insert an ID."});

        // Chequeo si el id no es un número, por ende, es una UUID (ya que están compuestas por caracteres alfanuméricos).
        if(isNaN(id)){
            const databaseGame = await getByIdFromDB(id);
            return res.status(200).json(databaseGame)
        }

        // Almaceno en una constante la propiedad data de la respuesta que me de la API al consultar por el id.
        const rawGameDetail = (await axios.get(`${URL}${id}?key=${API_KEY}`)).data;

        // Me quedo solo con la propiedad name del objeto platforms del videogame.
        const cleanPlatforms = rawGameDetail.platforms.map((elem) => {
            return elem.platform.name
        })

        // Me quedo con las propieades id y name del objeto genres del videogame.
        const cleanGenres = rawGameDetail.genres.map((elem) => {
            return {id: elem.id, name: elem.name}
        })

        // En un nuevo objeto guardo las propiedades correctamente filtradas que necesito para el detail.
        const cleanGameDetail = {
            id: rawGameDetail.id,
            name: rawGameDetail.name,
            image: rawGameDetail.image,
            platforms: cleanPlatforms,
            description: rawGameDetail.description,
            releaseDate: rawGameDetail.releaseDate,
            rating: rawGameDetail.rating,
            genres: cleanGenres
        }

        return res.status(200).json(cleanGameDetail)
    } catch (error) {
        if(error.name.includes("Axios")){
            return res.status(404).json({error: "Invalid or non-existent ID."})
        } else {
            res.status(500).json({error: error.message})
        }
    }
};