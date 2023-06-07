// Declaro nueva instancia de express Router.
const videogamesRouter = require("express").Router();
// Importo los controladores.
const getAllVideogames = require("../controllers/videogames/getAllVideogames");
const getGameDetail = require("../controllers/videogames/getGameDetail");
const getGameSearch = require("../controllers/videogames/getGameSearch");
const createVideogame = require("../controllers/videogames/createVideogame")

// Recordar que /videogames viene por defecto en nuestra ruta debido al middleware ubicado en routes/index.

// Declaro las rutas y qué va a hacer cada una.
videogamesRouter.get("/", async (req, res) => {
    try {
        const { name } = req.query;

        // Si NO recibimos un name por query, ejecutamos getAllVideogames.
        if (!name) {
            const allGames = await getAllVideogames(); // Retorna la información de 20 juegos.
            return res.status(200).json(allGames)
        } else {
            const searchResult = await getGameSearch(name); // Retorna los primeros 15 juegos que matcheen la búsqueda.
            return res.status(200).json(searchResult)
        }
    } catch (error) {
        return res.status(404).json({ error: error.message })
    }

});

videogamesRouter.get("/:id", getGameDetail); // Retorna un objeto que contiene un videojuego y su información.

videogamesRouter.post("/", async (req, res) => { // Retorna el videojuego creado por el usuario.
    const { name, description, platforms, image, releaseDate, rating } = req.body;

    try {
        if (!name || !description || !platforms || !image || !releaseDate || !rating) {
            throw Error("Data missing.")
        } else {
            const newGameCreated = await createVideogame(name, description, platforms, image, releaseDate, rating);
            return res.status(200).json(newGameCreated);
        }
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
});


module.exports = videogamesRouter;