import React from 'react';
import { StyleSheet, Text, View, Image, Modal,TouchableWithoutFeedback, Keyboard, Dimensions,Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HeaderConfiguracoes( {navigation, title} ){
    
   
    const openMenu = () => {
        //navigation.openDrawer();
        navigation.navigate('Configuracoes');
    }

    let headerIconSize = Platform.OS === 'android' ? 30 : 40;

    return(
        <View style={styles.header}>
            <Icon name='arrow-back-outline' size={headerIconSize} onPress={openMenu} style={styles.iconHamburguer}  type="Ionicons" />
            <View style={styles.headerTitle}>
                <Text style={styles.headerText}>{title}</Text>
            </View>
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
        top: Platform.OS === 'android'? 34: 40,   
        color:'white'  
    },
    iconNotifications: {
        position: 'absolute',
        right:16,
        top: Platform.OS === 'android'? 34: 40,  

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