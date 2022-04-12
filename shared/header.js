import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Modal,TouchableWithoutFeedback, Keyboard, Dimensions,Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import NotificationsModal from '../screens/notificationsModal';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationEvents } from 'react-navigation';



export default function Header( {navigation, title, tipo} ){
    const navigation2 = useNavigation();
    const tipoHeader = {tipo};
    const openMenu = () => {
        navigation.openDrawer();
    }
    const numbers = [1, 2, 3, 4, 5];
    const notificationsUrl= "https://app.pharmaiot.pt/pharmaiotApi/api/monitorizacao/getAlarmHistory.php";

    //passar a farmacia por parametro mais tarde.
    async function getNotifications() {
    let reqs = await fetch(notificationsUrl,{
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'charset': 'utf-8',
        },
    });
    let resp = await reqs.json()
    .then(console.log())
    .catch((error) => alert(error))
    //console.log(resp);
    return resp;

    }

    async function openNotifications(){

        let notificationsData = await getNotifications();
        //console.log(notificationsData);
        navigation2.navigate('notificationsModal', {notificationsData});          

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