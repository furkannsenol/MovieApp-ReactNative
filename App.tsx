import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

//import Router from './src/navigation/router';
import { store, persistor } from './src/redux/store/configureStore';
import MainRouter from './src/navigation/mainRouter';

function App(): JSX.Element {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <MainRouter />
      </PersistGate>
    </Provider>
  );
}


export default App;
