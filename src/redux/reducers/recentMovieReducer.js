import * as actionTypes from '../actions/actionTypes'

const INITIAL_STATE = {
    recentMovies: [],
    error: null,
    isLoading: false,
    pageNumber: 1,
    recentMoviesAll:[]
}

const recentMovieReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case actionTypes.GET_RECENT_MOVIE_REQUEST:
            return { ...state, isLoading: true, error: null }

        case actionTypes.GET_RECENT_MOVIE_SUCCESS:
            return { ...state, recentMovies: action.payload, isLoading: false, error: null };

        case actionTypes.GET_RECENT_MOVIE_ERROR:
            return { ...state, error: action.payload, isLoading: false }

        case actionTypes.SET_RECENT_PAGE_NUMBER:
            return { ...state, pageNumber: action.payload, }
            
        case actionTypes.SET_RECENT_MOVIE_CLEAR:
            return { ...state, recentMoviesAll: action.payload }

        case actionTypes.GET_RECENT_MOVIE_ALL_SUCCESS:
            return { ...state, recentMoviesAll: [...state.recentMoviesAll, ...action.payload], isLoading: false, error: null };

        default:
            return state;
    }
}

export default recentMovieReducer