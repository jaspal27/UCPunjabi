/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import MainNavigation from './src/nav/MainNav';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => MainNavigation);
