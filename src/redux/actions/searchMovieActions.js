import { SearchMovieApiService } from '../../services/apiServices'
import * as actionTypes from './actionTypes'


export const setSearchPageNumber = (pageNumber) => ({
    type: actionTypes.SET_SEARCH_PAGE_NUMBER,
    payload: pageNumber
})

export const getSearchMovieRequest = () => ({
    type: actionTypes.GET_SEARCH_MOVIE_REQUEST
})

export const getSearchMovieSuccess = (data, totalPages, totalResults) => ({
    type: actionTypes.GET_SEARCH_MOVIE_SUCCESS,
    payload: {
        data,
        totalPages,
        totalResults,
    }
})

export const getSearchMovieError = (error) => ({
    type: actionTypes.GET_SEARCH_MOVIE_ERROR,
    payload: error
})

export const setSearchMovieClear = () => ({
    type: actionTypes.SET_SEARCH_MOVIE_CLEAR,
})

export const getSearchMovie = (query, pageNumber) => {
    return async (dispatch) => {

        dispatch(getSearchMovieRequest())

        try {
            const data = await SearchMovieApiService(query, pageNumber);
            const totalPages = data.total_pages
            const totalResults = data.total_results
            //console.log(data)
            dispatch(getSearchMovieSuccess(data.results, totalPages, totalResults))
        }

        catch (error) {
            dispatch(getSearchMovieError(error))
        }
    }
}

