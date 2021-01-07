import AsyncStorage from '@react-native-community/async-storage';
import {lettersData} from "utils/letters";
import { soundModifiersData } from "utils/soundModifiers";


  export default class database{
    static lettersObject:any = [];
    static soundModifiersObject:any =[];
      static async fetchLettersData(platform:any) {
        
            try {
              const value = await AsyncStorage.getItem('letters');
              let lettersJson = lettersData
              if (value !== null) {
                // We have data!!
                //console.log(value);
                database.lettersObject = JSON.parse(value)
              }else{
                
                //if(platform === 'ios'){
                  console.log('os name:' +platform)
                  AsyncStorage.setItem('letters',JSON.stringify(lettersData))
               /* }else{
                  console.log('os name:' +platform)
                  AsyncStorage.setItem('letters',JSON.stringify(lettersAndroidData))
                  lettersJson = lettersAndroidData
                }*/
                
                database.lettersObject = lettersJson
                console.log('no data found')
              }
            } catch (error) {
              // Error retrieving data
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
        }
      }
      static getSoundModifiersData() {
        return database.soundModifiersObject
      }
    
      static setSoundModifiersData(soundModifiersData: []) {
        AsyncStorage.setItem('soundModifiers', JSON.stringify(soundModifiersData))
      }
    
      static getLettersData(){
        return database.lettersObject
      }
      static setLetterData(lettersData:[]){
        AsyncStorage.setItem('letters',JSON.stringify(lettersData))
        
      }
      static async removeLettersDatabase(){
        try {
          await AsyncStorage.removeItem('letters');
          return true;
        }
        catch(exception) {
          return false;
        }
      }
  }