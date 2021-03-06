import AsyncStorage from '@react-native-community/async-storage';
import { lettersData } from "utils/letters";
import { soundModifiersData } from "utils/soundModifiers";
import { vocabularyData } from "utils/vocabulary"
import { numbersData } from "utils/numbers";

export default class database {
  static lettersObject: any = [];
  static soundModifiersObject: any = [];
  static vocabularyObject: any = [];
  static numbersObject: any = [];

  static async fetchLettersData(platform: any) {
    try {
      const value = await AsyncStorage.getItem('letters');
      let lettersJson = lettersData
      if (value !== null) {
        // We have data!!
        //console.log(value);
        database.lettersObject = JSON.parse(value)
      } else {

        //if(platform === 'ios'){
        console.log('os name:' + platform)
        AsyncStorage.setItem('letters', JSON.stringify(lettersData))
        /* }else{
           console.log('os name:' +platform)
           AsyncStorage.setItem('letters',JSON.stringify(lettersAndroidData))
           lettersJson = lettersAndroidData
         }*/

        database.lettersObject = lettersJson
        console.log('no letters data found')
      }
    } catch (error) {
      // Error retrieving data
      console.log('letters data retrieval error ', error)
    }
  }

  static async fetchSoundModifiersData(platform: any) {
    try {
      const value = await AsyncStorage.getItem('soundModifiers');
      let soundModifiersJson = soundModifiersData

      if (value !== null) {
        // We have data!!
        //console.log(value);
        database.soundModifiersObject = JSON.parse(value)
      } else {

        if (platform === 'ios') {
          console.log('os name:' + platform)
          AsyncStorage.setItem('soundModifiers', JSON.stringify(soundModifiersData))
        }
        /*
        else {
          console.log('os name:' + platform)
          AsyncStorage.setItem('soundModifiers', JSON.stringify(lettersAndroidData))
          lettersJson = lettersAndroidData
        }
        */
        database.soundModifiersObject = soundModifiersJson
        console.log('no sound modifiers data found')
      }
    } catch (error) {
      // Error retrieving data
      console.log('sound modifiers data retrieval error ', error)
    }
  }

  static async fetchVocabularyData(platform: any) {
    try {
      const value = await AsyncStorage.getItem('vocabulary');
      let vocabularyJson = vocabularyData

      if (value !== null) {
        // We have data!!
        //console.log(value);
        database.vocabularyObject = JSON.parse(value)
      } else {

        if (platform === 'ios') {
          console.log('os name:' + platform)
          AsyncStorage.setItem('vocabulary', JSON.stringify(vocabularyData))
        }
        database.vocabularyObject = vocabularyJson
        console.log('no vocabulary data found')
      }
    } catch (error) {
      // Error retrieving data
      console.log('vocabulary data retrieval error ', error)
    }
  }

  static async fetchNumbersData(platform: any) {
    try {
      const value = await AsyncStorage.getItem('numbers');
      let numbersJson = numbersData

      if (value !== null) {
        // We have data!!
        //console.log(value);
        database.numbersObject = JSON.parse(value)
      } else {

        if (platform === 'ios') {
          console.log('os name:' + platform)
          AsyncStorage.setItem('vnumbers', JSON.stringify(numbersData))
        }
        database.numbersObject = numbersJson
        console.log('no numbers data found')
      }
    } catch (error) {
      // Error retrieving data
      console.log('numbers data retrieval error ', error)
    }
  }

  static getSoundModifiersData() {
    return database.soundModifiersObject
  }

  static setSoundModifiersData(soundModifiersData: []) {
    AsyncStorage.setItem('soundModifiers', JSON.stringify(soundModifiersData))
  }

  static getLettersData() {
    return database.lettersObject
  }
  static setLetterData(lettersData: []) {
    AsyncStorage.setItem('letters', JSON.stringify(lettersData))
  }

  static getVocabularyData() {
    return database.vocabularyObject
  }
  static setVocabularyData(vocabularyData: []) {
    AsyncStorage.setItem('vocabulary', JSON.stringify(vocabularyData))
  }

  static getNumbersData() {
    return database.numbersObject
  }
  static setNumbersData(numbersData: []) {
    AsyncStorage.setItem('numbers', JSON.stringify(numbersData))
  }

  static async removeLettersDatabase() {
    try {
      await AsyncStorage.removeItem('letters');
      return true;
    }
    catch (exception) {
      return false;
    }
  }
}