import axios from "axios";
import { GET_ALL_VIDEOGAMES, PAGE_LOADING, NAME_SEARCH } from "./action-types";

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