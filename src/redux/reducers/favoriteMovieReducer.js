import * as actionTypes from '../actions/actionTypes'

const INITIAL_STATE = {
    favoriteMovies: [],
    error: null,
    isLoading: false,
    databaseChanged: false,
}

const favoriteMovieReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case actionTypes.GET_FAVORITE_MOVIE_REQUEST:
            return { ...state, isLoading: true, error: null, databaseChanged: false }

        case actionTypes.GET_FAVORITE_MOVIE_SUCCESS:
            return { ...state, favoriteMovies: action.payload, isLoading: false, error: null, databaseChanged: false };

        case actionTypes.GET_FAVORITE_MOVIE_ERROR:
            return { ...state, error: action.payload, isLoading: false }

        case actionTypes.SET_FAVORITE_MOVIE_CLEAR:
            return { ...state, favoriteMovies: [] }

        case actionTypes.DATABASE_CHANGED:
            return { ...state, databaseChanged: true };
        default:
            return state;
    }
}

export default favoriteMovieReducer