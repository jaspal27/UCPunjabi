import React, {memo, useCallback, useState, useContext} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View, Text, StatusBar,Image} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {useNavigation} from "@react-navigation/native";
import {ROUTERS} from "utils/navigation";
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors } from 'react-native/Libraries/NewAppScreen';


const {width: viewportWidth} = Dimensions.get('window');


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
          title: 'Ecommerce Leader',
          text: 'Best ecommerce in the world',
          image: {
            uri:
              'https://i.imgur.com/jr6pfzM.png',
          },
          titleStyle: styles.title,
          textStyle: styles.text,
          imageStyle: styles.image,
          backgroundColor: '#20d2bb',
        },
        {
          key: 'k2',
          title: 'fast delivery',
          text: 'get your order insantly fast',
          image: {
            uri:
              'https://i.imgur.com/au4H7Vt.png',
          },
          titleStyle: styles.title,
          textStyle: styles.text,
          imageStyle: styles.image,
          backgroundColor: '#febe29',
        },
        {
          key: 'k3',
          title: 'many store ',
          text: 'Multiple store location',
          image: {
            uri: 'https://i.imgur.com/bXgn893.png',
          },
          titleStyle: styles.title,
          textStyle: styles.text,
          imageStyle: styles.image,
          backgroundColor: '#22bcb5',
        }
        
      ];
      const renderItem = useCallback(({item}) => {
      
        return (
            <View style={{
                flex: 1,
                backgroundColor: item.backgroundColor,
                alignItems: 'center',
                justifyContent: 'space-around',
                paddingBottom: 100
              }}>
                <View style={styles.buttonContainer}>
           
            <TouchableOpacity style={styles.button} onPress={onSkipPress}>
              <Text style={styles.buttonText}>Skip</Text>
            </TouchableOpacity>
          </View>
            <Text style={styles.title}>{item.title}</Text>
            <Image style={styles.image} source={item.image} />
            <Text style={styles.text}>{item.text}</Text>
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
    button: {
      flex: 1,
      paddingVertical: 20,
      borderRadius: 24,
      
    },
    buttonText: {
      color: 'white',
      fontWeight: '800',
      textAlign: 'center',
      
    },
     
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
      },
      image: {
        width: 320,
        height: 320,
        marginVertical: 32,
      },
      text: {
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
      },
      title: {
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
      },
    
    sliderContentContainer: {
        paddingVertical: 10, // for custom animation
    }, 
    containerStyle: {
        padding: 0,
        margin: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
   
 });

