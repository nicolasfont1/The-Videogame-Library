import axios from "axios";
import {
   GET_ALL_VIDEOGAMES, PAGE_LOADING, NAME_SEARCH, 
   GET_API_GENRES, CREATE_GAME, ORDER, FILTER_ADDED_BY,
   FILTER_GENRES, SHOWING_SEARCH, CLEAN_VIDEOGAMES
} from "./action-types";

export const getAllHomepage = () => {
   try {
      const endpoint = 'http://localhost:3001/videogames'
      return async (dispatch) => {
         const hundredVideogames = (await axios.get(endpoint)).data;
         return dispatch({
            type: GET_ALL_VIDEOGAMES,
            payload: hundredVideogames
         })
      }
   } catch (error) {
      window.alert(error.message)
   }
};

export const cleanGlobalVideogames = () => {
   return {
      type: CLEAN_VIDEOGAMES
   }
}

export const pageIsLoading = (bool) => {
   try {
      return (dispatch) => {
         return dispatch({
            type: PAGE_LOADING,
            payload: bool
         })
      }
   } catch (error) {
      window.alert(error.message)
   }
}

export const searchByName = (name) => {
   try {
      const endpoint = `http://localhost:3001/videogames/?name=${name}`
      return async (dispatch) => {
         const fifteenGames = (await axios.get(endpoint)).data;
         return dispatch({
            type: NAME_SEARCH,
            payload: fifteenGames
         })
      }
   } catch (error) {
      window.alert(error.message)
   }
};

export const getApiGenres = () => {
   try {
      const endpoint = `http://localhost:3001/genres`;
      return async (dispatch) => {
         const allApiGenres = (await axios.get(endpoint)).data;
         return dispatch({
            type: GET_API_GENRES,
            payload: allApiGenres
         })
      }
   } catch (error) {
      window.alert(error.message)
   }
};

export const createGame = (gameData) => {
   try {
      const endpoint = 'http://localhost:3001/videogames'
      return async (dispatch) => {
         const lastGameCreated = (await axios.post(endpoint, gameData)).data; // Esto devuelve todas las propiedades del juego.
         return dispatch({
            type: CREATE_GAME,
            payload: lastGameCreated
         })
      }
   } catch (error) {
      window.alert(error.message)
   }
};

export const orderCards = (order) => {
   return {
      type: ORDER,
      payload: order
   }
}

export const filterAddedBy = (addedBy) => {
   return {
      type: FILTER_ADDED_BY,
      payload: addedBy
   }
};

export const filterByGenres = (genresArray) => {
   return {
      type: FILTER_GENRES,
      payload: genresArray
   }
};

export const setShowingSearch = (bool) => {
   return {
      type: SHOWING_SEARCH,
      payload: bool
   }
}