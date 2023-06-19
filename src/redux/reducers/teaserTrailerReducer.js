import * as actionTypes from '../actions/actionTypes'

const INITIAL_STATE = {
    teaserTrailers: [],
    error: null,
    isLoading: false,
}

const teaserTrailerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case actionTypes.GET_TEASER_TRAILER_REQUEST:
            return { ...state, isLoading: true, error: null }

        case actionTypes.GET_TEASER_TRAILER_SUCCESS:
            return { ...state, teaserTrailers: action.payload, isLoading: false, error: null };

        case actionTypes.GET_TEASER_TRAILER_ERROR:
            return { ...state, error: action.payload, isLoading: false }

        default:
            return state;
    }
}

export default teaserTrailerReducer