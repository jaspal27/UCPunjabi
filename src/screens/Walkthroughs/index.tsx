import React, {memo, useCallback, useState, useContext} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View, Text, StatusBar,Image} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {useNavigation} from "@react-navigation/native";
import {ROUTERS} from "utils/navigation";
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Button } from 'react-native-elements';
const {width: viewportWidth} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import database from "utils/database"

function wp(percentage: number) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = '100%';
const slideWidth = wp(80);
const itemHorizontalMargin = wp(2);
export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;



const Walkthroughs = memo(() => {
    database.removeLettersDatabase();
    const {navigate} = useNavigation();
    const [indexActive, setIndex] = useState(0);
    
    const onPress = useCallback(()=>{
        navigate(ROUTERS.Home);
    },[])
    const onSkipPress = useCallback(()=>{
        navigate(ROUTERS.Home);
    },[])
    const slides = [
        {
          key: 'k1',
          title: 'How did you hear about this app?',
          text1: 'My School',
          text2: 'My Friends / Family',
          text3: 'The Internet',
          image: {
            uri:
              'https://i.imgur.com/jr6pfzM.png',
          },
          titleStyle: styles.title,
          textStyle: styles.text,
          backgroundColor: '#2f85a4',
        },
        {
          key: 'k2',
          title: 'What is your most recent expereince learning Punjabi?',
          text1: 'I have used another app',
          text2: 'I have taken a class',
          text3: 'Learning on my own',
          titleStyle: styles.title,
          textStyle: styles.text,
         
          backgroundColor: '#2f85a4',
        },
        {
          key: 'k3',
          title: 'Why are you learning Punjabi',
          text1: 'I enjoy learning new language',
          text2: 'To connect with friends / family',
          text3: 'other reasons',
          titleStyle: styles.title,
          textStyle: styles.text,
          
          backgroundColor: '#2f85a4',
        }
        
      ];
      const renderItem = useCallback(({item}) => {
      
        return (
          
            <View style={{
                flex: 1,
                backgroundColor: item.backgroundColor,
                alignItems: 'center',
                justifyContent: 'space-around',
                paddingBottom: 250
              }}>
                
            <View style={styles.buttonContainer}>
           
            <TouchableOpacity  onPress={onSkipPress}>
              <Text style={styles.buttonSkipText}>Skip</Text>
            </TouchableOpacity>
          </View>
            <Text style={styles.title}>{item.title}</Text>
            <Button  titleStyle= {[styles.buttonText]} containerStyle={ styles.buttonOutline } title={item.text1} type="outline"/>
            <Button titleStyle= {[styles.buttonText]} containerStyle={ styles.buttonOutline } title={item.text2} type="outline"/>
            <Button titleStyle= {[styles.buttonText]} containerStyle={ styles.buttonOutline } title={item.text3} type="outline"/>
             
          </View>
        )
    }, []);
    
    return (
        <AppIntroSlider renderItem={renderItem} data={slides} onDone={onPress}  />
    )
});

export default Walkthroughs;

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
      color: 'white',
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

