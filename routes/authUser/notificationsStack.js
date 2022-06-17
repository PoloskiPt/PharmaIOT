import { createStackNavigator } from "react-navigation-stack";
import Notifications from '../../screens/notificationScreen';
import Header from "../../shared/header";
import React from 'react';

const screens = {

    Notifications: {
        screen: Notifications,
        navigationOptions: ({ navigation }) => {
            return {
                header: () => <Header navigation ={navigation} title= 'Notificações' tipo='titulo'/>,
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