import { GenreApiService } from '../../services/apiServices'
import * as actionTypes from './actionTypes'


export const setGenreName = (genreName) => ({
    type: actionTypes.SET_GENRE_NAME,
    payload: genreName
})

export const getGenreRequest = () => ({
    type: actionTypes.GET_GENRE_REQUEST
})

export const getGenreSuccess = (data) => ({
    type: actionTypes.GET_GENRE_SUCCESS,
    payload: data
})

export const getGenreError = (error) => ({
    type: actionTypes.GET_GENRE_ERROR,
    payload: error
})

export const getGenre = () => {
    return async (dispatch) => {

        dispatch(getGenreRequest())

        try {
            const data = await GenreApiService();
            dispatch(getGenreSuccess(data.genres))
        }

        catch (error) {
            dispatch(getGenreError(error))
        }
    }
}