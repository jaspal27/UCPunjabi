import AsyncStorage from '@react-native-community/async-storage';
import {lettersData} from "utils/letters";
import { lettersAndroidData} from "utils/android/letters";


  export default class database{
    static lettersObject:any = [];
      static async fetchLettersData(platform:any) {
        
            try {
              const value = await AsyncStorage.getItem('letters');
              let lettersJson = lettersData
              if (value !== null) {
                // We have data!!
                console.log(value);
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
  

