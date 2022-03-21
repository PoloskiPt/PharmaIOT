import { createStackNavigator } from "react-navigation-stack";
import Monitorizacao from "../../screens/monitorizacao";
import ReviewDetails from "../../screens/reviewDetails";
import Header from "../../shared/header";
import React from 'react';

const screens = {

    Monitorizacao: {
        screen: Monitorizacao,
        navigationOptions: ({ navigation }) => {
            return {
                header: () => <Header navigation ={navigation} title='Monitorização' />,
            }
        }
    },
    ReviewDetails: {
        screen: ReviewDetails,
        navigationOptions:{
            title: 'Review Details',
              //headerStyle: {backgroundColor: "#eee"}
        }
    }

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