// Esta funcion solo debe ser usada con los videogames traidos de la API.

// filterGameDataAPI recibe un array de videojuegos de la API con toda su información,
// realizando un mapeo retorno cada videojuego conteniendo solo las propiedades que necesito.
const filterGameDataAPI = (gameArray) => {
    const gamesFiltered = gameArray.map((game) => {
        const gameDataFiltered = {
            id: game.id,
            name: game.name,
            image: game.background_image,
            rating: game.rating,
            genres: game.genres,
            fromDatabase: false
        }
        gameDataFiltered.genres.map(((genre) => {
            delete genre.slug
            delete genre.games_count
            delete genre.image_background
        }))
        return(gameDataFiltered)
    })
    return gamesFiltered
};

module.exports = filterGameDataAPI;