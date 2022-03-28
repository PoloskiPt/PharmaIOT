import { createStackNavigator } from "react-navigation-stack";
import Configuracoes from '../../screens/configuracoes';
import GerenciarAlarmes from "../../screens/gerenciarAlarmes";
import GerenciarContactos from "../../screens/gerenciarContactos";
import GerenciarUtilizadores from '../../screens/gerenciarUtilizadores';
import GerenciarUnidades from "../../screens/gerenciarUnidades";
import { createAppContainer } from "react-navigation";
import Header from "../../shared/header";
import HeaderConfiguracoes from "../../shared/headerConfiguracoes";
import React from 'react';
import { shadowColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const screens = {

    Configuracoes: {
        screen: Configuracoes,
        navigationOptions: ({ navigation }) => {
            return {
                header: () => <Header navigation ={navigation} title= 'Configurações' tipo='titulo'/>,
            }
        }
        
    },  
    GerenciarContactos: {
        screen: GerenciarContactos,
        navigationOptions:{
            title: 'Gerir Contactos',
            headerTitleAlign:'center',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: "#398BEA", height:80, borderWidth: 0,shadowColor: 'transparent'},
            headerTitleStyle: {fontWeight: 'bold', fontSize:22}
        }
    },  
    GerenciarAlarmes: {
        screen: GerenciarAlarmes,
        navigationOptions:{
            title: 'Gerir Alarmes',
            headerTitleAlign:'center',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: "#398BEA", height:80, borderWidth: 0,shadowColor: 'transparent'},
          headerTitleStyle: {fontWeight: 'bold', fontSize:22}
        }
    },  
    GerenciarUtilizadores: {
        screen: GerenciarUtilizadores,
        navigationOptions:{
            title: 'Gerir Utilizadores',
            headerTitleAlign:'center',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: "#398BEA", height:80, borderWidth: 0,shadowColor: 'transparent'},
          headerTitleStyle: {fontWeight: 'bold', fontSize:22}
        }
    },  
    GerenciarUnidades: {
        screen: GerenciarUnidades,
        navigationOptions:{         
            title: 'Gerir Unidades',
            headerTitleAlign:'center',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: "#398BEA", height:80, borderWidth: 0,shadowColor: 'transparent'},
            headerTitleStyle: {fontWeight: 'bold', fontSize:22}
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