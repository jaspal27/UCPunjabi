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
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform
} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { useNavigation } from "@react-navigation/native";
import { ROUTERS } from "utils/navigation";
import database from "utils/database"
import LinearGradient from 'react-native-linear-gradient';

const Home = () => {
  // check if the data exist in the local storage. if not then save the data to the database
  database.fetchLettersData(Platform.OS)
  database.fetchSoundModifiersData(Platform.OS)
  database.fetchVocabularyData(Platform.OS)

  const { navigate } = useNavigation();

  const gotoGurmukhi = useCallback(() => {
    navigate(ROUTERS.Gurmukhi);
  }, []);

  const gotoWordFormation = useCallback(() => {
    navigate(ROUTERS.WordFormation);
  }, [])

  const gotoVocabualryMods = useCallback(() => {
    navigate(ROUTERS.VocabularyModules);
  }, []);

  const item =
  {
    title: 'Welcome to UC ਪੰਜਾਬੀ',
    text1: 'Gurmukhi Script',
    text2: 'Vowels',
    text3: 'Numbers',
    text4: 'Vocabulary',
    text5: 'Settings',
    text6: 'A mobile companion for the First Year of Punjabi.',
    text7: 'UNIVERSITY OF CALIFORNIA',
    backgroundColor: '#2f85a4',
  }
  return (
    <>
     <StatusBar backgroundColor={'transparent'} translucent={true} />

<View></View>

      <View style={{
        flex: 1,
        backgroundColor: item.backgroundColor,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 150
      }}>
        <View style={styles.buttonContainer}>
          {/* Nirvair: Hiding this button for now
           <TouchableOpacity  onPress={onSkipPress}>
              <Button style={styles.buttonSkipText} type="clear"
                icon={  <Icon  name="bug"  size={30}  color="black"  />  }>
              </Button>
            </TouchableOpacity>
          */}
        </View>

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.text6}</Text>
        <Text></Text>
        <Button titleStyle={[styles.buttonText]} containerStyle={styles.buttonOutline} title={item.text1} type="outline" onPress={gotoGurmukhi} />
        <Button titleStyle={[styles.buttonText]} containerStyle={styles.buttonOutline} title={item.text2} type="outline" onPress={gotoWordFormation} />
        {/*
        <Button titleStyle={[styles.buttonText]} containerStyle={styles.buttonOutline} title={item.text3} type="outline" />
        */}
        <Button titleStyle={[styles.buttonText]} containerStyle={styles.buttonOutline} title={item.text4} type="outline" onPress={gotoVocabualryMods}/>

        {/* Nirvair: Hiding this button for now
            <Button
              icon={  <Icon  name="settings"  size={20}  color="black"  />  }
              titleStyle= {[styles.buttonIconText]}  title={item.text5} type="clear"
            />
        */}

          <Text style={styles.brand}>{item.text7}</Text>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    width: 120,
    alignSelf: 'flex-end',
  },
  buttonSkipText: {
    paddingTop: 20,
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonText: {
    paddingTop: 10,
    width: 340,
    height: 40,
    color: 'black',
    fontWeight: '500',
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
  subtitle: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  brand: {
    paddingTop: 100,
    fontSize: 20,
    fontWeight: '600',
    color: 'rgba(251, 205, 32, 0.8)',
    textAlign: 'center',
  }
});

export default Home;
