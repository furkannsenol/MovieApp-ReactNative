import * as actionTypes from '../actions/actionTypes'

const INITIAL_STATE = {
    themeMode: null,
    isLoading: false,
    error: ''
}

const themeModeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.GET_THEME_LOADING:
            return { ...state, isLoading: true }
        case actionTypes.SET_THEME_MODE:
            return { ...state, themeMode: action.payload, isLoading: false }
        case actionTypes.GET_THEME_ERROR:
            return { ...state, error: action.payload, isLoading: false }
        default:
            return state;
    }
}

export default themeModeReducer