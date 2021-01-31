import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();
const Navigator = Stack.Navigator;
const Screen = Stack.Screen;

const ROUTERS = {
    Onboarding: 'Onboarding',
    Home: 'Home',
    Gurmukhi: 'Gurmukhi',
    Gurmukhi2ndScreen:'Gurmukhi2ndScreen',
    Details: 'Details',
    WordFormation:'WordFormation',
    WordFormationDetails:'WordFormationDetails',
    ReportIssue: 'Report',
    Vocabulary: 'Vocabulary',
    VocabularyModules: 'VocabularyModules',
    VocabularyDetails: 'VocabularyDetails',
};

export {Stack, NavigationContainer, Navigator, Screen, ROUTERS};

export const navigationRef = React.createRef();

export function navigate(name: string, params?: any) {
    // @ts-ignore
    navigationRef?.current?.navigate(name, params);
}
export function navigateModal(name:string,params?:any){
    
}
