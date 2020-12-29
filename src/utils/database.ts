
import AsyncStorage from '@react-native-community/async-storage';
import {lettersData} from "utils/letters";

  export default class database{
    static lettersObject:any = [];
      static async fetchLettersData() {
        
            try {
              const value = await AsyncStorage.getItem('letters');
              if (value !== null) {
                // We have data!!
                console.log(value);
                database.lettersObject = JSON.parse(value)
              }else{
                AsyncStorage.setItem('letters',JSON.stringify(lettersData))
                database.lettersObject = lettersData
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
  

