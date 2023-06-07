const { Router } = require('express');
// Importo los routers.
const videogamesRouter = require("./videogamesRouter");
const genresRouter = require("./genresRouter");


const router = Router();

// Configuro los routers.
router.use("/genres", genresRouter);
router.use("/videogames", videogamesRouter);

module.exports = router;