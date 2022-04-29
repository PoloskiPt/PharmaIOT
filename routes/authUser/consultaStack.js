import { createStackNavigator } from "react-navigation-stack";
import Consulta from '../../screens/consulta';
import Header from "../../shared/header";
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const screens = {

    Consulta: {
        screen: Consulta,
        navigationOptions: ({ navigation }) => {
            return {
                header: () => <Header navigation ={navigation} title= 'Consulta' tipo='titulo'/>,
            }    
        }
    },
}

const ConsultaStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: {
            backgroundColor: "#eee",          
        },             
    }
});

export default ConsultaStack;