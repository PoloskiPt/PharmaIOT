import 'react-native-gesture-handler';
import React, { useState, useEffect, createContext} from 'react';
import Navigation from './routes/login/index';
import { LogBox } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { UserContext } from './store/userContext';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesature components, check out new Gestures system!",
]);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [contextEmail, setContextEmail] = useState(null);
  const [contextPassword, setContextPassword] = useState(null);
  const [contextRememberMe, setContextRememberMe] = useState(null);
  const [sessionEmail, setSessionEmail] = useState('');
  const [sessionPassword, setSessionPassword] = useState('');

async function getValueForSession(){
     
    let result = await SecureStore.getItemAsync('session');
    if(result){
    setIsLoggedIn(true);
    let sessionEmail = await SecureStore.getItemAsync('sessionEmail');
    setSessionEmail(sessionEmail);
    let sessionPassword = await SecureStore.getItemAsync('sessionPassword');
    setSessionPassword(sessionPassword);
    setIsLoggedIn(true);
    }else{
       setIsLoggedIn(false);
    }
}

async function getValueForEmail(){
     
  let result = await SecureStore.getItemAsync('email');
  if(result){
    setContextEmail(result);
  }else{
    setContextEmail('');
  }
}

async function getValueForPassword(){
     
  let result = await SecureStore.getItemAsync('pass');
  if(result){
    setContextPassword(result);
  }else{
    setContextPassword('');
  }
}

async function getValueForRememberMe(){
     
  let result = await SecureStore.getItemAsync('rememberMe');  
    setContextRememberMe(result);
}

  useEffect(() => {
    getValueForSession();
    getValueForEmail();
    getValueForPassword();
    getValueForRememberMe();
    console.log(isLoggedIn);
    console.log(contextRememberMe);
    console.log(contextEmail);
    console.log(contextPassword);  
  }, []);


  if(isLoggedIn === null) return null;
    
    return (     
      <UserContext.Provider 
      value={{
      contextEmail, 
      setContextEmail,
      contextPassword,
      setContextPassword, 
      contextRememberMe, 
      setContextRememberMe, 
      sessionEmail, 
      setSessionEmail,
      sessionPassword,
      setSessionPassword
      }}>
     
      <Navigation result={isLoggedIn}/>        
      
      </UserContext.Provider>  
    );
  
}