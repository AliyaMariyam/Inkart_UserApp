/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/Screens/App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
navigator.geolocation = require('@react-native-community/geolocation');


AppRegistry.registerComponent(appName, () => App);
