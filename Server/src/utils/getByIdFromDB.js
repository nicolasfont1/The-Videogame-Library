const { Videogame, Genre } = require("../db");

// getByIdFromDB recibe una UUID* por parámetro para buscar un videojuego en la tabla Videogame.
const getByIdFromDB = async (id) => {
    // Uso el método findByPk y almaceno el resultado de la petición a la DB en una variable, incluyendo la relacion del
    // videogame con el genero de la tabla Genre.
    const videogameSearch = await Videogame.findByPk(id, {
        include: {
            model: Genre,
            attributes: ["id", "name"],
            through: {
                attributes: []
            }
        }
    })
    // Si la búsqueda no tuvo éxito, retorno el error que corresponde.
    if(!videogameSearch) throw Error("No game in the database has that Id.")
    
    // Finalemnte retorno la propiedad dataValues de la respuesta que me dió la database.
    return videogameSearch.dataValues
};

module.exports = getByIdFromDB;

// *Universal Unique IDentifier