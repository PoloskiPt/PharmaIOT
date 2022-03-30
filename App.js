import 'react-native-gesture-handler';
import React, { useState, useEffect, createContext,componentDidMount } from 'react';
import Monitorizacao from './screens/monitorizacao';
import AppLoading from 'expo-app-loading';
import useFonts from './hooks/useFonts';
import {StatusBar} from 'react-native';
import Login from './screens/login';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import Navigation from './routes/login/index';
import { LogBox } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CredentialsContext} from './store/CredentialsContext';
import * as SecureStore from 'expo-secure-store';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesature components, check out new Gestures system!",
]);

export default function App() {

  const [result, onChangeResult] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  

  useEffect(() => {
   
    async function getValueFor(key){
     
      let result = await SecureStore.getItemAsync(key);
      if(result){
         onChangeResult(result);
         setIsLoggedIn(true);
      }else{
        onChangeResult(false);
         setIsLoggedIn(false);
      }
  }

    getValueFor('session');
    //alert("app sessao " + result);

  }, []);

  if(isLoggedIn === null) return null;
    
    return (     
          <Navigation result={isLoggedIn}/>        
    );

  {/*<CredentialsContext.Provider value={{storedCredentials, setStoredCredentials}}>  </CredentialsContext.Provider>*/} 
  
}