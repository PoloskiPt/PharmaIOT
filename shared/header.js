import React, {useContext, useEffect} from 'react';
import { StyleSheet, Text, View,Platform, StatusBar, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {getNotifications} from '../functions/genericFunctions';
import {UserContext} from '../store/userContext';


export default function Header( {navigation, title} ){
    const {sessionDb} = useContext(UserContext);
    const headerIconSize = Platform.OS === 'android' ? 30 : 40;
    
    const navigation2 = useNavigation();
    
    useEffect(() => {
      }, [sessionDb]);
   
    const openMenu = () => {
        navigation.openDrawer();
    }
   
    async function openNotifications(){

        let notificationsData = await getNotifications(sessionDb);
        navigation2.navigate('notificationsModal', {notificationsData});          

    }
   
        return(
            
            <View style={styles.header}>       
                <SafeAreaView style={{width:'100%', flex:1, flexDirection:'row', justifyContent: 'space-between'}}>
                <MaterialIcons name='menu' size={headerIconSize} onPress={openMenu} style={styles.iconHamburguer}/>
                <View style={styles.headerTitle}>  
                    <Text style={styles.headerText}>{title}</Text>
                </View>
                <MaterialIcons name='notifications' onPress={openNotifications} color="#FFBE72" size={headerIconSize} style={styles.iconNotifications}/>
                </SafeAreaView>
            </View>
        )
}

const styles = StyleSheet.create({
    header:{
        width: '100%',
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#398BEA",
        margin:0,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    headerText: {
        fontFamily: 'roboto-bold',
        fontSize: 30,
        color: 'white',
        letterSpacing: 1,  
    },
    iconHamburguer: {
        left:16,           
    },
    iconNotifications: {
        right:16,          
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