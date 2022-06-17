import { createDrawerNavigator} from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import MonitorizacaoStack from "./monitorizacaoStack";
import ConsultaStack from "./consultaStack";
import NotificationsStack from "./notificationsStack";
import InformacoesStack from "./informacoesStack";
import CustomDrawer from "./customDrawer";
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { Platform } from "react-native";
import React from "react";

const RootDrawerNavigator = createDrawerNavigator({
    
    Monitorização:  {
        screen: MonitorizacaoStack,     
        navigationOptions: {
            drawerIcon: (             
                <Icon name='folder-open' style={{height:40, width:40, marginLeft:'50%',color:'white', display:"flex"}} size={40}  type="Ionicons" />
            ),
          }, 
    },
    Consulta: {
        screen: ConsultaStack,
        navigationOptions: {         
            
            drawerIcon: (             
                <Icon name='bar-chart' style={{height:40, width:40, marginLeft:'50%',color:'white', display:"flex"}} size={40}  type="Ionicons" />
            ),
          }, 
    },   
    Notificações: {
        screen: NotificationsStack,
        
        navigationOptions: {
            style:{
                color:'red'
            },
            drawerIcon: (             
                <Icon1 name='bell-o' style={{height:40, width:40, marginLeft:'50%',color:'white', display:"flex"}} size={40}  type="FontAwesome" />
            ),
          }, 
    },
    Informações: {    
        screen: InformacoesStack,   
        navigationOptions: {
            drawerIcon: (             
                <Icon name='information-circle-outline' style={{height:40, width:40, marginLeft:'50%',color:'white', display:"flex"}} size={40}  type="Ionicons" />
            ),
          }, 
    },

}, {
    contentComponent: CustomDrawer,
    initialRouteName: 'Monitorização',
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
      },
    }),
    contentOptions: {
        itemsContainerStyle:{
            width: '100%',
        },
        itemStyle: {     
            marginBottom: Platform.OS === 'android'? '1%': '5%',   
        },
        activeTintColor: 'black',
        inactiveTintColor: 'white',
        activeBackgroundColor: '#398BEA',
        inactiveBackgroundColor: '#398BEA',
        labelStyle:{
            fontWeight:'normal',
            fontSize: 22,
            marginLeft: 10,  
            fontFamily: 'roboto-regular',       
        },          
    }
});
    

export default createAppContainer(RootDrawerNavigator);