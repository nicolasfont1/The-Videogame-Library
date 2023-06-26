import {
   GET_ALL_VIDEOGAMES, NAME_SEARCH, PAGE_LOADING,
   GET_API_GENRES, CREATE_GAME, ORDER, FILTER_ADDED_BY,
   FILTER_GENRES, SHOWING_SEARCH, CLEAN_VIDEOGAMES
} from "./action-types";

const initialState = {
   globalVideogames: [], // Contiene los videogames que el usuario está viendo en pantalla.
   copyOfVideogames: [], // Copia que uso como "backup" para poder quitar los filtros y ordenamientos de las cards mostradas.
   allApiGenres: [], // Contiene todos los géneros de la API con sus respectivos id.
   currentFilters: { // Guarda los últimos filtros aplicados. Lo utilizo para no perder los anteriores al momento de agregar/eliminar.
      addedBy: "any", // Observar que las propiedades tendrán el mismo valor que el payload que necesita cada filtro para cambiar.
      genres: []      // Con esto logro poder cambiar los filtros usando las values de los select y las que guardé acá.
   },
   pageLoading: true, // Maneja el estado del loader.
   showingSearch: false, // Lo utilizo para mostrar/esconder el botón que resetea la búsqueda de la search bar.
   lastGameCreatedUUID: "" // Cuando agrego un juego guardo su UUID para poder acceder a su detalle apenas se suba el form.
}

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_ALL_VIDEOGAMES: // Trae los 100 juegos que muestro en home, incluye API y DB.
         return {
            ...state,
            globalVideogames: action.payload,
            copyOfVideogames: action.payload
         }

      case NAME_SEARCH: // Realiza la búsqueda por nombre, incluye juegos de la DB y sus respectivos géneros.
         return {
            ...state,
            globalVideogames: action.payload,
            copyOfVideogames: action.payload
         }

      case SHOWING_SEARCH: // Activa o desactiva el botón para limpiar la búsqueda.
         return {
            ...state,
            showingSearch: action.payload
         }

      case CLEAN_VIDEOGAMES:
         return {
            ...state,
            globalVideogames: [],
            copyOfVideogames: []
         }

      case GET_API_GENRES: // Trae todos los géneros de la API, los guarda en un global state y en la DB.
         return {
            ...state,
            allApiGenres: action.payload.sort((a, b) => { // Los ordeno por orden alfabético para mas placer :)
               let nameA = a.name;
               let nameB = b.name;
               if (nameA < nameB) return -1;
               if (nameA > nameB) return 1;
               return 0
            })
         }

      case PAGE_LOADING: // Activa o desactiva el global state al que suscribo los componentes que tienen tiempo de carga.
         return {
            ...state,
            pageLoading: action.payload
         }

      case CREATE_GAME: // Obtengo el juego recien creado para poder añadirlo a globalVideogames y quedarme con su UUID.
         let lastGameCreated = action.payload

         return {
            ...state,
            lastGameCreatedUUID: lastGameCreated.id
         }

      case ORDER: // Maneja los cuatro ordenamientos que pueden tener las cards, como así tambien la posibilidad de sacarlos. 
         let orderedVideogames = [...state.globalVideogames]
         let orderType = action.payload;

         if (orderType === "none") { // Elimina ordenamientos, esta value llega al apretar la X al lado del span.
            if (state.currentFilters.addedBy === "any") { // Controlando estado de filtros, si no hay ninguno devuelvo la copia.
               return {
                  ...state,
                  globalVideogames: [...state.copyOfVideogames]
               }
            }
         }

         if (orderType === "asc" || orderType === "des") { // Ordenamiento alfabético.
            return {
               ...state,
               globalVideogames:
                  orderType === "asc" // Manejo la solicitud con un ternario.
                     ? orderedVideogames.sort((a, b) => { // Si el orden es ascendente.
                        let nameA = a.name;
                        let nameB = b.name;
                        if (nameA < nameB) return -1;
                        if (nameA > nameB) return 1;
                        return 0
                     })
                     : orderedVideogames.sort((a, b) => { // Si no es ascendente, logicamente va a ser descendente.
                        let nameA = a.name;
                        let nameB = b.name;
                        if (nameA < nameB) return 1;
                        if (nameA > nameB) return -1;
                        return 0
                     })
            }
         } else { // Si no es alfabético, será ordenamiento por rating.
            return {
               ...state,
               globalVideogames:
                  orderType === "min" // Manejo la solicitud con un ternario.
                     ? orderedVideogames.sort((a, b) => { // Si el orden es del minimo al máximo.
                        let ratingA = a.rating;
                        let ratingB = b.rating;
                        if (ratingA < ratingB) return -1; // ratingA mas chico que ratingB, lo posiciona primero.
                        if (ratingA > ratingB) return 1; // ratingA mas grande que ratingB, lo pasa adelante.
                        return 0 // En caso de igualdad no se realizan movimientos.
                     })
                     : orderedVideogames.sort((a, b) => { // Si no es min-max, logicamente va a ser max-min.
                        let ratingA = a.rating;
                        let ratingB = b.rating;
                        if (ratingA < ratingB) return 1; // ratingA mas chico que ratingB, lo pasa adelante.
                        if (ratingA > ratingB) return -1; // ratingA mas grande que ratingB, lo posiciona primero.
                        return 0 // En caso de igualdad no se realizan movimientos.
                     })
            }
         }

      case FILTER_ADDED_BY:
         let filteredGames = [...state.copyOfVideogames]; // Manejo la copia del globalVideogames original.
         return {
            ...state,
            globalVideogames:
               action.payload === "API"
                  ? filteredGames.filter((game) => game.fromDatabase === false) // Si deseo solo juegos traidos de la API.
                  : action.payload === "user" //Ternario anidado, si NO es "user", será "any" (ordenamiento default).
                     ? filteredGames.filter((game) => game.fromDatabase === true) // Si deseo solo los juegos creados por el user.
                     : state.copyOfVideogames, // Si elimino el filtro, retorno globalVideogames en su orden default.
            currentFilters: { ...state.currentFilters, addedBy: action.payload } // ! // Actualizo el objeto current filters.
         }

      case FILTER_GENRES:
         let genreFilteredGames = [...state.globalVideogames] // Trabajo sobre los juegos que estoy viendo en pantalla.
         let selectedGenres = action.payload

         if (selectedGenres.length > 0) { // Si selectedGenres tiene contenido:
            let matchedGames = selectedGenres.map((selecGenre) => { // Mapeo selectedGenres y obtengo cada genero del array.
               return genreFilteredGames.filter((game) => { // Por cada genero retorno los juegos que matcheen.
                  return game.genres.some((genre) => genre.name === selecGenre) // Metodo some retorna el game si matchea un genero.
               })
            })
            return {
               ...state, // Actualizo globalVideogames con los resultados de la búsqueda, aplicando flat para eliminar arrays anidados.
               globalVideogames: matchedGames.flat(), currentFilters: { ...state.currentFilters, genres: action.payload }
            } // Cada vez que agrego/saco un genero, también actualizo currentFilters para no perder los anteriores.
         } else { // selectedGenres vacio, simplemente retorno globalVideogames tal cual está y actualizo currentFilters.
            return {
               ...state,
               globalVideogames: [...state.globalVideogames], currentFilters: { ...state.currentFilters, genres: [] }
            }
         }

      default: return { ...state }
   }
};

export default reducer;

// Antes de despachar un filtro siempre despachamos el filtro anterior para que el estado global esté siempre
// actualizado segun los filtros que tenia antes.