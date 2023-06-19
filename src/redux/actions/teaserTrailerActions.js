import { TeaserTrailerApiService } from '../../services/apiServices'
import * as actionTypes from './actionTypes'


export const getTeaserTrailerRequest = () => ({
    type: actionTypes.GET_TEASER_TRAILER_REQUEST
})

export const getTeaserTrailerSuccess = (data) => ({
    type: actionTypes.GET_TEASER_TRAILER_SUCCESS,
    payload: data
})

export const getTeaserTrailerError = (error) => ({
    type: actionTypes.GET_TEASER_TRAILER_ERROR,
    payload: error
})

export const getTeaserTrailer = (movieId) => {
    return async (dispatch) => {

        dispatch(getTeaserTrailerRequest())

        try {
            const data = await TeaserTrailerApiService(movieId);
            const filteredData = data.results.filter(item => item.type === "Trailer" || item.type === "Teaser");

            dispatch(getTeaserTrailerSuccess(filteredData))
        }

        catch (error) {
            dispatch(getTeaserTrailerError(error))
        }
    }
}