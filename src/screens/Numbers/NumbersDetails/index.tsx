/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { Fragment, useCallback, useEffect, useRef, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform
} from 'react-native';
import { Button, Image, Card, colors } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { EventRegister } from 'react-native-event-listeners'
import { useNavigation } from "@react-navigation/native";
import { ROUTERS } from "utils/navigation";
import { Player } from '@react-native-community/audio-toolkit';
import database from "utils/database";
import LinearGradient from 'react-native-linear-gradient'
import { FlatGrid } from 'react-native-super-grid';
import { IMAGES } from 'utils/imagesRequiers';

var isIos = false;
var isIos = false;
let topBarBackButton = 20;
if (Platform.OS == 'ios') {
  isIos = true;
  topBarBackButton = 20;
}

let headerMarginTop = 0;
let gridViewTop = 0;
if (Platform.OS == 'ios') {
  isIos = true;
  headerMarginTop = 23;
  gridViewTop = 10;
}

let isCardFlipped = false      // global flag to keep track of card state
let player = new Player("")  // single global Player instance; used for avoiding creation of orphaned player

const NumbersDetails = ({ route }) => {

  //console.log('Line 46 NumbersGroup() : route =', route)
  let itemParams: any;
  let useSmallText = false;

  if (route.params) {
    itemParams = route.params['gurmukhi']
  } else {
    console.log('there are no route.params');
    return
  }

  if (itemParams == '੧੦੧ +') {
    useSmallText = true
  }

  // read letters data from local cache 
  let numbersData: [] = database.getNumbersData()
  numbersData = numbersData[itemParams]
  let firstItem = numbersData[0]
  let [cardItem, setCardItem] = React.useState(firstItem)
  let [numberText, updateCardText] = React.useState(cardItem.punjabi)
  let [number, updateNumber] = React.useState(cardItem.numberGurmukhi)

  const { navigate } = useNavigation();

  const onPrevScreen = useCallback(() => {
    navigate(ROUTERS.Numbers);
  }, []);

  // What is this for?
  /*
  useEffect(() => {
    myFunction();
    return () => {
      setCardItem({}); // This worked for me
    };
  }, []);
  

  // What is this for?
  const myFunction = () => {
    //setCardItem(tempArray)
  }
  */

  const onNumberPress = (item) => {
    //console.log('onLetterPress item.id=', item)
    
    setCardItem(item)
    
    if (isCardFlipped) {
      updateCardText(item.english)
      updateNumber(item.numberArabic)
    }
    else {
      updateCardText(item.punjabi)
      updateNumber(item.numberGurmukhi)
    }
    
  }

  // the next line was 'const onAudioPlay = useCallback(() =>' before
  const onAudioPlay = (item: any) => {
    // console.log('Line 111 audio play called', item);

    try {
      // play audio for the given letter
      player = new Player(item.audioId + ".mp3");
      player.play().on('ended', () => {
        //console.log('Line 124 audio played');
      })
    } catch (e) {
      console.log(`Line 127 unable to play audio`, e)
    }
  }

  // Callback for flipping the word card
  const flipCard = (item: any) => {

    //console.log('Line 134 flipCard item=', item);

    player.destroy()                // stop audio in case it is looping
    //updateSpeedText(playBackText)  // reset plaback speed text

    if (isCardFlipped) {
      isCardFlipped = false
      updateCardText(item.punjabi)
      updateNumber(item.numberGurmukhi)
    }
    else {
      isCardFlipped = true
      updateCardText(item.english)
      updateNumber(item.numberArabic)
    }
  }

  return (

    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      <View style={{ flexDirection: 'row', backgroundColor: "#009DC2", paddingTop: topBarBackButton }}>
        <TouchableOpacity>
          <Button onPress={onPrevScreen} style={styles.buttonSkipText} type="clear"
            icon={   <Icon name="arrow-back" size={30} color="black" />  }>
          </Button>
        </TouchableOpacity>
        <Text style={{ flex: 1, fontSize: 16, lineHeight: 30, color: '#1D2359', textAlign: 'right' }}></Text>
        {/* Nirvair: Hiding this button for now
        <Button onPress={onSkipPress} style={styles.buttonSkipText} type="clear"
          icon={  <Icon  name="bug"  size={30}  color="black"/>  }>
        </Button>
        */}
      </View >

      <View style={{
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 40
      }}>

        <LinearGradient
          colors={['#009DC2', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']}
          style={styles.linearGradient} >

          <View></View>
          <Text style={styles.title}>{itemParams}</Text>

          <Card containerStyle={{ borderRadius: 10, height: 280, width: 300, marginRight: 1, marginLeft: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{  flex: 0,  flexDirection: 'row',  marginTop: 10,  justifyContent: 'space-around',  width: 340}} >
              {/* spacers */}
              <Text /><Text /><Text />
              <Button type="clear" onPress={() => flipCard(cardItem)}
                icon={<Image source={IMAGES['FlipCard']} style={styles.topButtonsStyle} />}
              />
            </View>

            {
              useSmallText ?
                <Text style={styles.cardTextSmall}>{number}</Text>
                : <Text style={styles.cardText}>{number}</Text>
            }
            <Text style={styles.cardTextSmaller}>{numberText}</Text>

            <TouchableOpacity  >
              <Button type="clear" onPress={() => onAudioPlay(cardItem)}
                icon={<Icon name="volume-medium-outline" size={32}></Icon>} />
            </TouchableOpacity>
          </Card>


          {/* spacer */}
          <Text />

          <FlatGrid
            itemDimension={92}
            data={numbersData}
            style={styles.gridView}
            renderItem={({ item }) => (
              <View style={[styles.itemContainer]}>
                <TouchableOpacity onPress={() => onNumberPress(item)} >
                  {
                    useSmallText ?
                      <Text style={styles.gridTextSmall} >{item.numberGurmukhi}</Text>
                      : <Text style={styles.gridText} >{item.numberGurmukhi}</Text>
                  }
                </TouchableOpacity>
              </View>
            )}
          />
        </LinearGradient>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  gridView: {
    marginTop: 0,
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 4,
    height: 60,
    alignItems: 'center'
  },
  button: {
    borderColor: '#A8A8A8',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    width: 200,
    padding: 4,
    margin: 5
  },
  buttonContainer: {
    flexDirection: 'row',
    width: 100,
    alignSelf: 'flex-end',
  },
  buttonContainerStart: {
    flexDirection: 'row',
    width: 100,
    alignSelf: 'flex-start',
  },
  buttonSkipText: {
    paddingTop: 10,
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
  },
  buttonText: {
    width: 300,
    color: 'black',
    fontWeight: '400',
    textAlign: 'center',
  },
  buttonIconText: {
    width: 90,
    color: 'black',
    fontWeight: '400',
    textAlign: 'center',
  },
  buttonOutline: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
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
    fontSize: 40,
    color: 'black',
    textAlign: 'center',
    marginTop: -20
  },
  cardText: {
    fontSize: 80,
    color: 'black',
    textAlign: 'center',
  },
  cardTextSmall: {
    fontSize: 44,
    color: 'black',
    textAlign: 'center',
  },
  cardTextSmaller: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    paddingBottom: 10
  },
  gridText: {
    fontSize: 32,
    color: 'black',
    textAlign: 'center',
  },
  gridTextSmall: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  topButtonsStyle: {
    height: 32,
    width: 32,
    resizeMode: 'stretch',
    //alignContent: 'left',
  },
});

export default NumbersDetails;