import React, {useRef, useState} from 'react';
import {Text, View, ScrollView ,Modal, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { notificacoesStyles } from '../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

const NotificationModal = (props) => {
    const animation = useRef(null);
    let notificationsExist = false;
    let notificationsArray = [];
    const notificationData = props.route.params.notificationsData;  
        if(notificationData.message != "No data found"){
            notificationsExist = true;
            notificationData.map(element => {
            
            notificationsArray.push(
                <View key={element['input']} style={notificacoesStyles.notificationCard}>
                    
                    <View style={notificacoesStyles.statusView}>
                        <Text style={notificacoesStyles.notificationSubtitleText}>Data: </Text> 
                        <Text>{element['dt']}</Text>
                    </View>
        
                    <View style={notificacoesStyles.statusView}>
                        <Text style={notificacoesStyles.notificationSubtitleText}>Mensagem: 
                                {<Text style={{flexShrink: 1, fontSize:14}}> {element['message']}</Text>}
                        </Text>
                    </View>
                    
                    <View style={notificacoesStyles.statusView}>
                        <Text style={notificacoesStyles.notificationSubtitleText}>Status: </Text>
                        {element['solved'] === 1 ? <Text style={notificacoesStyles.statusResolved}>Resolvido</Text> : <Text style={notificacoesStyles.statusNotResolved}>Por resolver</Text>}
                    </View>
                    
                </View>
            )
           }); 
           
        }else{
            console.log("data das notificacoes: " + JSON.stringify(notificationData));
            notificationsExist = false;
        }    
        
 
  
  
    return (  

            <View >
                <Modal animationType="slide" 
                Visible={props.modalState} >      
                <SafeAreaView>
                <View style={{display:'flex', height:'100%'}} >
                <View style={notificacoesStyles.closeIcon}>
                <TouchableHighlight  >   
                <Icon name='close-outline' style={{color:'black'}} size={40}  type="Ionicons" onPress={() => props.navigation.pop()}/>
                </TouchableHighlight>
                </View>
                <ScrollView>
                    
                        
            { !notificationsExist && <View style={{backgroundColor: '#fff',alignItems: 'center',justifyContent: 'center', flex: 1,}}>
    
                        <LottieView
                                ref={animation}
                                style={{
                                height: 600,
                                backgroundColor: 'transparent',
                                }}
                                loop={true}
                                autoPlay={true}
                                // Find more Lottie files at https://lottiefiles.com/featured
                                source={require('../assets/no_notifications.json')}
                        /> 
            </View>   
  } 
           
                       
                    {notificationsExist && notificationsArray}
                </ScrollView>
                </View>   
                </SafeAreaView>        
                </Modal>    
            </View>
    );

                         

}


export default NotificationModal;

