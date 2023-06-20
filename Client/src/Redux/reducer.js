import { GET_ALL_VIDEOGAMES, NAME_SEARCH, PAGE_LOADING, GET_API_GENRES, CREATE_GAME, ORDER, FILTER_ADDED_BY, FILTER_GENRES } from "./action-types";

const initialState = {
   globalVideogames: [],
   copyOfVideogames: [],
   allApiGenres: [],
   lastGameCreatedUUID: "",
   pageLoading: true,
   currentFilters: {
      addedBy: "any",
      genres: []
   }
}

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_ALL_VIDEOGAMES:
         return {
            ...state,
            globalVideogames: action.payload,
            copyOfVideogames: action.payload
         }

      case PAGE_LOADING:
         return {
            ...state,
            pageLoading: action.payload
         }

      case NAME_SEARCH:
         return {
            ...state,
            globalVideogames: action.payload,
            copyOfVideogames: action.payload
         }

      case GET_API_GENRES:
         return {
            ...state,
            allApiGenres: action.payload.sort((a, b) => {
               let nameA = a.name;
               let nameB = b.name;
               if(nameA < nameB) return -1;
               if(nameA > nameB) return 1;
               return 0
            })
         }

      case CREATE_GAME:
         return {
            ...state,
            lastGameCreatedUUID: action.payload
         }

      case ORDER:
         let orderedVideogames = [...state.globalVideogames]
         let orderType = action.payload;
         
         if(orderType === "none"){ // Eliminando ordenamientos, apretar la X al lado del span.
            if(state.currentFilters.addedBy === "any"){ // Controlando estado de filtros
               return {
                  ...state,
                  globalVideogames: [...state.copyOfVideogames]
               }
            }
         }  

         if(orderType === "asc" || orderType === "des"){
            return {
               ...state,
               globalVideogames:
                  orderType === "asc"
                  ? orderedVideogames.sort((a, b) => {
                     let nameA = a.name;
                     let nameB = b.name;
                     if(nameA < nameB) return -1;
                     if(nameA > nameB) return 1;
                     return 0
                  })
                  : orderedVideogames.sort((a, b) => {
                     let nameA = a.name;
                     let nameB = b.name;
                     if(nameA < nameB) return 1;
                     if(nameA > nameB) return -1;
                     return 0
                  })
            }
         } else {
            return {
               ...state,
               globalVideogames:
                  orderType === "min"
                  ? orderedVideogames.sort((a, b) => {
                     let ratingA = a.rating;
                     let ratingB = b.rating;
                     if(ratingA < ratingB) return -1;
                     if(ratingA > ratingB) return 1;
                     return 0
                  })
                  : orderedVideogames.sort((a, b) => {
                     let ratingA = a.rating;
                     let ratingB = b.rating;
                     if(ratingA < ratingB) return 1;
                     if(ratingA > ratingB) return -1;
                     return 0
                  })
            }
         }

      case FILTER_ADDED_BY:
         let filteredGames = [...state.copyOfVideogames];
         return {
            ...state,
            globalVideogames:
               action.payload === "API"
               ? filteredGames.filter((game) => game.fromDatabase === false)
               : action.payload === "user" //Ternario anidado
               ? filteredGames.filter((game) => game.fromDatabase === true)
               : state.copyOfVideogames,
            currentFilters: {...state.currentFilters, addedBy: action.payload}
         }

      case FILTER_GENRES:
         let genreFilteredGames = [...state.globalVideogames]
         let selectedGenres = action.payload

         if(selectedGenres.length > 0){
            let matchedGames = selectedGenres.map((selecGenre) => {
               return genreFilteredGames.filter((game) => {
                  return game.genres.some((genre) => genre.name === selecGenre)
               })
            })
            return {
               ...state,
               globalVideogames: matchedGames.flat(), currentFilters: {...state.currentFilters, genres: action.payload}
            }
         } else {
            return {
                  ...state,
                  globalVideogames: [...state.globalVideogames], currentFilters: {...state.currentFilters, genres: []}
               }
            }

      default: return { ...state }
   }
};

export default reducer;

// Antes de despachar un filtro siempre despachamos el filtro anterior para que el estado global esté siempre
// actualizado en base a los filtros que tenia antes.