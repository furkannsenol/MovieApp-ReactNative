import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import popularMovieReducer from '../reducers/popularMovieReducer';
import recentMovieReducer from '../reducers/recentMovieReducer';
import genreReducer from '../reducers/genreReducer';
import teaserTrailerReducer from '../reducers/teaserTrailerReducer';
import themeModeReducer from '../reducers/themeModeReducer';
import searchMovieReducer from '../reducers/searchMovieReducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['themeModeReducer'],
}


const rootReducer = combineReducers({
    popularMovieReducer,
    recentMovieReducer,
    genreReducer,
    teaserTrailerReducer,
    searchMovieReducer,
    themeModeReducer,
})

//const store = createStore(rootReducer, applyMiddleware(thunk))

// const store = configureStore({
//     reducer: rootReducer,
//     middleware: [thunkMiddleware]
// })

//Redux start control
//const handleChange = () => {
//    console.log('Store created:', store.getState());
//};

const persistedReducer = persistReducer(persistConfig, rootReducer);

//const store = createStore(persistedReducer, applyMiddleware(thunk));
const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunkMiddleware]
})

const persistor = persistStore(store);

//handleChange();

export { store, persistor }