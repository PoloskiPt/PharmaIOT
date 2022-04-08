import React, {useContext} from 'react';
import { StyleSheet, Text, View, ScrollView , Modal, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';


const NotificationModal = (props) => {
    console.log(props.modalState);
    
    //console.log(props.route.params.notificationsData[1]['pharmacy']);
    const notificationData = props.route.params.notificationsData;
    //console.log(notificationData);
    
    let teste = [];
   notificationData.map(element => {
    teste.push(
        <View key={element['input']} style={styles.notificationCard}>
            
            <View style={styles.statusView}>
                <Text style={styles.notificationSubtitleText}>Data: </Text> 
                <Text>{element['dt']}</Text>
            </View>

            <View style={styles.statusView}>
                <Text style={styles.notificationSubtitleText}>Mensagem: 
                          {<Text style={{flexShrink: 1, fontSize:14}}> {element['message']}</Text>}
                </Text>
            </View>
            
            <View style={styles.statusView}>
                <Text style={styles.notificationSubtitleText}>Status: </Text>
                {element['solved'] === 1 ? <Text style={styles.statusResolved}>Resolvido</Text> : <Text style={styles.statusNotResolved}>Por resolver</Text>}
            </View>
            
          
        </View>
    )
   }); 
  
    return (  

           <View >
              
                <Modal animationType='slide' visible={props.modalState}>         
                <SafeAreaView>
                <View style={{display:'flex', height:'100%'}} >
                <View style={styles.closeIcon}>
                <TouchableHighlight>   
                <Icon name='close-circle-outline' style={{color:'black'}} size={60}  type="Ionicons" onPress={() => props.navigation.pop()} />
                </TouchableHighlight>
                </View>
                <ScrollView>
                    {teste}
                </ScrollView>
                
                </View>   
                </SafeAreaView>        
                </Modal>    
              
            </View>
           
    );
}

export default NotificationModal;

const styles = StyleSheet.create({
    modalStyle:{
        position: 'absolute',
    },
    statusView:{
        flexDirection:'row',
        padding:2,
        alignItems:'center',
    },
    notificationCard:{
        borderRadius: 10,
        padding:10,
        elevation: 10,
        backgroundColor: '#fff',
        shadowOffset: {width: 1, height: 1},
        shadowColor: 'black',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        marginHorizontal: '1%',
        marginVertical: '1%',
    },
    closeIcon:{
        flexDirection:'row', 
        justifyContent:'center'
    },
    statusResolved:{
        color:'green',
        fontWeight:'600'
    },
    statusNotResolved:{
        color:'red',
        fontWeight:'600'
    },
    notificationSubtitleText:{
        fontSize:18,   
    }
})