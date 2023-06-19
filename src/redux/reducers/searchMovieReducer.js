import * as actionTypes from '../actions/actionTypes'

const INITIAL_STATE = {
    searchMovies: [],
    totalPages: 0,
    totalResults: 0,
    error: null,
    isLoading: false,
    pageNumber: 1,
}

const searchMovieReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case actionTypes.GET_SEARCH_MOVIE_REQUEST:
            return { ...state, isLoading: true, error: null }

        case actionTypes.GET_SEARCH_MOVIE_SUCCESS:
            return { ...state, searchMovies: [...state.searchMovies, ...action.payload.data], totalPages: action.payload.totalPages, totalResults: action.payload.totalResults, isLoading: false, error: null };

        case actionTypes.GET_SEARCH_MOVIE_ERROR:
            return { ...state, error: action.payload, isLoading: false }

        case actionTypes.SET_SEARCH_PAGE_NUMBER:
            return { ...state, pageNumber: action.payload, }

        case actionTypes.SET_SEARCH_MOVIE_CLEAR:
            return { ...state, searchMovies: [], totalPages: 0, totalResults: 0 }

        default:
            return state;
    }
}

export default searchMovieReducer