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
import  DropDownPicker  from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { ROUTERS } from "utils/navigation";
import {Player} from '@react-native-community/audio-toolkit';
import LinearGradient from 'react-native-linear-gradient'
import { IMAGES } from 'utils/imagesRequiers';

var isIos = false;
let headerMarginTop = 0;
let gridViewTop = 0;

if (Platform.OS == 'ios') {
  isIos = true;
  headerMarginTop = 23;
  gridViewTop = 10;
}

let player = new Player("")  // single global Player instance 
let loopBool = false         // global flag to keep track of looping state
let cardFlipped = false      // global flag to keep track of card state
let playBackText = "Lower speed (1.0)"
let starredItemIdList: any[] = []         // list of ids of starred items; populate in setSelection()
let starredItemsSet = new Set()
let currentDDSelection = "All Words"      // Global for keeping track of the dropdown state

const VocabularyDetails = ({ route }) => {
  let vocabWord: any;
  let vocabWords: any;

  if (route.params) {
    vocabWord = route.params.item
    vocabWords = route.params.vocabulary    // This is a nested list of all words for the selected topic
  }

  let topic = route.params.topic        // Set topic name
  let flatAdjectivesList: any[] = vocabWords["Adjectives"]   // flat list of all adjectives 
  let indexRangeAdjectives: any;
  let flatNounsList: any[] = vocabWords["Nouns"]            // flat list of all nouns
  let indexRangeNouns: any;
  let flatVerbsList: any[] = vocabWords["Verbs"]            // flat list of all verbs
  let indexRangeVerbs: any;
  let flatVocabListAll: any[] = []             // flat list of all words, populated below

  // Prepare dynamic list of items for the drop down picker, set 'All Words' as default
  let dropDownItems: any[] = [{ label: 'All Words', value: 'All Words', hidden: false }]

  // Set index range for adjectvies if there are any; also add adjectives to flatVocabListAll and update dropdownItems
  if (flatAdjectivesList != undefined){
    indexRangeAdjectives = {start: 0, end: flatAdjectivesList.length-1}
    flatVocabListAll = flatVocabListAll.concat(flatAdjectivesList)
    dropDownItems.push({ label: 'Adjectives', value: 'Adjectives' })
  }

  // Set index range for nouns if there are any; also add nouns to flatVocabListAll and update dropdownItems
  if (flatNounsList != undefined){
    indexRangeNouns = {start: flatVocabListAll.length, end: (flatVocabListAll.length + flatNounsList.length -1)}
    flatVocabListAll = flatVocabListAll.concat(flatNounsList)
    dropDownItems.push({ label: 'Nouns', value: 'Nouns' })
  }

  // Set index range for verbs if there are any; also add verbs to flatVocabListAll and update dropdownItems
  if (flatVerbsList != undefined){
    indexRangeVerbs = {start: flatVocabListAll.length, end: (flatVocabListAll.length + flatVerbsList.length -1)}
    flatVocabListAll = flatVocabListAll.concat(flatVerbsList)
    dropDownItems.push({ label: 'Verbs', value: 'Verbs' })
  }

  // Add 'Starred' to dropdown list
  dropDownItems.push({ label: 'Starred', value: 'Starred' })

  // Set hooks to change states of desired elements after they are initially rendered
  let [cardItem, setCardItem] = React.useState(vocabWord)
  let [cardText, updateCardText] = React.useState(cardItem.punjabi)
  let [speedText, updateSpeedText] = React.useState(playBackText)
  let [currItemNum, updateCurrItemNum] = React.useState(cardItem.id)
  let [numItems, updateNumItems] = React.useState(flatVocabListAll.length)
  let [imgsrc, updateStarImgSrc] = React.useState(IMAGES['StarHollow'])
  let [noStarredText, updateNoStarredText] = React.useState("")

  // Set navigator
  const { navigate } = useNavigation();

  // Callback for going to the previous screen
  const onSkipPress = useCallback(() => {
    player.destroy()  // make sure that no audio is left playing while leaving
    starredItemsSet.clear()  // clear the set of starred items 
    navigate(ROUTERS.Vocabulary);
  }, []);

  // Callback for playing audio
  const playAudio = (item: any) => {
    if (loopBool){
      loopBool = false
      player.destroy()
    }
    else{
      player = new Player(item.audioId + ".mp3", {autoDestroy: true});
      player.play().on('ended', () => {})
    }
    updateSpeedText(playBackText)
    updateNoStarredText("")
  }

  // Callback for looping audio
  const loopAudio = (item: any) => {
    if (loopBool) {
      loopBool = false
      updateSpeedText(playBackText)
      player.destroy()
    }
    else {
      loopBool = true
      updateSpeedText(playBackText)
      player = new Player(item.audioId + ".mp3", { autoDestroy: false });
      player.looping = true
      player.play().on('ended', () => {
        //console.log('VocabularyDetails(), audio looping');
      })
    }
    updateNoStarredText("")
  }

  // Callback for lowering audio speed
  const playAudioSlow = (item: any) => {
    if (loopBool && player.speed > 0.6){
      player.speed = player.speed - 0.1
      let tempSpeedText = "Lower Speed (" + player.speed.toFixed(1) + ")"
      updateSpeedText(tempSpeedText)
    }
    updateNoStarredText("")
  }

  // Callback for moving backwards in word list
  const previousWord = (item: any) => {  
    let relativeNewItemIndex = 1
    let currItemIndex = item.id - 1        // item.id is 1 ahead of the array index
    player.destroy()    // stop audio in case it is looping
    updateSpeedText(playBackText)  // reset plaback speed text
    cardFlipped = false              // unflip the card 

    console.log('L162 prevWord():  item = ', item);
    // Based on the dropdown selection, move back if item is not the first one in selected group
    switch(currentDDSelection){
      case 'Adjectives':
        if (currItemIndex > indexRangeAdjectives.start){
          cardItem = flatVocabListAll[currItemIndex-1]
          relativeNewItemIndex = currItemIndex - indexRangeAdjectives.start
        }
        break
      case 'Nouns':
        if (currItemIndex > indexRangeNouns.start){
          cardItem = flatVocabListAll[currItemIndex-1]
          relativeNewItemIndex = currItemIndex - indexRangeNouns.start
        }
        break
      case 'Verbs':
        if (currItemIndex > indexRangeVerbs.start){
          cardItem = flatVocabListAll[currItemIndex-1]
          relativeNewItemIndex = currItemIndex - indexRangeVerbs.start
        }
        break
      case 'Starred':
        let tempIdx = starredItemIdList.indexOf(item)
        if (tempIdx == 0){
          cardItem = starredItemIdList[tempIdx]
        }
        else if (tempIdx < starredItemIdList.length){
          cardItem = starredItemIdList[tempIdx-1]
          updateCurrItemNum(tempIdx-1)
        }
        else{
          // we are already at the end of list
          cardItem = starredItemIdList[tempIdx]
        }
        break
      default:
        if (currItemIndex  > 0){
          cardItem = flatVocabListAll[currItemIndex-1]
          relativeNewItemIndex = currItemIndex
        }
    }

    // Update star state
    if (cardItem.starred){
      updateStarImgSrc(IMAGES['StarSolid'])
    }
    else{
      updateStarImgSrc(IMAGES['StarHollow'])
    }
    
    updateCurrItemNum(relativeNewItemIndex)
    setCardItem(cardItem)
    updateCardText(cardItem.punjabi)
    updateNoStarredText("")
  }

  // Callback for moving forward in word list
  const nextWord = (item: any) => {
    player.destroy()                 // stop audio in case it is looping
    updateSpeedText(playBackText)    // reset plaback speed text
    cardFlipped = false              // unflip the card 

    console.log('L224 nextWord(): item = ', item);

    // Based on the dropdown selection, move back if item is not the first one in selected group
    switch(currentDDSelection){
      case 'Adjectives':
        if (item.id < indexRangeAdjectives.end+1){
          cardItem = flatVocabListAll[item.id]
          updateCurrItemNum(item.id - indexRangeAdjectives.start+1)
        }
        break
      case 'Nouns':
        if (item.id < indexRangeNouns.end+1){
          cardItem = flatVocabListAll[item.id]
          updateCurrItemNum(item.id - indexRangeNouns.start+1)
        }
        break
      case 'Verbs':
        if (item.id < indexRangeVerbs.end+1){
          cardItem = flatVocabListAll[item.id]
          updateCurrItemNum(item.id - indexRangeVerbs.start+1)
        }
        break
      case 'Starred':
        let tempIdx = starredItemIdList.indexOf(item)
        let listLen = starredItemIdList.length
        if (tempIdx == 0 && listLen == 1){
          // There is only one starred item; there is no next item to display
          cardItem = starredItemIdList[tempIdx]
          //updateCurrItemNum(tempIdx+2)
        }
        else if (tempIdx == 0 && listLen > 1){
          // There is a next itme to go display
          cardItem = starredItemIdList[tempIdx+1]
          updateCurrItemNum(tempIdx+2)
        }
        else if (tempIdx > 0 && tempIdx < listLen-1){
          // There is a next itme to go display
          cardItem = starredItemIdList[tempIdx+1]
          updateCurrItemNum(tempIdx+1)
        }
        else{
          // we are at the end of list
          updateCurrItemNum(tempIdx+1)
          cardItem = starredItemIdList[tempIdx]
        }
        break
      default:
        let currItemIndex = item.id - 1  // item.id is 1 ahead of the array index
        if (currItemIndex < flatVocabListAll.length-1){
          currItemIndex = currItemIndex + 1
          cardItem = flatVocabListAll[currItemIndex]
          updateCurrItemNum(currItemIndex+1)
        }
    }

    // Update star state
    if (cardItem.starred){
      updateStarImgSrc(IMAGES['StarSolid'])
    }
    else{
      updateStarImgSrc(IMAGES['StarHollow'])
    }

    setCardItem(cardItem)
    updateCardText(cardItem.punjabi)
    updateNoStarredText("")
  }

  // Callback for flipping the word card
  const flipCard = (item: any) => {
    player.destroy()                // stop audio in case it is looping
    updateSpeedText(playBackText)  // reset plaback speed text
    updateNoStarredText("")

    if (cardFlipped){
      cardFlipped = false
      updateCardText(item.punjabi)
    }
    else{
      cardFlipped = true
      updateCardText(item.english)
    }
  }

  // Callback for starring the word card
  const starCard = (item: any) => {
    player.destroy()      // stop audio in case it is looping
    updateSpeedText(playBackText)  // reset plaback speed text
    updateNoStarredText("")

    if (item.starred){
      item.starred = false
      updateStarImgSrc(IMAGES['StarHollow'])
    }
    else{
      item.starred = true
      updateStarImgSrc(IMAGES['StarSolid'])
    }

    //console.log('L330 starCard(): set before: ',  starredItemsSet)
    // Scan word list and populate starredItemsSet
    for(let i = 0 ; i<flatVocabListAll.length; i++){
      if (flatVocabListAll[i].starred){
        starredItemsSet.add(flatVocabListAll[i])
      }
      else{
        starredItemsSet.delete(flatVocabListAll[i])
      }
    }
  }

  // Clear all stars
  const clearStars = () => {
    // First clear stars in the source list of all cards
    for(let i = 0 ; i<flatVocabListAll.length; i++){
      flatVocabListAll[i].starred = false
    }

    // Now clear the supporting states
    starredItemsSet.clear()
    starredItemIdList = []
    currentDDSelection = 'All Words'
    numItems = flatVocabListAll.length
  }


  // Callback for handling dropdown selections
  const setSelection =(item: any)=>{
    //console.log('L277 setSelection(): item = ', item, 'cardItem = ', cardItem)
    let currItNum = 1 
    currentDDSelection = item.selection
    updateNoStarredText("")

    switch(currentDDSelection){
      case 'Adjectives':
        numItems = indexRangeAdjectives.end - indexRangeAdjectives.start + 1
        cardItem = flatVocabListAll[indexRangeAdjectives.start]
        currItNum = cardItem.id - indexRangeAdjectives.start
        break
      case 'Nouns':
        numItems = indexRangeNouns.end - indexRangeNouns.start + 1
        cardItem = flatVocabListAll[indexRangeNouns.start]
        currItNum = cardItem.id - indexRangeNouns.start
        //console.log('L291 setSelection() Nouns: cardItem = ', cardItem, '  currItNum =', currItNum, ' indexRangeNouns.start=', indexRangeNouns.start)
        break
      case 'Verbs':
        numItems = indexRangeVerbs.end - indexRangeVerbs.start + 1
        cardItem = flatVocabListAll[indexRangeVerbs.start]
        currItNum = cardItem.id - indexRangeVerbs.start
        break
      case 'Starred':
        // Scan word list and populate starredItemsSet
        for(let i = 0 ; i<flatVocabListAll.length; i++){
          if (flatVocabListAll[i].starred){
            starredItemsSet.add(flatVocabListAll[i])
          }
          else{
            starredItemsSet.delete(flatVocabListAll[i])
          }
        }

        if(starredItemsSet.size <= 0){
          // There are no starred cards, hence nothing to do here
          updateNoStarredText("There are no starred cards. Make another selection.")
          currentDDSelection = 'All Words'
          return
        }
        starredItemIdList = [... starredItemsSet]
        numItems = starredItemIdList.length
        cardItem = starredItemIdList[0]
        currItNum = 1
        break
      default:  // default selection is 'All Words'
        numItems = flatVocabListAll.length
        cardItem = flatVocabListAll[0]
        currItNum = 1
    }
    //console.log('L306 setSelection() selection = ', currentDDSelection, ' cardItem = ', cardItem)
    setCardItem(cardItem)
    updateCardText(cardItem.punjabi)
    updateCurrItemNum(currItNum)
    updateNumItems(numItems)

    if (cardItem.starred){
      updateStarImgSrc(IMAGES['StarSolid'])
    }
    else{
      updateStarImgSrc(IMAGES['StarHollow'])
    }
  }

  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}

      <View style={{ flexDirection: 'row', backgroundColor: "#009DC2", paddingTop: 30 }}>
        <TouchableOpacity>
          <Button onPress={onSkipPress} style={styles.buttonSkipText} type="clear"
            icon={
              <Icon name="arrow-back" size={30} color="black" />
            }>
          </Button>
        </TouchableOpacity>
        <Text style={styles.title}> {topic}</Text>
      </View >
      
      <View style={{
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 60,
      }}>
        <LinearGradient
          colors={['#009DC2', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']}
          style={styles.linearGradient}>
         
          <DropDownPicker
            activeLabelStyle={{ color: '#256783', fontSize: 16, fontWeight: '600' }}
            selectedLabelStyle={{ color: '#256783', fontSize: 16, fontWeight: '600' }}
            defaultValue={'All Words'}
            containerStyle={{ height: 40, width: 200 }}
            itemStyle={{ justifyContent: 'flex-start' }}
            dropDownStyle={{ backgroundColor: '#FFE8C8' }}
            dropDownMaxHeight={180} 
            labelLength={180}
            style={{ backgroundColor: '#FFC575' }}
            items={dropDownItems}
            onChangeItem={item => setSelection({
              selection: item.value
            })}
          />
          
           <Text>{noStarredText}</Text> 
          <Card containerStyle={styles.cardContainer}>
            <View style={{
              flex: 0,
              flexDirection: 'row',
              marginTop: -30,
              justifyContent: 'space-around',
              width: 320
            }} >

              <Button type="clear" onPress={() => starCard(cardItem) }
                icon={ <Image source={imgsrc} style={styles.topButtonsStyle}/> } 
              />
              <Button buttonStyle={styles.clearStarsButton} titleStyle={[styles.clearStarsButtonText]} title="Clear Stars" onPress={() => clearStars()}/>
              <Button type="clear" onPress={() => flipCard(cardItem)}
                icon={<Image source={IMAGES['FlipCard']} style={styles.topButtonsStyle} />} 
              />
            </View>
            
            {/*spacers */}
            <Text/><Text/>

            {
              cardFlipped ?
                cardItem.gender == "m" ?
                  <Text style={styles.cardTextBlue} onPress = {() => flipCard(cardItem)}>{cardText}</Text>
                  : cardItem.gender == "f" ?
                    <Text style={styles.cardTextPink} onPress = {() => flipCard(cardItem)}>{cardText}</Text>
                    : <Text style={styles.cardTextPlain} onPress = {() => flipCard(cardItem)}>{cardText}</Text>
                : <Text style={styles.cardTextPlain} onPress = {() => flipCard(cardItem)}>{cardText}</Text>
            }
            
            {/*  Leaving out for now
              cardItem.gender == "m" ?
                <Text style={styles.genderText}>(m)</Text>
                : <Text style={styles.genderText}>(f)</Text>
            */}
          
          </Card>
          
          <View style={{width: 500, alignItems: 'center',}} >
            <View style={{
              flex: 0,
              flexDirection: 'row',
              backgroundColor: "#256783",
              justifyContent: 'space-around',
              width: 320   // this should match Card.width above
            }} >
              <Button onPress={() => playAudio(cardItem)} type="clear"
                icon={ <Image source ={IMAGES['PlayAudio']} style={styles.buttonAudioControlStyle}/> }>
              </Button>
              <Text style={styles.buttonAudioSpeedStyle} onPress = {() => playAudioSlow(cardItem)}>{speedText}</Text>
              <Button onPress={() => loopAudio(cardItem)} type="clear"
                icon={ <Image source ={IMAGES['LoopAudio']} style={styles.buttonAudioControlStyle}/> }>
              </Button>
            </View>
          </View>

          {/* spacer view */} 
          <View style={styles.spacer}/>
           
          <View style={{width: 500, alignItems: 'center',}} >
            <View style={{
              flex: 0,
              flexDirection: 'row',
              paddingTop: 0,
              justifyContent: 'space-around',
              width: 400
            }} >
              <Button onPress={() => previousWord(cardItem)}  type="clear"
                icon={ <Image source ={IMAGES['PreviousWord']} style={styles.buttonNavWordListStyle}/> }>
              </Button>
              <Text style={styles.referenceText}> {currItemNum}{'/'}{numItems} </Text>
              <Button onPress={() => nextWord(cardItem)}  type="clear"
                icon={ <Image source ={IMAGES['NextWord']} style={styles.buttonNavWordListStyle}/>  }>
              </Button>
            </View>
          </View>
              
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
  cardContainer: {
    borderRadius: 10,
    height: 260,
    width: 320,
    marginRight: 1,
    marginLeft: 0,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
  },
  buttonNavWordListStyle: {
    height: 60,
    width: 60,
    resizeMode: 'stretch',
  },
  buttonAudioControlStyle: {
    height: 32,
    width: 32,
    resizeMode: 'stretch',
  },
  buttonAudioSpeedStyle: {
    color: 'white',
    fontSize: 16,
    paddingTop: 8,
    paddingLeft: 4,
    paddingRight: 4,
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    height: 40,
    marginTop: 4
  },
  topButtonsStyle: {
    height: 32,
    width: 32,
    resizeMode: 'stretch',
  },  
  buttonSkipText: {
    paddingTop: 20,
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
  },
  referenceText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    paddingTop:24,
  },
  genderText: {
    width: 300,
    fontSize: 16,
    color: '#a64d79',
    textAlign: 'right',
  },
  cardTextPlain: {
    width: 300,
    fontSize: 54,
    color: 'black',
    textAlign: 'center',
  },
  cardTextPink: {
    width: 300,
    fontSize: 54,
    color: '#a64d79', // this is dark magenta 1
    // color: '#741b47', // this is Google Docs dark magenta 2 suggested by Reeta
    textAlign: 'center',
  },
  cardTextBlue: {
    width: 300,
    fontSize: 54,
    //color: 'blue',
    color: '#3d85c6',  // dark blue 1
    textAlign: 'center',
  },
  title:{
    fontSize: 30, 
    marginTop: headerMarginTop, 
    marginLeft: 100, 
    color: '#1D2359', 
    textAlign: 'center'
  },
 spacer: {
   padding:20,
 },
 clearStarsButton:{
  backgroundColor: '#256783',
  //borderColor: 'red',
  //borderWidth: 5,
  borderRadius: 8,
  fontSize: 16
 },
 clearStarsButtonText:{
  //paddingTop: 10,
  //width: 340,
  //height: 40,
  //color: 'black',
  fontSize: 16,
  fontWeight: '400',
  textAlign: 'center',
 }
});

export default VocabularyDetails;