import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import MonitorizacaoStack from "./monitorizacaoStack";
import ConsultaStack from "./consultaStack";
import RelatorioStack from "./relatorioStack";
import ConfiguracoesStack from "./configuracoesStack";
import PerfilStack from "./perfilStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {SafeAreaView, ScrollView, Dimensions,View, Text} from 'react-native';
import CustomDrawer from "./customDrawer";
import Icon from 'react-native-vector-icons/Ionicons';
import { borderColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { Platform, Image } from "react-native";


let teste = 'Igor Soares';

const RootDrawerNavigator = createDrawerNavigator({
    
    Perfil:{
        screen: PerfilStack,
        navigationOptions: {                           
            
            title:teste,               
            drawerIcon: (                          
                <Image source={require('../../assets/user.png')} style={{height:50, width:50, marginLeft:'50%', marginRight:'5%'}}/>
            ),
          }, 
    },

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
    Relatório: {
        screen: RelatorioStack,
        
        navigationOptions: {
            style:{
                color:'red'
            },
            drawerIcon: (             
                <Icon name='document' style={{height:40, width:40, marginLeft:'50%',color:'white', display:"flex"}} size={40}  type="Ionicons" />
            ),
          }, 
    },
    Configurações: {    
        screen: ConfiguracoesStack,   
        navigationOptions: {
            drawerIcon: (             
                <Icon name='settings' style={{height:40, width:40, marginLeft:'50%',color:'white', display:"flex"}} size={40}  type="Ionicons" />
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
            //borderColor:'red',
            //borderWidth:2,
            
        },
        activeTintColor: 'black',
        inactiveTintColor: 'white',
        activeBackgroundColor: '#398BEA',
        inactiveBackgroundColor: '#398BEA',
        labelStyle:{
            fontSize: 20,
            marginLeft: 10,         
        },          
    }
});
    

export default createAppContainer(RootDrawerNavigator);