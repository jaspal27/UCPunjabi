/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {Fragment, useCallback,useEffect, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Platform
} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from "@react-navigation/native";
import {ROUTERS} from "utils/navigation";


const Home = () => {
    const {navigate} = useNavigation();
    const onNextScreen = useCallback(()=>{
        navigate(ROUTERS.Gurumukhi);
    },[]);
    const onSkipPress = useCallback(()=>{
      navigate(ROUTERS.Home);
  },[]);
  const item = 
    {
      title: 'Welcome to UC Punjabi',
      text1: 'Gurmukhi Script',
      text2: 'Word Formation',
      text3: 'Modules',
      text4: 'Numbers',
      text5: 'Settings',
      backgroundColor: '#2f85a4',
    }
  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
     
      <View style={{
                flex: 1,
                backgroundColor: item.backgroundColor,
                alignItems: 'center',
                justifyContent: 'space-around',
                paddingBottom: 250
              }}>
                
            <View style={styles.buttonContainer}>
           <TouchableOpacity  onPress={onSkipPress}>
              <Button style={styles.buttonSkipText} type="clear"
              icon={
              <Icon
                name="bug"
                size={30}
                color="black"
              />
            }>
              </Button>
            </TouchableOpacity>
          </View>
            <Text style={styles.title}>{item.title}</Text>
            <Button  titleStyle= {[styles.buttonText]} containerStyle={ styles.buttonOutline } title={item.text1} type="outline" onPress ={onNextScreen} />
            <Button titleStyle= {[styles.buttonText]} containerStyle={ styles.buttonOutline } title={item.text2} type="outline"/>
            <Button titleStyle= {[styles.buttonText]} containerStyle={ styles.buttonOutline } title={item.text3} type="outline"/>
            <Button titleStyle= {[styles.buttonText]} containerStyle={ styles.buttonOutline } title={item.text4} type="clear"/>
            <Button
            icon={
              <Icon
                name="settings"
                size={20}
                color="black"
              />
            }
            titleStyle= {[styles.buttonIconText]}  title={item.text5} type="clear"/>
          </View>
          
        
      
    </>
  );
};

const styles = StyleSheet.create({
  MainContainer: { 
   flex: 1, 
   paddingTop: 20, 
   alignItems: 'center', 
   justifyContent: 'center', 
   padding: 20 
  }, 
  buttonContainer: {
    flexDirection: 'row',
    width:100,
    alignSelf: 'flex-end',
  },
  buttonSkipText: {
    paddingTop:20,
    color: 'black',
    fontWeight: '500',
    fontSize:16,
    textAlign: 'center',
  },
  buttonText: {
    width:300,
    color: 'black',
    fontWeight: '400',
    textAlign: 'center',
  },
  buttonIconText: {
    width:90,
    color: 'black',
    fontWeight: '400',
    textAlign: 'center',
  },
  buttonOutline:{
    borderColor: 'black',
    borderWidth:1
  },
   
  slide: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'blue',
    },
   
    text: {
      color: 'rgba(255, 255, 255, 0.8)',
      textAlign: 'center',
    },
    title: {
      fontSize: 30,
      color: 'black',
      textAlign: 'center',
    },
});

export default Home;
