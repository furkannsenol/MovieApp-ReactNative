/**
 * @format
 */

import {AppRegistry, Alert} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import NetInfo from '@react-native-community/netinfo';
//import SplashScreen from 'react-native-splash-screen';

//SplashScreen.show({ image: require('./src/assets/play-button.png') });


AppRegistry.registerComponent(appName, () => App);



// const checkInternetConnection = async () => {
//     try {
//       const response = await NetInfo.fetch();
//       if (response.isConnected) {
//         console.log('Internet bağlantısı mevcut.');
//         AppRegistry.registerComponent(appName, () => App);
//       } else {
//         console.log('Internet bağlantısı yok.');
//         Alert.alert(
//           'Bağlantı Hatası',
//           'Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin.',
//           [
//             {
//               text: 'Kapat',
//               onPress: () => AppRegistry.registerComponent(appName, () => null),
//               style: 'cancel',
//             },
//           ],
//           { cancelable: false }
//         );
//       }
//     } catch (error) {
//       console.error('İnternet bağlantısı kontrol edilemedi:', error);
//       AppRegistry.registerComponent(appName, () => null);
//     }
//   };
  
//   checkInternetConnection();