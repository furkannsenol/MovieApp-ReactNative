import { FavoriteDBService } from '../../services/databaseServices'
import * as actionTypes from './actionTypes'

export const getFavoriteMovieRequest = () => ({
    type: actionTypes.GET_FAVORITE_MOVIE_REQUEST
})

export const getFavoriteMovieSuccess = (data) => ({
    type: actionTypes.GET_FAVORITE_MOVIE_SUCCESS,
    payload: data
})

export const getFavoriteMovieError = (error) => ({
    type: actionTypes.GET_FAVORITE_MOVIE_ERROR,
    payload: error
})

export const setFavoriteMovieClear = () => ({
    type: actionTypes.SET_FAVORITE_MOVIE_CLEAR,
})

export const movieDatabaseChanged = () => ({
    type: actionTypes.DATABASE_CHANGED
})

export const getAllFavoriteMovie = () => {
    return async (dispatch) => {

        dispatch(getFavoriteMovieRequest())

        try {
            const data = await FavoriteDBService.getAllFavorites();
            dispatch(getFavoriteMovieSuccess(data))
        }

        catch (error) {
            dispatch(getFavoriteMovieError(error))
        }
    }
}