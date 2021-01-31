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
import { Button, Image, colors } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { EventRegister } from 'react-native-event-listeners'
import { useNavigation } from "@react-navigation/native";
import { ROUTERS } from "utils/navigation";
import CustomIcon from 'utils/CustomIcon'
import AndroidCustomIcon from 'utils/androidCustomIcon';
import database from "utils/database";
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import LinearGradient from 'react-native-linear-gradient'
import { FlatGrid } from 'react-native-super-grid';

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

  const { navigate } = useNavigation();

  const onSkipPress = useCallback(() => {
    if (listner) {
      EventRegister.removeEventListener(listner)
    }

    navigate(ROUTERS.Home);
  }, []);

  const onWordPress = (item: any) => {
   navigate(ROUTERS.WordFormationDetails, item);
  }

  return (

    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      <View style={{ flexDirection: 'row', backgroundColor: "#009DC2", paddingTop: 30 }}>
        <TouchableOpacity   >
          <Button onPress={onSkipPress} style={styles.buttonSkipText} type="clear"
            icon={  <Icon  name="arrow-back"  size={30}  color="black"/>  }>
          </Button>
        </TouchableOpacity>
        <Text style={{ fontSize: 30, marginTop: headerMarginTop, marginLeft: 110, color: '#1D2359', textAlign: 'center' }}>Vowels</Text>
        {/* Nirvair: Hiding this button for now
        <Button onPress={onSkipPress} style={styles.buttonSkipText} type="clear"
          icon={  <Icon  name="bug"  size={30}  color="black"/>  }>
        </Button>
        */}
      </View >

      <View style={{
        flex: 1,
        backgroundColor: "#2f85a4",
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 0
      }}>

        <LinearGradient
          colors={['#009DC2', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']}
          style={styles.linearGradient} >

        <FlatGrid
         itemDimension={200}
          data={soundModifiers}
          style={styles.gridView}
          renderItem={ ({ item }) => (
            <View style={[styles.itemContainer]}>
              <Button titleStyle={[styles.buttonText]} containerStyle={styles.buttonOutline}
                title={
                  <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 0 }}>
                      {item.pname} {item.symbol}
                    </Text>
                }
                onPress={() => onWordPress(item)}
                type="outline"
              />
            </View>
          )}
          keyExtractor={item => item.symbol}
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
    flex:1,
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
  button :{
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
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
  },
});

export default WordFormation;
