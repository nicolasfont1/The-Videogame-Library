const { Videogame, Genre } = require("../../db");

// Recibo por parámetro las propiedades que posee cada videogame.
module.exports = async (name, description, platforms, image, releaseDate, rating, genres) => {
    
    // Formateo el array que recibo con las plataformas para que sea igual al que poseen los juegos de la API.
    const cleanPlatforms = platforms.map((elem) => {
        return {name: elem}
    })

    // En genresPromises almaceno la promesa que retorna cada petición a la DB cuando pregunto si el género ingresado
    // existe en la tabla Genre.
    const genresPromises = genres.map(async (genreName) => {
        // Si la DB contiene el género recibido, lo almaceno en una constante.
        const genreMatch = await Genre.findOne({where: {name: genreName}})

        if(genreMatch){
            // Si la búsqueda tuvo éxito, retorno un objeto que contenga la propiedad id y name del género en la DB.
            return { id: genreMatch.id, name: genreMatch.name }
        } else {
            // Si la búsqueda no tuvo éxito lanzo el error correspondiente.
            throw Error(`The genre "${genreName}" is not in the database.`)
        }
    })

    // Como cada petición a la DB es una promesa, utilizo un Promise.all para guardar la resolución de cada solicitud
    // en una constante.
    const matchedGenres = await Promise.all(genresPromises)

    // Declaro el videojuego que voy a almacenar en la DB, utilizando object literals para guardar las propiedades
    // que llegaron por parámetro.
    // Observar que aún no creé la propiedad genres porque todavía no realicé la relación con la tabla Genre.
    const videogameRaw = {
        name,
        description,
        platforms: cleanPlatforms,
        image,
        releaseDate,
        rating
    }

    // Creo dentro de la tabla Videogame el registro que contiene el videogame recíen declarado.
    const newVideogameDB = await Videogame.create(videogameRaw)

    // Utilizando el método addGenres en el videojuego que acabo de almacenar en la DB, declaro su relación con la tabla Genre.
    // Cabe destacar que para esta relación necesitamos matchear las id de los géneros.
    await newVideogameDB.addGenres(matchedGenres.map((genre) => genre.id))

    // Finalmente retorno una "copia" del videogame que acabo de crear, pero no es exactamente el registro creado en la DB.
    return {
        id: newVideogameDB.id,
        name: newVideogameDB.name,
        description: newVideogameDB.description,
        platforms: cleanPlatforms,
        image: newVideogameDB.image,
        releaseDate: newVideogameDB.releaseDate,
        rating: newVideogameDB.rating,
        genres: matchedGenres,
        fromDatabase: true
    }
};