/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { Fragment, useCallback, useEffect, useRef } from 'react';
import {

  StyleSheet,

  View,
  Text,
  TouchableOpacity,

  StatusBar,
  Platform,

} from 'react-native';

import { Button, Image, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import database from "utils/database";

import { useNavigation } from "@react-navigation/native";
import { ROUTERS } from "utils/navigation";

import {Player} from '@react-native-community/audio-toolkit';
import{SOUNDMODIFIERS} from 'utils/smImagesRequires';
const text1 = "Tap audio icon to listen."
var isIos = false;
let headerMarginTop = 0;
let gridViewTop = 0;

if (Platform.OS == 'ios') {
  isIos = true;
  headerMarginTop = 23;
  gridViewTop = 10;
}

const WordFormationDetails = ({ route }) => {
  let smId = 0
  let itemParams: any;

  //console.log('WordFormationDetails: route =', route);

  if (route.params) {
    itemParams = route.params
    smId = itemParams.id - 1
  }

  //console.log('WordFormationDetails: itemParams =', itemParams);

  let [cardItem, setCardItem] = React.useState(itemParams)

  // read data from local cache 
  let soundModifiersData: [] = database.getSoundModifiersData()

  // figure out the offset for displaying current letter's entire row
  //let offset = Math.floor(smId / 5) * 5
  let tempArray = soundModifiersData.slice()
 //let [soundModifiers, setSoundModifiers] = React.useState(tempArray)

  const { navigate } = useNavigation();

  const onSkipPress = useCallback(() => {
    navigate(ROUTERS.WordFormation);
  }, []);
const audioPlay =(item: any)=>{
 
  let player = new Player(item.audioId + ".mp3");
  player.play().on('ended', () => {
    //console.log('audio played');
  })
}
 

  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}

      <View style={{ flexDirection: 'row', backgroundColor: "#2f85a4", paddingTop: 30 }}>
        <TouchableOpacity>
          <Button onPress={onSkipPress} style={styles.buttonSkipText} type="clear"
            icon={
              <Icon
                name="arrow-back"
                size={30}
                color="black"
              />
            }>
          </Button>
        </TouchableOpacity>
        
      </View >

      <View style={{
        flex: 1,
        backgroundColor: "#2f85a4",
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 160
      }}>

        <Text style={{ fontSize: 32}}>{cardItem.pname}</Text>
        <Text></Text>
        <Text style={{ fontSize: 20}}>{cardItem.sound}{cardItem.phrase}</Text>

        <Card containerStyle={{ borderRadius: 10, height: 230, width: 230, marginRight: 1, marginLeft: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
          <Image style={{width: 150, height: 150}} source={SOUNDMODIFIERS[cardItem.name]}/>
          <TouchableOpacity  >
            <Button type="clear" onPress={() => audioPlay(cardItem)}
              icon={
                <Icon name="volume-medium-outline"  size={32}></Icon>
              }
            />
          </TouchableOpacity>
        </Card>
        <Text style={styles.actionText}>{text1}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 100,
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center'
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
    paddingTop: 20,
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
    borderWidth: 1
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
  actionText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
});

export default WordFormationDetails;