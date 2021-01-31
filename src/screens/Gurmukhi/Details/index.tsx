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
  StatusBar,
  Platform
} from 'react-native';
import { Button, colors, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { Container, Header, Content, Body, Left, Right, Title, List, ListItem } from 'native-base';
import { FlatGrid } from 'react-native-super-grid';

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
const GurumukhiDetails = () => {
  const { navigate } = useNavigation();
  const onNextScreen = useCallback(() => {
    navigate(ROUTERS.Gurumukhi2ndScreen);
  }, []);
  const onSkipPress = useCallback(() => {
    navigate(ROUTERS.Gurumukhi2ndScreen);
  }, []);
  const onPress = useCallback(() => {
    navigate(ROUTERS.Gurumukhi2ndScreen);
  }, []);
  const onAudioPlay = useCallback(() => {
    //  let audio = new Audio()

    try {
      // play the file tone.mp3
      let player = new Player("l01.mp3");
      player.play().on('ended', () => {
        console.log('ended');
      })
      //SoundPlayer.playSoundFile('tone', 'mp3')

    } catch (e) {
      console.log(`cannot play the sound file`, e)
    }
    //SoundPlayer.playUrl('audio/letters/l01.mp3')
    // audio.playAudioLetters('l01')
  }, [])

  const [items, setItems] = React.useState([
    { id: 1, name: 'uni0A09', code: '#f4f5f5', status: true, audioId: 'l01' },
    { id: 2, name: 'uni0A05', code: '#f4f5f5', status: false },
    { id: 3, name: 'uni0A07', code: '#f4f5f5', status: false },
    { id: 4, name: 'uni0A38', code: '#f4f5f5', status: false },
    { id: 5, name: 'uni0A39', code: '#f4f5f5', status: false },
    { id: 6, name: 'uni0A15', code: '#f4f5f5', status: false },
    { id: 7, name: 'uni0A16', code: '#f4f5f5', status: false },
    { id: 8, name: 'uni0A17', code: '#f4f5f5', status: false },
    { id: 9, name: 'uni0A18', code: '#f4f5f5', status: false },
    { id: 10, name: 'uni0A19', code: '#f4f5f5', status: false },

  ]);
  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      <View style={{ flexDirection: 'row', backgroundColor: "#2f85a4", paddingTop: 30 }}>
        <TouchableOpacity   >
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
        <Text style={styles.title}>Row1</Text>
        <Card containerStyle={{ borderRadius: 10, height: 230, width: 230, marginRight: 1, marginLeft: 1, }}>
          <TouchableOpacity onPress={onPress}>
            <Button type="clear"
              icon={
                isIos ?
                  <CustomIcon name="uni0A09" size={150}></CustomIcon>
                  : <AndroidCustomIcon name="uni0A09" size={150}></AndroidCustomIcon>
              }
            />
          </TouchableOpacity>

          <TouchableOpacity  >
            <Button type="clear" onPress={onAudioPlay}
              icon={
                <Icon name="volume-medium-outline" style={{ marginLeft: 20 }} size={20}></Icon>
              }
            />
          </TouchableOpacity>
        </Card>
        <FlatGrid
          itemDimension={60}
          data={items}
          style={styles.gridView}
          renderItem={({ item }) => (
            <View style={[styles.itemContainer]}>
              <TouchableOpacity onPress={onPress}>
                <Button type="clear" disabledStyle={{ backgroundColor: colors.grey0 }} disabled={item.status}
                  icon={
                    isIos ?
                      <CustomIcon name={item.name} size={40}></CustomIcon>
                      : <AndroidCustomIcon name={item.name} size={40}></AndroidCustomIcon>
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
    paddingTop: 20,
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

export default GurumukhiDetails;
