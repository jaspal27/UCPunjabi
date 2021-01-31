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
  Dimensions,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  StatusBar,
  Platform
} from 'react-native';
import { Button, Image, colors } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { EventRegister } from 'react-native-event-listeners'
import { useNavigation } from "@react-navigation/native";
import { ROUTERS } from "utils/navigation";
import database from "utils/database";
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import LinearGradient from 'react-native-linear-gradient'
import { FlatGrid, SectionGrid } from 'react-native-super-grid';

var isIos = false;
let headerMarginTop = 0;
let gridViewTop = 0;
let topic = ""
let spacing = "                "

if (Platform.OS == 'ios') {
  isIos = true;
  headerMarginTop = 23;
  gridViewTop = 10;
}

const Vocabulary = ({ route }) => {

  console.log('L52 Vocabulary(), route.params=', route.params)

  if (route.params) {
    topic = route.params.topic  // this is the name of the selected vocabualry topic
  }

  let listner: any;
  let vocabularyData: [] = database.getVocabularyData()
  let sectionsData: { title: string; data: any; }[] = []
  let [vocabulary, setVocabulary] = React.useState(vocabularyData)
  //console.log('L59 Vocabulary(), vocabulary = ', vocabulary)
  //console.log('L60 Vocabulary(), vocabulary topic = ', vocabulary[topic])  //this gives us vocab for the given topic

  //Filter in vocabulary only the the selected topic
  vocabulary = vocabulary[topic]
  let vocKeys =  Object.keys(vocabulary)
  console.log('L65 Vocabulary(), vocabulary keys = ', vocKeys)
  //console.log('L66 Vocabulary(), vocabulary keys keys = ', vocabulary[vocKeys[0]] )

  for (var vkey in vocKeys){
    //console.log('L69 Vocabulary(), element = ', vocabulary[vocKeys[vkey]])
    let secItem = {title: vocKeys[vkey], data: vocabulary[vocKeys[vkey]] }
    sectionsData.push(secItem)
  }

  const { navigate } = useNavigation();

  const onBackPress = useCallback(() => {
    if (listner) {
      EventRegister.removeEventListener(listner)
    }

    navigate(ROUTERS.VocabularyModules);
  }, []);

  const onButtonPress = (item: any) => {
   navigate(ROUTERS.VocabularyDetails, {item, topic, vocabulary});
  }

  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      <View style={{ flexDirection: 'row', backgroundColor: "#009DC2", paddingTop: 30 }}>
        <TouchableOpacity   >
          <Button onPress={onBackPress} style={styles.buttonSkipText} type="clear"
            icon={  <Icon  name="arrow-back"  size={30}  color="black"/>  }>
          </Button>
        </TouchableOpacity>
        <Text style={styles.title}> {topic}</Text>
        {/* Nirvair: Hiding this button for now
        <Button onPress={onBackPress} style={styles.buttonSkipText} type="clear"
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
          style={styles.linearGradient}>

          <Text/>
          <SectionGrid
            itemDimension={300}
            spacing= {4}
            sections={sectionsData}
            style={styles.gridView}
            renderItem={({ item, section, index }) => (
              <TouchableWithoutFeedback onPress={() => onButtonPress(item)}>
                <View style={[styles.itemContainer]}>
                  <Text style={styles.wordTextPunjabi}>{item.punjabi}</Text>
                  <Text style={styles.wordTextEnglish}>{item.english}</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
            renderSectionHeader={({ section }) => (
                  <Text style={styles.sectionHeader}>{section.title}</Text>
            )}
          />
        </LinearGradient>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    alignItems: 'center',
    padding: 2,
    flexDirection: 'row',
  },
  buttonSkipText: {
    paddingTop: 20,
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
  },
  wordTextPunjabi: {
    width: 140,
    fontSize: 18,
    color: 'black',
    textAlign: 'left',
  },
  wordTextEnglish: {
    width: 210,
    fontSize: 17,
    color: 'black',
    textAlign: 'left',
  },
  gridView: {
    width: 410,
    marginTop: 0,
    marginRight: 0,
    flex: 1,
  },
  sectionHeader: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    alignItems: 'center',
    color: 'gold',
    padding: 0,
    marginLeft: 20,
  },
  title:{
    fontSize: 30, 
    marginTop: headerMarginTop, 
    marginLeft: 100, 
    color: '#1D2359', 
    textAlign: 'center'
  }
});

export default Vocabulary;
