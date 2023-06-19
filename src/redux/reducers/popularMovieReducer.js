import * as actionTypes from '../actions/actionTypes'

const INITIAL_STATE = {
    popularMovies: [],
    error: null,
    isLoading: false,
    pageNumber: 1,
    popularMoviesAll: [],
}

const popularMovieReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case actionTypes.GET_POPULAR_MOVIE_REQUEST:
            return { ...state, isLoading: true, error: null }

        case actionTypes.GET_POPULAR_MOVIE_SUCCESS:
            return { ...state, popularMovies: action.payload, isLoading: false, error: null };

        case actionTypes.GET_POPULAR_MOVIE_ERROR:
            return { ...state, error: action.payload, isLoading: false }

        case actionTypes.SET_POPULAR_PAGE_NUMBER:
            return { ...state, pageNumber: action.payload, }

        case actionTypes.SET_POPULAR_MOVIE_CLEAR:
            return { ...state, popularMoviesAll: action.payload }

        case actionTypes.GET_POPULAR_MOVIE_ALL_SUCCESS:
            return { ...state, popularMoviesAll: [...state.popularMoviesAll, ...action.payload], isLoading: false, error: null };

        default:
            return state;
    }
}

export default popularMovieReducer