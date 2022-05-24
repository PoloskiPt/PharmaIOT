import React from 'react';
import { StyleSheet, Text, View, ScrollView ,Modal, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { notificacoesStyles } from '../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';

const NotificationModal = (props) => {
    const notificationData = props.route.params.notificationsData;  
   
    let notificationsArray = [];
   
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
                    {notificationsArray}
                </ScrollView>
                </View>   
                </SafeAreaView>        
                </Modal>    
            </View>
    );
}

export default NotificationModal;

