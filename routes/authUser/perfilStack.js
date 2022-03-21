import { createStackNavigator } from "react-navigation-stack";
import Perfil from '../../screens/perfil';
import Header from "../../shared/header";
import React from 'react';

const screens = {

    Perfil: {
        screen: Perfil,
        navigationOptions: ({ navigation }) => {
            return {
                header: () => <Header navigation ={navigation} title= 'Perfil' />,
            }
        }
    },
}

const PerfilStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: {
            backgroundColor: "#eee",
            height: 80
        },
    }
});

export default PerfilStack;