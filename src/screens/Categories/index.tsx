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

import { Container, Header, Content, Body, Left,Right,Icon,Button, Title,Text,List,ListItem } from 'native-base';
import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from "@react-navigation/native";
import {ROUTERS} from "utils/navigation";
declare const global: {HermesInternal: null | {}};

const Categories = () => {
    const {navigate} = useNavigation();
    const onNextScreen = useCallback(()=>{
        navigate(ROUTERS.Home);
    },[])
  return (
    <>
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={onNextScreen} >
            <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Categories</Title>
          </Body>
          <Right>
            
          </Right>
        </Header>
        <Content>
          <List>
            <ListItem selected>
              <Left>
                <Text>Simon Mignolet</Text>
              </Left>
              <Right>
               
              </Right>
            </ListItem>
            <ListItem>
             <Left>
                <Text>Nathaniel Clyne</Text>
              </Left>
              <Right>
               
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Dejan Lovren</Text>
              </Left>
              <Right>
                
              </Right>
            </ListItem>
          </List>
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

export default Categories;
