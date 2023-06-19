import { GET_ALL_VIDEOGAMES, NAME_SEARCH, PAGE_LOADING, GET_API_GENRES, CREATE_GAME, ORDER, FILTER_ADDED_BY } from "./action-types";

const initialState = {
   globalVideogames: [],
   copyOfVideogames: [],
   allApiGenres: [],
   lastGameCreatedUUID: "",
   pageLoading: true,
   currentFilters: {
      addedBy: "def",
      genres: "all"
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
         
         if(action.payload === "def"){
            return {
               ...state,
               globalVideogames: [...state.copyOfVideogames]
            }
         }
         if(action.payload === "asc" || action.payload === "des"){
            return {
               ...state,
               globalVideogames:
                  action.payload === "asc"
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
                  action.payload === "min"
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
               ? (filteredGames.filter((game) => game.fromDatabase === false), console.log("Messi"))
               : (filteredGames.filter((game) => game.fromDatabase === true), state.currentFilters = {...state.currentFilters, addedBy: "user"})
         }

      default: return { ...state }
   }
};

export default reducer;