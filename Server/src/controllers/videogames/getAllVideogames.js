require('dotenv').config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Videogame, Genre } = require("../../db");
const filterGameDataAPI = require("../../utils/filterGameDataAPI");
// filterGameDataAPI recibe un array de videojuegos de la API y devuelve cada juego solo con las propiedades que necesito.

const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

module.exports = async () => {
    // Creo un array que va a contener los 100 videojuegos que necesito. 
    const hundredGames = []

    // Primero traigo los juegos almacenados en la database, incluyendo la relacion que tenga con la tabla Genre.
    const gamesFromDB = await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ["id", "name"],
            through: {
                attributes: []
            }
        }
    });

    // Compruebo si habia algún registro guardado en la tabla de videojuegos, de ser así, los pusheo primero
    // al array hundredGames, dandole prioridad ante los traidos de la API.
    gamesFromDB.length ? gamesFromDB.forEach((game) => hundredGames.push(game)) : ""

    // Utilizo un ciclo for con cinco iteraciones para obtener los 100 juegos que necesito, ya que en cada solicitud la API
    // retorna solo 20.
    for(let i = 1; i <= 5; i++){
        if(i === 1){
            const twentyGamesRaw = (await axios.get(`${URL}`)).data.results
            if(!twentyGamesRaw.length) throw Error("Something went wrong in your petition.")
            hundredGames.push(filterGameDataAPI(twentyGamesRaw))
        } else {
            twentyGamesRaw = (await axios.get(`${URL}&page=${i}`)).data.results
            if(!twentyGamesRaw.length) throw Error("Something went wrong in your petition.")
            hundredGames.push(filterGameDataAPI(twentyGamesRaw))
        }
    }
    
    // Finalmente retorno el array aplicandole el método slice para asegurarme de que efectivamente contenga 100 videojuegos.
    return hundredGames.flat().slice(0, 100);
};

//Debo poder filtrar los juegos por género y/o origen (API/DB).
//Debo poder ordenar los juegos por orden alfabético y/o rating (de forma ascendente y descendente).