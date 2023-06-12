//Declaro una nueva instancia de Router.
const genresRouter = require("express").Router();

//Importo los controladores que van a gestionar la lógica de cada solicitud.
const getAllGenres = require("../controllers/genres/getAllGenres")
//getAllGenres retorna todos los géneros existentes en la API y a su vez los almacena en la tabla Genre de la DB.

//Recordar que /genres viene por defecto en nuestra ruta debido al middleware ubicado en routes/index.

// Declaro el método HTTP que espera la ruta y luego como primer paramétro, el endpoint, despues como segundo paramétro 
// el controlador que realizará la lógica de la solicitud.
genresRouter.get("/", getAllGenres);

module.exports = genresRouter;