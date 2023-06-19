import { PopularMovieApiService } from '../../services/apiServices'
import * as actionTypes from './actionTypes'


export const setPopularPageNumber = (pageNumber) => ({
    type: actionTypes.SET_POPULAR_PAGE_NUMBER,
    payload: pageNumber
})

export const getPopularMovieRequest = () => ({
    type: actionTypes.GET_POPULAR_MOVIE_REQUEST
})

export const getPopularMovieSuccess = (data) => ({
    type: actionTypes.GET_POPULAR_MOVIE_SUCCESS,
    payload: data
})

export const getPopularMovieError = (error) => ({
    type: actionTypes.GET_POPULAR_MOVIE_ERROR,
    payload: error
})

export const setPopularMovieClear = (data) => ({
    type: actionTypes.SET_POPULAR_MOVIE_CLEAR,
    payload: data
})

export const getPopularMovieAllSuccess = (data) => ({
    type: actionTypes.GET_POPULAR_MOVIE_ALL_SUCCESS,
    payload: data
})

export const getPopularMovie = (pageNumber) => {
    return async (dispatch) => {

        dispatch(getPopularMovieRequest())

        try {
            const data = await PopularMovieApiService(pageNumber);
            dispatch(getPopularMovieSuccess(data.results))
        }

        catch (error) {
            dispatch(getPopularMovieError(error))
        }
    }
}

export const getPopularMovieAll = (pageNumber) => {
    return async (dispatch) => {

        dispatch(getPopularMovieRequest())

        try {
            const data = await PopularMovieApiService(pageNumber);
            dispatch(getPopularMovieAllSuccess(data.results))
        }

        catch (error) {
            dispatch(getPopularMovieError(error))
        }
    }
}