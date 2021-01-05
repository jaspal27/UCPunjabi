/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import { Button, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { FlatGrid } from 'react-native-super-grid';
import { EventRegister } from 'react-native-event-listeners'
import database from "utils/database";
import { useNavigation } from "@react-navigation/native";
import { ROUTERS } from "utils/navigation";
import { Player } from '@react-native-community/audio-toolkit';
import LinearGradient from 'react-native-linear-gradient';
import { IMAGESSOLID, IMAGESOUTLINE } from 'utils/imagesRequiers';


var isIos = false;
let topBarBackButton = 30;
if (Platform.OS == 'ios') {
  isIos = true;
  topBarBackButton = 10;
}

const Gurmukhi2ndScreen = ({ route }) => {
  let letterId = 0
  let itemParams: any;

  if (route.params) {
    itemParams = route.params
    letterId = itemParams.id - 1
  }

  let [cardItem, setCardItem] = React.useState(itemParams)
  
  // read letters data from local cache 
  let lettersData: [] = database.getLettersData()

  // figure out the offset for displaying current letter's entire row
  let offset = Math.floor(letterId / 5) * 5
  let tempArray = lettersData.slice(offset, offset + 5)
  let [letters, setLetters] = React.useState(tempArray)

  const { navigate } = useNavigation();

  const onPrevScreen = useCallback(() => {
    navigate(ROUTERS.Gurmukhi);
  }, []);

  const onNextLetterPress = useCallback((item: any) => {

    //console.log('onNextLetterPress item.id=', item.id)
    let tempItems: any = letters.slice()
    //console.log('onNextLetterPress tempItems=', tempItems)
    let index = item.id   //use item.id as index for managing letter states
  }, []);

  const onLetterPress = (item: any) => {
    //console.log('onLetterPress item.id=', item.id)
    if (item.status){
      setCardItem(item)
    }

    //setCardItem(item);
  }

  // the next line was 'const onAudioPlay = useCallback(() =>' before
  const onAudioPlay = (item: any) => {
    let tempItems: any = letters.slice()
    let index = item.id   //use item.id as index for managing letter states 

    // Reset index if it is the last letter in the script
    if (index == 41) {
      index = 40
    }
    //else if (index  == 40) {
    //  tempItems = lettersData.slice(index-5, index+1)
    //}
    else if ((index % 5) == 0) {
      // We are at the end of a row and next row needs to be loaded
      tempItems = lettersData.slice(index, index + 5)
    }

    // Make the next letter active
    lettersData[index].['status'] = true
    setLetters(tempItems)

    EventRegister.emit('myCustomEvent', index)


    try {
      // play audio for the given letter
      let player = new Player(item.audioId + ".mp3");
      player.play().on('ended', () => {
        //console.log('audio played');
      })
    } catch (e) {
      console.log(`unable to play audio`, e)
    }
  }

  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      <View style={{ flexDirection: 'row', backgroundColor: "#009DC2", paddingTop: topBarBackButton }}>
        <TouchableOpacity>
          <Button onPress={onPrevScreen} style={styles.buttonSkipText} type="clear"
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

        {/* Nirvair: Hiding this button for now
        <Button onPress={onSkipPress} style={styles.buttonSkipText} type="clear"
          icon={
            <Icon
              name="bug"
              size={30}
              color="black"
            />
          }>
        </Button>
        */}
      </View >

      <View style={{
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 50
      }}>

        <LinearGradient
          colors={['#009DC2', '#FFFFFF', '#FFFFFF', '#FFFFFF']}
          style={styles.linearGradient}
        >

          <View></View>
          <Text style={styles.title}>Row {cardItem.rowNum}</Text>

          <Card containerStyle={{ borderRadius: 10, height: 230, width: 230, marginRight: 1, marginLeft: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
            <Image style={{ width: 160, height: 160 }} source={IMAGESSOLID[cardItem.name]} />

            <TouchableOpacity  >
              <Button type="clear" onPress={() => onAudioPlay(cardItem)}
                // title={itemParams.description} this is no longer  in use
                icon={
                  <Icon name="volume-medium-outline" size={32}></Icon>
                }
                iconRight
              />
            </TouchableOpacity>
          </Card>
          <Text />
          <Text style={styles.actionText}>Press the speaker icon to unlock the next letter.</Text>

          <FlatGrid
            itemDimension={60}
            data={letters}
            style={styles.gridView}
            renderItem={({ item }) => (
              <View style={[styles.itemContainer]}>
                <TouchableOpacity onPress={() => onLetterPress(item)} >
             
                  {
                    item.status ?
                      <Image style={{ width: 50, height: 50 }} source={IMAGESSOLID[item.name]} />
                      : <Image style={{ width: 50, height: 50 }} source={IMAGESOUTLINE[item.name]} />
                  }
                </TouchableOpacity>
                  
              </View>
            )}
          />
        </LinearGradient>
        {/*
        <View>
          <Button type="outline" titleStyle={[styles.buttonText]} containerStyle={styles.buttonOutline} title="Next Letter >>"  onPress={() => onNextLetterPress(cardItem)} />
        </View>
        */}
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
    borderWidth: 1,
    paddingBottom: 0
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
    fontSize: 36,
    color: 'black',
    textAlign: 'center',
    paddingTop: 30,
    paddingBottom: 30
  },
  actionText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  blurry: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});

export default Gurmukhi2ndScreen;