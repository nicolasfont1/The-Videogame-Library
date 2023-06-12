require('dotenv').config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Op } = require("sequelize")
const { Videogame } = require("../../db");
const filterGameDataAPI = require("../../utils/filterGameDataAPI")
// filterGameDataAPI recibe un array de videojuegos de la API y devuelve cada juego solo con las propiedades que necesito. 

const URL = "https://api.rawg.io/api/games"

module.exports = async (name) => {
    // Creo un arrray para guardar los 15 juegos que debe devolver la búsqueda con su información correctamente filtrada.
    const fifteenGames = []

    // Priorizo la búsqueda en la DB, consultando en la tabla Videogame si algún registro contiene el string recibido por
    // parametro en alguna parte de su propiedad name.
    const searchNameInBD = await Videogame.findAll({
        where: {
            name: {
                [Op.substring]: `%${name}%`
            }
        }
    })
    // Chequeo si la búsqueda tuvo éxito, en ese caso, pusheo el juego al array de 15 juegos.
    searchNameInBD.length ? fifteenGames.push(searchNameInBD) : ""

    // Almaceno en una constante la propiedad results del objeto que devuelva la petición a la API.
    const rawSearchInAPI = (await axios.get(`${URL}?search=${name}&key=${API_KEY}`)).data.results
    // Chequeo si la búsqueda no tuvo éxito, en ese caso, lanzo el error correspondiente.
    if(!rawSearchInAPI.length) throw Error("No videogame matches the search.")
    
    // Pusheo el resultado de la búsqueda al array de 15 juegos.
    fifteenGames.push(filterGameDataAPI(rawSearchInAPI))

    // Finalmente retorno fifteenGames, aplicando los métodos flat y slice me aseguro de que efectivamente esté devolviendo
    // un array que contenga quince objetos y no esté anidado.
    return fifteenGames.flat().slice(0, 15)
};