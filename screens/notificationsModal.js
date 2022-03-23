import React, {useContext} from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground, Modal,TouchableWithoutFeedback, Keyboard} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions'
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../store/CredentialsContext';





const NotificationModal = ({navigation, modalState}) => {
    console.log('teste');
    console.log(modalState);

    const clearLogin = () => {
        AsyncStorage.removeItem('flowerCribCredentials')
        .then(()=> {
            setStoredCredentials("");
        })
        .catch(error => console.log(error))
    }
    
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
   
    return (  
       // navigation2.navigate('notificationsModal');
            <View style={{marginTop:30}}>
                <Modal animationType='slide' visible={modalState}>
                <View style={{marginTop:40}}>
                <Button onPress={() => navigation.pop()} title="Dismiss" />
                <Button title ="logout" onPress={clearLogin}></Button>        
                </View>
                </Modal>            
            </View>
    );
}


export default NotificationModal;

const styles = StyleSheet.create({
    modalStyle:{
        position: 'absolute',
    }
})