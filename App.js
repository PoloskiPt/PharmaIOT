import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
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
import * as Permissions from 'expo-permissions'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CredentialsContext} from './store/CredentialsContext';


LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesature components, check out new Gestures system!",
]);



export default function App() {
  
  const [appReady, setAppReady] = useState(false);

 const [fontsLoaded, setFontsLoaded] = useState(false);

 const [storedCredentials, setStoredCredentials] = useState("");

 const checkLoginCredentials = () => {
    AsyncStorage.getItem('flowerCribCredentials')
    .then((result) => {
      if(result !== null){
          setStoredCredentials(JSON.parse(result));
          console.log(result);
      }else{
        setStoredCredentials(null);
      }
    })
    .catch(error => console.log(error))
 }

  const LoadFonts = async () => {
    await useFonts(); // We have to await this call here
  };

  if (!appReady) {
    return (
      <AppLoading
        startAsync={checkLoginCredentials}
        onFinish={() => setAppReady(true)}
        onError={(error) => console.log(error)}
      />
    );
  } else {
    
    return (     

          <Navigation />
            
    );
  }
  {/*<CredentialsContext.Provider value={{storedCredentials, setStoredCredentials}}>  </CredentialsContext.Provider>*/} 
  
}