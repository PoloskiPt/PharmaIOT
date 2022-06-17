import { createStackNavigator } from "react-navigation-stack";
import Informacoes from '../../screens/informacoes';
import { createAppContainer } from "react-navigation";
import Header from "../../shared/header";
import HeaderInformacoes from "../../shared/headerInformacoes";
import React from 'react';

const screens = {

    Informacoess: {
        screen: Informacoes,
        navigationOptions: ({ navigation }) => {
            return {
                header: () => <Header navigation ={navigation} title= 'Informações' tipo='titulo'/>,
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


export default createAppContainer(ConfiguracoesStack);