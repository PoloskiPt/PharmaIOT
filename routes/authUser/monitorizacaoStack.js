import { createStackNavigator } from "react-navigation-stack";
import Monitorizacao from "../../screens/monitorizacao";
import Header from "../../shared/header";
import React from 'react';

const screens = {

    Monitorizacao: {
        screen: Monitorizacao,
        navigationOptions: ({ navigation }) => {
            return {
                header: () => <Header navigation ={navigation} title='Monitorização' tipo='titulo'/>,
            }
        }
    },

}

const MonitorizacaoStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: {
            backgroundColor: "#eee",
            height: 80
        },
    }
});

export default MonitorizacaoStack;