import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import homeScreen from '../../screens/homeScreen';
import Login from '../../screens/login';
import NotificationsModal from '../../screens/notificationsModal';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { CredentialsContext } from '../../store/CredentialsContext';
import * as SecureStore from 'expo-secure-store';
import ImageStylePropTypes from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedImageStylePropTypes';

const Stack = createStackNavigator();



const Navigation = ({result}) =>{
    console.log(" navegação: " + result);
    if(result == true){
        return (           
            <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="homeScreen" component={homeScreen} />   
            <Stack.Screen name="Login" component={Login} initialParams={{sessao:2}} />                                                                                            
            <Stack.Screen name="notificationsModal" component={NotificationsModal} />
            </Stack.Navigator>
         </NavigationContainer>                   
);
    }else{
        return (           
            <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login} />        
                 <Stack.Screen name="homeScreen" component={homeScreen} />                                                                                
                <Stack.Screen name="notificationsModal" component={NotificationsModal} />
            </Stack.Navigator>
         </NavigationContainer>                   
);
    }

};

export default Navigation;