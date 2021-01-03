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
import { FlatGrid } from 'react-native-super-grid';
import { EventRegister } from 'react-native-event-listeners'
import { useNavigation } from "@react-navigation/native";
import { ROUTERS } from "utils/navigation";
import database from "utils/database";
import LinearGradient from 'react-native-linear-gradient';
import{IMAGESSOLID,IMAGESOUTLINE} from 'utils/imagesRequiers';

var isIos = false;
let headerMarginTop = 0;
let gridViewTop=0;

if (Platform.OS == 'ios') {
  isIos = true;
  headerMarginTop = 23;
  gridViewTop = 10;
}

const Gurmukhi = () => {
  let listner: any;

  let lettersData: [] = database.getLettersData()
  let [letters, setLetters] = React.useState(lettersData)

  const { navigate } = useNavigation();

  const onNextScreen = useCallback(() => {
    navigate(ROUTERS.Gurmukhi);
  }, []);

  const onSkipPress = useCallback(() => {
    if (listner) {
      EventRegister.removeEventListener(listner)
    }

    navigate(ROUTERS.Home);
  }, []);

  const onAlphabetPress = (item: any) => {
    listner = EventRegister.addEventListener('myCustomEvent', (data: number) => {
      console.log(data);

      let tempItems: any = letters.slice()
      tempItems[data].['status'] = true
      setLetters(tempItems)
      database.setLetterData(tempItems)

    })
    console.log(item)
    navigate(ROUTERS.Gurmukhi2ndScreen, item);
  }

  return (
    <>
      
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
        
        <Text style={{ fontSize: 30, marginTop: headerMarginTop, marginLeft: 96, color: '#1D2359', textAlign: 'center' }}>Gurmukhi</Text>
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
        flex: 0,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 0
      }}>

        <LinearGradient
          colors={['#009DC2', '#FFFFFF' ]}
          style={styles.linearGradient}
        >

        <View></View>
        <Text style={styles.hint}>Start with the first letter and unlock the rest.</Text>
        <FlatGrid
          itemDimension={60}
          data={letters}
          style={styles.gridView}
          renderItem={({ item }) => (
            <View style={[styles.itemContainer]}>
              
              <TouchableOpacity onPress={() => onAlphabetPress(item)}>
               {
                  item.status ?
                        <Image style={{width: 50, height: 50}} source={IMAGESSOLID[item.name]}/>
                        : <Image style={{width: 50, height: 50}} source={IMAGESOUTLINE[item.name]}/>
                    
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
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  gridView: {
    marginTop: gridViewTop,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 68,
  },
  linearGradient:{
    alignItems : 'center',
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
  hint: {
    fontSize: 20,
    color: 'black',
    marginTop: 8,
    textAlign: 'center',
    width: 350
  },
});

export default Gurmukhi;