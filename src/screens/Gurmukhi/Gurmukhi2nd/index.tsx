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
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Platform,

} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Button, colors, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { Container, Header, Content, Body, Left, Right, Title, List, ListItem } from 'native-base';
import { FlatGrid } from 'react-native-super-grid';
import { EventRegister } from 'react-native-event-listeners'
import database from "utils/database";
import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { useNavigation } from "@react-navigation/native";
import { ROUTERS } from "utils/navigation";
import CustomIcon from 'utils/CustomIcon'
import AndroidCustomIcon from 'utils/androidCustomIcon';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Player,
  Recorder,
  MediaStates
} from '@react-native-community/audio-toolkit';

declare const global: { HermesInternal: null | {} };
var isIos = false;

if (Platform.OS == 'ios') {
  isIos = true;
}
declare const NumLetters = 41;  // This is the number of letters in the script

const Gurmukhi2ndScreen = ({route}) => {
  let letterId = 0
  let itemParams: any;

  if (route.params) {
    itemParams = route.params
    letterId = itemParams.id - 1
  }

  // set row number;  it  is used in screen title in View
  let rowNum = itemParams.rowNum

  // read letters data from local cache 
  let lettersData: [] = database.getLettersData()

  // figure out the offset for displaying current letter's entire row
  let offset = Math.floor(letterId / 5) * 5
  let tempArray = lettersData.slice(offset, offset + 5)
  let [letters, setLetters] = React.useState(tempArray)

  const { navigate } = useNavigation();

  const onNextScreen = useCallback(() => {
    navigate(ROUTERS.Gurmukhi);
  }, []);

  const onSkipPress = useCallback(() => {
    navigate(ROUTERS.Gurmukhi);
  }, []);

  const onPress = useCallback(() => {
    //navigate(ROUTERS.Details);
  }, []);

  const onAudioPlay = useCallback(() => {
    let tempItems: any = letters.slice()
    let index = itemParams.id   //use itemParams.id as index for managing letter states 

    // Reset index if it is the last letter in the script
    if (index == 41) {
      index = 40
    }

    // Make the next letter active
    lettersData[index].['status'] = true

    setLetters(tempItems)

    EventRegister.emit('myCustomEvent', index)

    try {
      // play audio for the given letter
      let player = new Player(itemParams.audioId + ".mp3");
      player.play().on('ended', () => {
        console.log('ended');
      })
    } catch (e) {
      console.log(`cannot play the sound file`, e)
    }
    //SoundPlayer.playUrl('audio/letters/l01.mp3')
    // audio.playAudioLetters('l01')
  }, [])


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

        <Text style={{ flex: 1, fontSize: 16, lineHeight: 30, color: '#1D2359', textAlign: 'right' }}></Text>
        <Button onPress={onSkipPress} style={styles.buttonSkipText} type="clear"
          icon={
            <Icon
              name="bug"
              size={30}
              color="black"
            />
          }>
        </Button>
      </View >

      <View style={{
        flex: 1,
        backgroundColor: "#2f85a4",
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 250
      }}>

        <View ></View>

        <Text style={styles.title}>Row {rowNum}</Text>
        <Card containerStyle={{ borderRadius: 10, height: 230, width: 230, marginRight: 1, marginLeft: 1, }}>
          <TouchableOpacity onPress={onPress}>
            <Button type="clear"
              icon={
                isIos ?
                  <CustomIcon name={itemParams.name} size={150}></CustomIcon>
                  : <AndroidCustomIcon name={itemParams.name} size={150}></AndroidCustomIcon>
              }
            />
          </TouchableOpacity>

          <TouchableOpacity  >
            <Button type="clear" onPress={onAudioPlay}
              // title={itemParams.description} this is no longer  in use
              icon={
                <Icon name="volume-medium-outline" style={{ marginLeft: 20 }} size={20}></Icon>
              }
              iconRight
            />
          </TouchableOpacity>
        </Card>
        <FlatGrid
          itemDimension={60}
          data={letters}
          style={styles.gridView}
          renderItem={({ item }) => (
            <View style={[styles.itemContainer]}>

              <TouchableOpacity onPress={onPress}>
                <Button type="clear" disabledStyle={{ backgroundColor: colors.grey0 }} disabled={item.status}
                  icon={
                    isIos ?
                      <CustomIcon name={item.name} size={32}></CustomIcon>
                      : <AndroidCustomIcon name={item.name} size={32}></AndroidCustomIcon>
                  }
                />
              </TouchableOpacity>
            </View>
          )}
        />
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
});

export default Gurmukhi2ndScreen;
