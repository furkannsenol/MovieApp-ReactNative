import * as actionTypes from './actionTypes'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setThemeMode = (themeMode) => ({
  type: actionTypes.SET_THEME_MODE,
  payload: themeMode
})

export const getThemeLoading = () => ({
  type: actionTypes.GET_THEME_LOADING,
  //payload: isLoading,
});

export const getThemeError = (error) => ({
  type: actionTypes.GET_THEME_ERROR,
  payload: error,
});

export const getThemeMode = (theme) => async (dispatch) => {
  dispatch(getThemeLoading());
  try {

    await AsyncStorage.setItem('themeMode', theme);

    dispatch(setThemeMode(theme));
  } catch (error) {
    dispatch(getThemeError(error.message));
  }
};