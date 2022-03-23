import React, {useState} from 'react';
import {View, Text} from 'react-native';
import homeScreen from '../../screens/homeScreen';
import Login from '../../screens/login';
import NotificationsModal from '../../screens/notificationsModal';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { CredentialsContext } from '../../store/CredentialsContext';


const Stack = createStackNavigator();

const Navigation = () =>{
       
    return (
       
                 <NavigationContainer>
                 <Stack.Navigator screenOptions={{headerShown: false}}>
                 <Stack.Screen name="Login" component={Login} />        
                      <Stack.Screen name="homeScreen" component={homeScreen} />                                                                                
                     <Stack.Screen name="notificationsModal" component={NotificationsModal} />
                 </Stack.Navigator>
              </NavigationContainer>
       

            
        
    );
};

export default Navigation;