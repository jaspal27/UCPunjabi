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
import { Button, ButtonGroup, Image, colors } from 'react-native-elements';
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
//let selectedButtonIdx = 0

if (Platform.OS == 'ios') {
  isIos = true;
  headerMarginTop = 23;
  gridViewTop = 10;
}

const Vocabulary = ({ route }) => {

  //console.log('L52 Vocabulary(), route.params=', route.params)
  if (route.params) {
    topic = route.params.topic  // this is the name of the selected vocabualry topic
  }

  let listner: any;
  let vocabularyData: [] = database.getVocabularyData()
  //let sectionsData: { title: string; data: any; }[] = []
  let [allWords, setWords] = React.useState(vocabularyData)
 
  //Filter in vocabulary only for the selected topic
  let topicWords = allWords[topic]
  let vocKeys =  Object.keys(topicWords)
 
  // Setup for the ButtonGroup and list of words to display
  let buttons = []
  let [selectedButtonIdx, setSelectedButtonIdx] = React.useState(0)
  //let [selectedButtonColor, setButtonColor] = React.useState('skyblue')
  let [listWords, setListWords] = React.useState(topicWords[vocKeys[0]])

  // Setup for the button labels
  for (var vkey in vocKeys){
    let secItem = {title: vocKeys[vkey], data: topicWords[vocKeys[vkey]] }
    //sectionsData.push(secItem)
    buttons.push(vocKeys[vkey])
  }

  const { navigate } = useNavigation();

  const onBackPress = useCallback(() => {
    if (listner) {
      EventRegister.removeEventListener(listner)
    }

    navigate(ROUTERS.VocabularyModules);
  }, []);

  const onButtonPress = (item: any) => {
    //Set the relevant word group to dispaly, e.g. Adjectives, Nouns or Verbs
    let selectedWordGroup = vocKeys[selectedButtonIdx];

    //Set the actual word list to display
    let selectedWords = topicWords[vocKeys[selectedButtonIdx]]

    // Send the entire context to the next screen via the navigation route
    navigate(ROUTERS.VocabularyDetails, {item, topic, selectedWordGroup, selectedWords});
  }

  const showList = (selectedIdx: any) => {
    //console.log('L103 Vocabulary(), showList pressed selectedIdx = ', selectedIdx);
    setListWords(topicWords[vocKeys[selectedIdx]])
    setSelectedButtonIdx(selectedIdx)
  }

  const ItemSeprator = () => <View style={{
    height: 1,
    width: "100%",
    backgroundColor: "silver",
  }} />

  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}

      <View style={{ flexDirection: 'row', backgroundColor: "#009DC2", paddingTop: 15 }}>
        <TouchableOpacity   >
          <Button onPress={onBackPress} style={styles.buttonSkipText} type="clear"
            icon={  <Icon  name="arrow-back"  size={30}  color="black"/>  }>
          </Button>
        </TouchableOpacity>
        
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
          
          <Text style={styles.title}>{topic}</Text>
          {/* spacer */}
          <Text/>

          <ButtonGroup
            selectedIndex={selectedButtonIdx}
            buttons={buttons}
            containerStyle={{ height: 40 }}
            selectedButtonStyle={styles.selectedButton}
            onPress={showList}
            />
            {/* spacers */}
            <Text/>
          
            <FlatList
              data={listWords}
              keyExtractor={item => item.id}
              numColumns = {1}
              ItemSeparatorComponent={ItemSeprator}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback onPress={() => onButtonPress(item)}>
                <View style={styles.listItem}>
                  <Text style={styles.wordTextPunjabi}>{item.punjabi}</Text>
                  <Text style={styles.wordTextEnglish}>{item.english}</Text>
                </View>
                </TouchableWithoutFeedback>
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
    width: 120,
    height: 33,
    fontSize: 18,
    color: 'black',
    textAlign: 'left',
    paddingTop: 8
  },
  wordTextEnglish: {
    width: 240,
    height: 33,
    fontSize: 16,
    color: 'black',
    textAlign: 'left',
    paddingTop: 9,
    flex: 0
  },
  listView: {
    width: 410,
    marginTop: 0,
    marginRight: 0,
    flex: 1,
    justifyContent: 'space-between',
  },
  listItem: {
    //maxWidth: Dimensions.get('window').width /2,
    flex: 0.5,
    flexDirection: 'row',
    // backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 4,
  },
  selectedButton:{
    backgroundColor: 'skyblue',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
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
    fontSize: 26, 
    marginTop: -6, 
    marginLeft: 0,
    color: '#1D2359', 
    textAlign: 'center'
  },
  colWrap:{
    flexWrap: "wrap"
  },
});

export default Vocabulary;
