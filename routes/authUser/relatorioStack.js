import { createStackNavigator } from "react-navigation-stack";
import Relatorio from '../../screens/relatorio';
import Header from "../../shared/header";
import React from 'react';

const screens = {

    Relatorio: {
        screen: Relatorio,
        navigationOptions: ({ navigation }) => {
            return {
                header: () => <Header navigation ={navigation} title= 'Relatório' />,
            }
        }
    },
}

const RelatorioStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: {
            backgroundColor: "#eee",
            height: 80
        },
    }
});

export default RelatorioStack;