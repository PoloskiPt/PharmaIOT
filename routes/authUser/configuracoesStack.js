import { createStackNavigator } from "react-navigation-stack";
import Configuracoes from '../../screens/configuracoes';
import Header from "../../shared/header";
import React from 'react';

const screens = {

    Configuracoes: {
        screen: Configuracoes,
        navigationOptions: ({ navigation }) => {
            return {
                header: () => <Header navigation ={navigation} title= 'Configurações' />,
            }
        }
    },
}

const ConfiguracoesStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: {
            backgroundColor: "#eee",
            height: 80
        },
    }
});

export default ConfiguracoesStack;