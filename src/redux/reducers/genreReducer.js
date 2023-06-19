import * as actionTypes from '../actions/actionTypes'

const INITIAL_STATE = {
    genres: [],
    genresName: [],
    error: null,
    isLoading: false,
}

const genreReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case actionTypes.GET_GENRE_REQUEST:
            return { ...state, isLoading: true, error: null }

        case actionTypes.GET_GENRE_SUCCESS:
            return { ...state, genres: action.payload, isLoading: false, error: null };

        case actionTypes.GET_GENRE_ERROR:
            return { ...state, error: action.payload, isLoading: false }

        case actionTypes.SET_GENRE_NAME:
            return { ...state, genresName: [...state.genresName,...action.payload] }

        default:
            return state;
    }
}

export default genreReducer