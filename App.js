import 'react-native-gesture-handler';
import React, { useState, useEffect, useRef } from 'react';
import {Platform } from 'react-native';
import Navigation from './routes/login/index';
import { LogBox } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { UserContext } from './store/userContext';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import AppLoading from 'expo-app-loading';
import useFonts from './hooks/useFonts';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesature components, check out new Gestures system!",
]);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export default function App() {

  //notifications
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [IsReady, SetIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [contextEmail, setContextEmail] = useState(null);
  const [contextPassword, setContextPassword] = useState(null);
  const [sessionPharmacy, setSessionPharmacy] = useState(null);
  const [contextRememberMe, setContextRememberMe] = useState(null);
  const [sessionEmail, setSessionEmail] = useState('');
  const [sessionPassword, setSessionPassword] = useState('');
 
 
 
  const LoadFontsAndRestoreToken = async () => {
    await useFonts();
  };

async function getValueForSession(){
     
    let result = await SecureStore.getItemAsync('session');
    if(result){
    setIsLoggedIn(true);
    let sessionEmail = await SecureStore.getItemAsync('sessionEmail');
    setSessionEmail(sessionEmail);
    let sessionPassword = await SecureStore.getItemAsync('sessionPassword');
    setSessionPassword(sessionPassword);
    //let sessionPharmacy = await SecureStore.getItemAsync('')
    setIsLoggedIn(true);
    }else{
       setIsLoggedIn(false);
    }
}

async function getValueForSessionPharmacy(){
     
  let result = await SecureStore.getItemAsync('pharmacy');
  if(result){
    setSessionPharmacy(result);
  }else{
    setSessionPharmacy('');
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
    getValueForSessionPharmacy();


    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
   
   
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      //console.log(response);
    });
   
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };

  }, []);

  if (!IsReady && isLoggedIn != null) {
    return (
      <AppLoading
        startAsync={LoadFontsAndRestoreToken}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  }
  
  
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
      setSessionPassword,
      sessionPharmacy,
      setSessionPharmacy,
      expoPushToken,
      }}>
        
      <Navigation result={isLoggedIn}/>        
      
      </UserContext.Provider>  
    );

    async function sendPushNotification(expoPushToken) {
      const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { someData: 'goes here' },
      };
    
      await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
          Authorization:`key= AAAAQHDNhn4:APA91bG3V1PF8dyLJLcqD4aGPgzkZPIG8SP70hzCjQuYMky7VicqdbMM5VAw8LcUu-xsiQis9toezRxY2bFj7YTiBn8_tB4AR-LpyuSstMBLqgYXVy8FRWloVZUPZ4yrZvaHkORzip5J`,
        },
        body: JSON.stringify(message),
      });
      
    }
    
    async function registerForPushNotificationsAsync() {
       let token;
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
          token = (await Notifications.getDevicePushTokenAsync({ gcmSenderId: "276770424446" }));
       
         
  
         
      } else {
        alert('Must use physical device for Push Notifications');
      }
    
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
      console.log(token);
      setExpoPushToken(token.data);
    }

}