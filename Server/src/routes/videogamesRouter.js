// Declaro una nueva instancia de Router.
const videogamesRouter = require("express").Router();

// Importo los controladores que van a gestionar la lógica de cada solicitud.
const getAllVideogames = require("../controllers/videogames/getAllVideogames");
// getAllVideogames retorna un array con 100 juegos, incluidos todos los que estén almacenados en la DB.

const getGameDetail = require("../controllers/videogames/getGameDetail");
// getGameDetail recibe una ID por params y retorna el detalle de ese videojuego. Funciona tanto para la API como para la DB.

const getGameSearch = require("../controllers/videogames/getGameSearch");
// getGameSearch recibe una palabra por query y retorna los primeros 15 videojuegos que la contengan en su propiedad name.
// Funciona tanto para la API como para la DB.

const createVideogame = require("../controllers/videogames/createVideogame");
// createVideogame recibe por body las propiedades correspondientes a cada videojuego, crea un registro, lo guarda en la tabla
// videogames de la DB y posteriormente retorna su UUID.

const deleteVideogame = require("../controllers/videogames/deleteVideogame");

// Recordar que /videogames viene por defecto en nuestra ruta debido al middleware ubicado en routes/index.

// Declaro el método HTTP que espera la ruta y luego como primer paramétro, el endpoint, despues como segundo paramétro 
// el controlador o la función que realizará la lógica de la solicitud.
videogamesRouter.get("/", async (req, res) => {
    try {
        const { name } = req.query; // Hago destructuring de la propiedad name de req.query.

        // Si NO recibí name por query, ejecuto getAllVideogames.
        if (!name) {
            const hundredGames = await getAllVideogames();
            return res.status(200).json(hundredGames)
        } else {
            const searchResult = await getGameSearch(name);
            return res.status(200).json(searchResult)
        }
    } catch (error) {
        return res.status(404).json({ error: error.message })
    }

});

videogamesRouter.get("/:id", getGameDetail); // Recibo una ID por params y retorno el detalle de ese videogame.

videogamesRouter.post("/", async (req, res) => { // Crea el videojuego, lo almacena en la DB y retorna su UUID.
    const { name, description, platforms, image, releaseDate, rating, genres } = req.body;
    // Hago destructuring de las propiedades que necesita el videogame, las cuales llegan por body.

    try {
        if (!name || !description || !platforms || !image || !releaseDate || !rating || !genres) {
            // Chequeo que hayan llegado todas las propiedades con exito.
            throw Error("Data missing.")
        } else {
            const newGameCreated = await createVideogame(
                    name, description, platforms, image, releaseDate, rating, genres
                );
            // Creo y almaceno un nuevo videojuego en la database, luego retorno su UUID.
            return res.status(200).json(newGameCreated);
        }
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
});

videogamesRouter.delete("/:id", deleteVideogame)

module.exports = videogamesRouter;