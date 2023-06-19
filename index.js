/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
//import SplashScreen from 'react-native-splash-screen';

//SplashScreen.show({ image: require('./src/assets/play-button.png') });

AppRegistry.registerComponent(appName, () => App);
