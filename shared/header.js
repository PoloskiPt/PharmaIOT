import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Modal,TouchableWithoutFeedback, Keyboard, Dimensions,Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import NotificationsModal from '../screens/notificationsModal';
import { useNavigation } from '@react-navigation/native';



export default function Header( {navigation, title} ){
    const navigation2 = useNavigation();
   
    const openMenu = () => {
        navigation.openDrawer();
    }

    const openNotifications = () =>{
       // alert('aqui vai abrir o modal');
      /*  navigation2.reset({
            index: 0,
            routes: [{ name: 'notificationsModal' }],
          });*/
          navigation2.navigate('notificationsModal');
          
    }

    let headerIconSize = Platform.OS === 'android' ? 30 : 40;

    return(
        <View style={styles.header}>
            <MaterialIcons name='menu' size={headerIconSize} onPress={openMenu} style={styles.iconHamburguer}/>
            <View style={styles.headerTitle}>

                <Text style={styles.headerText}>{title}</Text>
            </View>
            <MaterialIcons name='notifications' onPress={openNotifications} color="#FFBE72" size={headerIconSize} style={styles.iconNotifications}/>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        width: '100%',
        height: '100%',
        //flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        backgroundColor: "#398BEA",
        margin:0,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white',
        letterSpacing: 1,
        marginTop: Platform.OS === 'android'? 16: 40,
    },
    iconHamburguer: {
        position: 'absolute',
        left:16,
        top: Platform.OS === 'android'? '38%': '50%',     
    },
    iconNotifications: {
        position: 'absolute',
        right:16,
        top: Platform.OS === 'android'? '38%': '50%',  

    },
    headerTitle:{
        flexDirection: 'row'
    },
    headerImage:{
        width:26,
        height:26,       
        marginHorizontal: 10,
    } 
});