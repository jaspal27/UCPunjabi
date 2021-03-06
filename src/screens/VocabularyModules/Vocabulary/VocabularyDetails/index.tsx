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
  StatusBar,
  Platform,
} from 'react-native';
import { Button, Image, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { ROUTERS } from "utils/navigation";
import { Player } from '@react-native-community/audio-toolkit';
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

let player = new Player("")  // single global Player instance; used for avoiding creation of orphaned player
let isAudioLooping = false         // global flag to keep track of looping state
let isCardFlipped = false      // global flag to keep track of card state
let showingStarredCards = false     // global flag to tell whether any cards are starred or not 
let playBackText = "Lower speed (1.0)"
let starredItemsList: any[] = []         // list of ids of starred items; populate in setSelection()
let starredItemsSet = new Set()

const VocabularyDetails = ({ route }) => {

  // Parse route to get current word, current word selection and topic
  let currWord = route.params.item
  let topic = route.params.topic           // For displaying topic name
  let wordGroup = route.params.selectedWordGroup
  let wordsList: any[] = route.params.selectedWords

  // Find relative position of the current word and set it for rendering
  let curPos = wordsList.findIndex((e) => e == currWord) + 1
  let [currItemNum, updateCurrItemNum] = React.useState(curPos)

  // Set hooks to change states of desired elements after they are initially rendered
  let [cardItem, setCardItem] = React.useState(currWord)
  let [cardText, updateCardText] = React.useState(cardItem.punjabi)
  let [speedText, updateSpeedText] = React.useState(playBackText)
  let [numItems, updateNumItems] = React.useState(wordsList.length)
  let [imgsrc, updateStarImgSrc] = React.useState(IMAGES['StarHollow'])
  let [starsBtnState, updateStarsBtnState] = React.useState(true)

  
  // Set navigator
  const { navigate } = useNavigation();


  // Callback for going to the previous screen
  const onSkipPress = useCallback(() => {
    player.destroy()  // make sure that no audio is left playing while leaving
    clearStars()  // clear any starred cards
    navigate(ROUTERS.Vocabulary);
  }, []);


  // Callback for playing audio
  const playAudio = (item: any) => {
    if (isAudioLooping) {
      isAudioLooping = false
      player.destroy()
    }
    else {
      player = new Player(item.audioId + ".mp3", { autoDestroy: true });
      player.play().on('ended', () => { })
    }
    updateSpeedText(playBackText)
  }


  // Callback for looping audio
  const loopAudio = (item: any) => {
    if (isAudioLooping) {
      isAudioLooping = false
      updateSpeedText(playBackText)
      player.destroy()
    }
    else {
      isAudioLooping = true
      updateSpeedText(playBackText)
      player = new Player(item.audioId + ".mp3", { autoDestroy: false });
      player.looping = true
      player.play().on('ended', () => {
        //console.log('VocabularyDetails(), audio looping');
      })
    }
  }

  // Callback for lowering audio speed
  const playAudioSlow = (item: any) => {
    if (isAudioLooping && player.speed > 0.6) {
      player.speed = player.speed - 0.1
      let tempSpeedText = "Lower Speed (" + player.speed.toFixed(1) + ")"
      updateSpeedText(tempSpeedText)
    }
  }


  // Callback for moving backwards in word list
  const previousWord = (item: any) => {
    let relativeNewItemIndex = 1
    player.destroy()    // stop audio in case it is looping
    updateSpeedText(playBackText)  // reset plaback speed text
    isCardFlipped = false              // unflip the card 

    // Check whether we are showing all cards or only the starred ones, then display next card if possible
    if (showingStarredCards) {
      let currPos = starredItemsList.indexOf(item)

      if (currPos > 0) {
        // Current word is not the first word; we can display the one before it
        cardItem = starredItemsList[currPos - 1]
        relativeNewItemIndex = currPos
      }
    }
    else {
      let currPos = wordsList.indexOf(item)
      if (currPos > 0) {
        // Current word is not the first word; we can display the one before it
        cardItem = wordsList[currPos - 1]
        relativeNewItemIndex = currPos
      }
    }

    // Update star states
    if (cardItem.starred) {
      updateStarImgSrc(IMAGES['StarSolid'])
    }
    else {
      updateStarImgSrc(IMAGES['StarHollow'])
    }

    updateCurrItemNum(relativeNewItemIndex)
    setCardItem(cardItem)
    updateCardText(cardItem.punjabi)
  }


  // Callback for moving forward in word list
  const nextWord = (item: any) => {
    player.destroy()                 // stop audio in case it is looping
    updateSpeedText(playBackText)    // reset plaback speed text
    isCardFlipped = false              // unflip the card 

    // Check whether we are showing all cards or only the starred ones, then display next card if possible
    if (showingStarredCards) {
      let currPos = starredItemsList.indexOf(item)
      let listLen = starredItemsList.length

      if (listLen > 1 && currPos < listLen - 1) {
        // Current word is not the last word; we can display the next one
        cardItem = starredItemsList[currPos + 1]
        updateCurrItemNum(currPos + 2)
      }
    }
    else {
      let currPos = wordsList.indexOf(item)
      let listLen = wordsList.length

      if (listLen > 1 && currPos < listLen - 1) {
        // Current word is not the last word; we can display the next one
        cardItem = wordsList[currPos + 1]
        updateCurrItemNum(currPos + 2)
      }
    }

    // Update star state
    if (cardItem.starred) {
      updateStarImgSrc(IMAGES['StarSolid'])
    }
    else {
      updateStarImgSrc(IMAGES['StarHollow'])
    }

    setCardItem(cardItem)
    updateCardText(cardItem.punjabi)
  }


  // Callback for flipping the word card
  const flipCard = (item: any) => {
    player.destroy()                // stop audio in case it is looping
    updateSpeedText(playBackText)  // reset plaback speed text

    if (isCardFlipped) {
      isCardFlipped = false
      updateCardText(item.punjabi)
    }
    else {
      isCardFlipped = true
      updateCardText(item.english)
    }
  }


  // Callback for starring/unstarring a card
  const starCard = (item: any) => {
    player.destroy()      // stop audio in case it is looping
    updateSpeedText(playBackText)  // reset plaback speed text

    if (item.starred) {
      item.starred = false
      updateStarImgSrc(IMAGES['StarHollow'])
    }
    else {
      item.starred = true
      updateStarImgSrc(IMAGES['StarSolid'])
    }

    // Scan word list and populate starredItemsSet
    for (let i = 0; i < wordsList.length; i++) {
      if (wordsList[i].starred) {
        starredItemsSet.add(wordsList[i])
      }
      else {
        starredItemsSet.delete(wordsList[i])
      }
    }

    // Update star state
    if (starredItemsSet.size > 0) {
      updateStarsBtnState(false)
    }
    else {
      updateStarsBtnState(true)
      showingStarredCards = false
    }
  }


  // Show starred cards only, if there are any
  const showStarred = () => {

    showingStarredCards = true

    // Scan word list and populate starredItemsSet
    for (let i = 0; i < wordsList.length; i++) {
      if (wordsList[i].starred) {
        starredItemsSet.add(wordsList[i])
      }
      else {
        starredItemsSet.delete(wordsList[i])
      }
    }

    // Update the display mode to show all cards if there are no starred cards
    if (starredItemsSet.size <= 0) {
      showingStarredCards = false
      return
    }

    // Prepare for displaying only the starred cards
    starredItemsList = [...starredItemsSet]
    cardItem = starredItemsList[0]
    currItemNum = 1

    // Display the first starred card and update the context
    setCardItem(cardItem)
    updateCardText(cardItem.punjabi)
    updateCurrItemNum(currItemNum)
    updateNumItems(starredItemsList.length)
  }


  // Clear all stars
  const clearStars = () => {
    // Clear the starred state of each card 
    for (let i = 0; i < wordsList.length; i++) {
      wordsList[i].starred = false
    }

    // Now clear the supporting states
    updateStarImgSrc(IMAGES['StarHollow'])
    updateStarsBtnState(true)
    starredItemsSet.clear()
    starredItemsList = []
    showingStarredCards = false
    updateNumItems(wordsList.length)
  }

  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}

      <View style={{ flexDirection: 'row', backgroundColor: "#009DC2", paddingTop: 10 }}>
        <Button onPress={onSkipPress} style={styles.buttonSkipText} type="clear"
          icon={<Icon name="arrow-back" size={30} color="black" />}
        >
        </Button>
      </View>

      <View style={{
        flex: 1,
        backgroundColor: "#2f85a4",
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 0,
      }}>
        <LinearGradient
          colors={['#009DC2', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']}
          style={styles.linearGradient}>

          <Text style={styles.title}>{topic}</Text>
          <Text style={styles.subTitle}> {wordGroup}</Text>
          {/* spacers */}
            <Text /><Text /><Text />

          <View style={{
            flex: 0,
            flexDirection: 'row',
            marginTop: -40,
            justifyContent: 'space-around',
            width: 340
          }} >
            <Button buttonStyle={styles.clearStarsButton} titleStyle={[styles.clearStarsButtonText]}
              title="Show Starred Only" onPress={() => showStarred()} disabled={starsBtnState} />
            {/* spacers */}
            <Text /><Text /><Text />
            <Button buttonStyle={styles.clearStarsButton} titleStyle={[styles.clearStarsButtonText]}
              title="Clear Stars" onPress={() => clearStars()} disabled={starsBtnState} />
          </View>

          <Card containerStyle={styles.cardContainer}>
            <View style={{
              flex: 0,
              flexDirection: 'row',
              marginTop: -20,
              justifyContent: 'space-around',
              width: 320
            }} >

              <Button type="clear" onPress={() => starCard(cardItem)}
                icon={<Image source={imgsrc} style={styles.topButtonsStyle} />}
              />
              {/* spacers */}
              <Text /><Text />
              
              <Button type="clear" onPress={() => flipCard(cardItem)}
                icon={<Image source={IMAGES['FlipCard']} style={styles.topButtonsStyle} />}
              />
            </View>

            {/*spacers */}
            <Text /><Text />

            {
              isCardFlipped ?
                cardItem.gender == "m" ?
                  <Text style={styles.cardTextBlue} onPress={() => flipCard(cardItem)}>{cardText}</Text>
                  : cardItem.gender == "f" ?
                    <Text style={styles.cardTextPink} onPress={() => flipCard(cardItem)}>{cardText}</Text>
                    : <Text style={styles.cardTextPlainEnglish} onPress={() => flipCard(cardItem)}>{cardText}</Text>
                : <Text style={styles.cardTextPlainPunjabi} onPress={() => flipCard(cardItem)}>{cardText}</Text>
            }

            {/*  Leaving gender denoting letter out for now
              cardItem.gender == "m" ?
                <Text style={styles.genderText}>(m)</Text>
                : <Text style={styles.genderText}>(f)</Text>
            */}

          </Card>

          <View style={{ width: 500, alignItems: 'center', }} >
            <View style={{
              flex: 0,
              flexDirection: 'row',
              backgroundColor: "#256783",
              justifyContent: 'space-around',
              width: 340   // this should match Card.width above
            }} >
              <Button onPress={() => playAudio(cardItem)} type="clear"
                icon={<Image source={IMAGES['PlayAudio']} style={styles.buttonAudioControlStyle} />}>
              </Button>
              <Text style={styles.buttonAudioSpeedStyle} onPress={() => playAudioSlow(cardItem)}>{speedText}</Text>
              <Button onPress={() => loopAudio(cardItem)} type="clear"
                icon={<Image source={IMAGES['LoopAudio']} style={styles.buttonAudioControlStyle} />}>
              </Button>
            </View>
          </View>

          {/* spacer view */}
          <View style={styles.spacer} />

          <View style={{ width: 500, alignItems: 'center', }} >
            <View style={{
              flex: 0,
              flexDirection: 'row',
              paddingTop: 0,
              justifyContent: 'space-around',
              width: 400
            }} >
              <Button onPress={() => previousWord(cardItem)} type="clear"
                icon={<Image source={IMAGES['PreviousWord']} style={styles.buttonNavWordListStyle} />}>
              </Button>
              <Text style={styles.referenceText}> {currItemNum}{'/'}{numItems} </Text>
              <Button onPress={() => nextWord(cardItem)} type="clear"
                icon={<Image source={IMAGES['NextWord']} style={styles.buttonNavWordListStyle} />}>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardContainer: {
    borderRadius: 10,
    height: 260,
    width: 340,
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
    marginTop: 0
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
    paddingTop: 24,
  },
  genderText: {
    width: 300,
    fontSize: 16,
    color: '#a64d79',
    textAlign: 'right',
  },
  cardTextPlainPunjabi: {
    width: 300,
    fontSize: 60,
    color: 'black',
    textAlign: 'center',
    marginLeft: 4
  },
  cardTextPlainEnglish: {
    width: 300,
    fontSize: 40,
    color: 'black',
    textAlign: 'center',
    marginLeft: 4
  },
  cardTextPink: {
    width: 300,
    fontSize: 40,
    color: '#a64d79', // this is dark magenta 1
    textAlign: 'center',
    marginLeft: 4
  },
  cardTextBlue: {
    width: 300,
    fontSize: 40,
    color: '#3d85c6',  // dark blue 1
    textAlign: 'center',
    marginLeft: 4
  },
  title: {
    fontSize: 26,
    marginTop: -220,
    paddingBottom: 20,
    marginLeft: 0,
    color: '#1D2359',
    textAlign: 'center'
  },
  subTitle: {
    fontSize: 20,
    paddingBottom: 50,
    textAlign: 'center'
  },
  spacer: {
    padding: 20,
  },
  clearStarsButton: {
    backgroundColor: '#256783',
    borderRadius: 8,
    fontSize: 16
  },
  clearStarsButtonText: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  }
});

export default VocabularyDetails;