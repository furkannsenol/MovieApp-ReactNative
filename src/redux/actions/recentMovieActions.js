import { RecentMovieApiService } from '../../services/apiServices'
import * as actionTypes from './actionTypes'


export const setRecentPageNumber = (pageNumber) => ({
    type: actionTypes.SET_RECENT_PAGE_NUMBER,
    payload: pageNumber
})

export const getRecentMovieRequest = () => ({
    type: actionTypes.GET_RECENT_MOVIE_REQUEST
})

export const getRecentMovieSuccess = (data) => ({
    type: actionTypes.GET_RECENT_MOVIE_SUCCESS,
    payload: data
})

export const getRecentMovieError = (error) => ({
    type: actionTypes.GET_RECENT_MOVIE_ERROR,
    payload: error
})

export const setRecentMovieClear = (data) => ({
    type: actionTypes.SET_RECENT_MOVIE_CLEAR,
    payload: data
})

export const getRecentMovieAllSuccess = (data) => ({
    type: actionTypes.GET_RECENT_MOVIE_ALL_SUCCESS,
    payload: data
})

export const getRecentMovie = (pageNumber) => {
    return async (dispatch) => {

        dispatch(getRecentMovieRequest())

        try {
            const data = await RecentMovieApiService(pageNumber);
            dispatch(getRecentMovieSuccess(data.results)) 
        }

        catch (error) {
            dispatch(getRecentMovieError(error))
        }
    }
}

export const getRecentMovieAll = (pageNumber) => {
    return async (dispatch) => {

        dispatch(getRecentMovieRequest())

        try {
            const data = await RecentMovieApiService(pageNumber);
            dispatch(getRecentMovieAllSuccess(data.results)) 
        }

        catch (error) {
            dispatch(getRecentMovieError(error))
        }
    }
}