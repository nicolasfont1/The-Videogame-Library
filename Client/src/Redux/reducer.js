import { GET_ALL_VIDEOGAMES, NAME_SEARCH, PAGE_LOADING } from "./action-types";

const initialState = {
    globalVideogames: [],
    pageLoading: true
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_VIDEOGAMES:
            return {
                ...state,
                globalVideogames: action.payload
            }
        
        case PAGE_LOADING:
            return {
                ...state,
                pageLoading: action.payload
            }

        case NAME_SEARCH:
            return {
                ...state,
                globalVideogames: action.payload
            }

        default: return {...state}
    }
};

export default reducer;