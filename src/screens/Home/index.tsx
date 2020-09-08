/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {Fragment, useCallback,useEffect, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  
  FlatList,
  StatusBar,
  Platform
} from 'react-native';

import { Container, Header, Content, Body, Card,CardItem,Button, Title,Text,Footer,FooterTab } from 'native-base';
import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from "@react-navigation/native";
import {ROUTERS} from "utils/navigation";
declare const global: {HermesInternal: null | {}};

const Home = () => {
    const {navigate} = useNavigation();
    const onNextScreen = useCallback(()=>{
        navigate(ROUTERS.Categories);
    },[])
  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
     
      <Container >
          <Header>
          <Body>
            <Title>Home</Title>
          </Body>
          </Header>
          <Content contentContainerStyle ={styles.container} scrollEnabled={false}>

                <FlatList horizontal style={{ alignContent: 'center' }}
                    data={[{key: 'a'}, {key: 'b'},{key: 'c'},{key: 'd'},{key: 'e'}]}
                    renderItem={({item}) => 
                    <Card style={{ flex: 1, flexDirection: 'column',alignItems: 'center', margin: 1,width:100,height:100 }}>
                        <CardItem>
                        <Button style={{marginTop:10}}>
                        <Text style={{fontSize:30}}>{item.key}</Text>
                        </Button>
                        </CardItem>
                    </Card>
                    }
                />
                <Button block style={{ margin: 10 }} primary onPress={onNextScreen}>
                    <Text> Go To Next Page </Text>
                </Button>
        </Content>
        
      </Container>
         
          
        
      
    </>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        
      },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default Home;
