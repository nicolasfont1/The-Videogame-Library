//Declaro nueva instancia de express Router.
const genresRouter = require("express").Router();
//Importo los controladores.
const getAllGenres = require("../controllers/genres/getAllGenres")

//Recordar que /genres viene por defecto en nuestra ruta debido al middleware ubicado en routes/index.

// Declaro la ruta y qué va a hacer.
genresRouter.get("/", getAllGenres); //Muestra todos los géneros.

module.exports = genresRouter;