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
  FlatList,
  StatusBar,
  Platform
} from 'react-native';
import { Button, Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { EventRegister } from 'react-native-event-listeners'
import { useNavigation } from "@react-navigation/native";
import { ROUTERS } from "utils/navigation";
import CustomIcon from 'utils/CustomIcon'
import AndroidCustomIcon from 'utils/androidCustomIcon';
import database from "utils/database";
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import LinearGradient from 'react-native-linear-gradient'
import{SOUNDMODIFIERS} from 'utils/smImagesRequires';

var isIos = false;
let headerMarginTop = 0;
let gridViewTop = 0;

if (Platform.OS == 'ios') {
  isIos = true;
  headerMarginTop = 23;
  gridViewTop = 10;
}

const WordFormation = () => {
  let listner: any;
  let soundModifiersData: [] = database.getSoundModifiersData()
  let [soundModifiers, setSoundModifiers] = React.useState(soundModifiersData)

  //console.log('WordFormation()')
  const { navigate } = useNavigation();

  const onSkipPress = useCallback(() => {
    if (listner) {
      EventRegister.removeEventListener(listner)
    }

    navigate(ROUTERS.Home);
  }, []);

  const onWordPress = (item: any) => {
    listner = EventRegister.addEventListener('myCustomEvent', (data: number) => {
      console.log('WordFormation() data =', data);

      let tempItems: any = soundModifiers.slice()
      tempItems[data].['status'] = true
      setSoundModifiers(tempItems)
      database.setLetterData(tempItems)

    })

    //console.log('onWordPress() item=', item)
    navigate(ROUTERS.WordFormationDetails, item);
  }

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
        <Text style={{ fontSize: 30, marginTop: headerMarginTop, marginLeft: 60, color: '#1D2359', textAlign: 'center' }}>Word Formation</Text>
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
        backgroundColor: "#2f85a4",
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 10
      }}>
        {/*
        <LinearGradient
          colors={['#009DC2', '#FFFFFF', '#FFFFFF', '#FFFFFF']}
          style={styles.linearGradient}
        >
        */}
        <View></View>
        <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 4}}> Forming words with or without vowels.</Text>
        <Text></Text>
        <FlatList
          data={soundModifiers}
          style={styles.gridView}
          renderItem={({ item }) => (
            <View style={[styles.itemContainer]}>
              <View style={[styles.button]}>
              <View style={{justifyContent: 'center'}}>
              <TouchableOpacity onPress={() => onWordPress(item)}>
              {
                <Text style={{fontSize:18, textAlign: 'center', marginBottom: 0}}> 
                  {item.pname}
                  {
                    item.id > 1?
                      <Image onPress={() => onWordPress(item)} style={{width: 40, height: 40}} source={SOUNDMODIFIERS[item.name]}/>
                      : <Image></Image>
                  }
                </Text> 
              }
              </TouchableOpacity>
              </View>
              </View>
              {/*
              <Button
                type="outline"
                titleStyle={{ color: colors.grey5 }}
                buttonStyle={[{ borderColor: colors.grey0 }, { width: '100%' }]}
                onPress={() => onWordPress(item)}

                icon={
                  isIos ?
                    <CustomIcon style={{ marginRight: 40, marginLeft: -80 }} name={item.name} size={32}></CustomIcon>
                    : <AndroidCustomIcon name={item.name} size={32}></AndroidCustomIcon>
                }
                title={item.name}
              />
              */}
            </View>
          )}
        />
        {/* </LinearGradient> */}
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
  linearGradient: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 68,
  },
  button :{
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    height: 50,
    width: 240,
    padding: 6,
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

export default WordFormation;