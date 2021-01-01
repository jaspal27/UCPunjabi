import 'react-native-gesture-handler';
import React, {createRef, memo, useCallback,useEffect, useRef} from 'react';
import {NavigationContainer, navigationRef, Navigator, ROUTERS, Screen} from "utils/navigation";
import {StackNavigationOptions} from "@react-navigation/stack";
import SplashScreen from 'react-native-splash-screen'
// @ts-ignore

import Walkthroughs from "screens/Walkthroughs";
import Home from "screens/Home";
import Gurmukhi from "screens/Gurmukhi";
import GurmukhiDetails from "screens/Gurmukhi/Details"
import Gurmukhi2ndScreen from "screens/Gurmukhi/Gurmukhi2nd"
import WordFormation from "screens/WordFormation"
import {Platform} from "react-native";
import WordFormationDetails from 'screens/WordFormation/Details';

const optionNavigator: any = {
    headerShown: false,
    gesturesEnabled: false,
};



const MainNavigation = memo(() => {
    useEffect(() => {
        SplashScreen.hide();
    }, []);
    const drawer = useRef();
    const onClose = useCallback(() => {
        // @ts-ignore
        drawer.current?.close();
    }, []);
    const onOpen = useCallback(() => {
        // @ts-ignore
        drawer.current?.open();
    }, []);

    return (

        <NavigationContainer
            // @ts-ignore
            ref={navigationRef}>
            <Navigator
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: false
                }}
                initialRouteName={ROUTERS.Onboarding}>

                <Screen name={ROUTERS.Onboarding} component={Walkthroughs} options={optionNavigator} />
                <Screen name={ROUTERS.Home} component={Home} options={optionNavigator} />
                <Screen name={ROUTERS.Gurmukhi} component={Gurmukhi} options={optionNavigator} />
                <Screen name={ROUTERS.Gurmukhi2ndScreen} component={Gurmukhi2ndScreen} options={optionNavigator} />
                <Screen name={ROUTERS.Details} component={GurmukhiDetails} options={optionNavigator} />
                <Screen name={ROUTERS.WordFormation} component={WordFormation} options={optionNavigator} />
                <Screen name={ROUTERS.WordFormationDetails} component={WordFormationDetails} options={optionNavigator} />
                

            </Navigator>
        </NavigationContainer>


    );
});

export default MainNavigation;
