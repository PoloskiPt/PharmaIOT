import React, {useRef, useState,useContext, useEffect} from 'react';
import {Text, View, ScrollView ,Modal, TouchableHighlight,TouchableOpacity,Image,FlatList, Alert} from 'react-native';
import {UserContext} from '../store/userContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { notificacoesStyles,loginStyles } from '../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import {getNotifications} from '../functions/genericFunctions';

const NotificationModal = (props) => {
    const animation = useRef(null);
    const {sessionDb} = useContext(UserContext);
    let notificationsExist = false;
    const [notificationsData, setNotificationsData] = useState(props.route.params.notificationsData);

    const saveProfileDataUrl = "https://app.pharmaiot.pt/api/api/monitorizacao/update_alert_status.php";
   
    const deleteSelectedElement = (id) => {
 
        Alert.alert(
          'Tem a certeza que pretende definir este alerta como resolvido? ',
          '',
          [
            { text: 'Cancelar', onPress: () => { } },
            {
              text: 'Sim', onPress: () => {
                // Filter Data 
                const filteredData = notificationsData.filter(item => item.input !== id);
                //Updating List Data State with NEW Data.
                setNotificationsData(filteredData);
              }
            },
          ])
      }

  async function updateInformation(id)  {
   let response = await fetch(saveProfileDataUrl,{
        method: 'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
           
          input: id,
          solved: "1",
          db_name: sessionDb,
          username: sessionDb
        })
      
    });
    const data = await response.json()
  
}

        if(notificationsData.message != "No data found"){
            notificationsExist = true;           
            console.log(notificationsData);
        }else{       
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
           
                {notificationsExist && 
                
                <SafeAreaView>
                
             <FlatList
                 keyExtractor={(item) => item.input}
                 data={notificationsData}
                 renderItem={({item}) =>               
                 <View style={notificacoesStyles.notificationCard}>
                
                 <View style={{flex:1, flexDirection:'row', justifyContent: 'space-between'}}>
                    
                 <View style={notificacoesStyles.statusView}>
                     <Text style={notificacoesStyles.notificationSubtitleText}>Data: </Text> 
                     <Text>{item['dt']}</Text>
                 </View>

                 <TouchableOpacity onPress={() =>  updateInformation(item['input']) && deleteSelectedElement(item['input'])}>
                    <View style={loginStyles.informacoesSection}>
                    <Image style={loginStyles.loginIcons}source= {require('../assets/success-notifications.png')}/>
                    </View> 
                </TouchableOpacity> 
                    
                </View>       
                 
                 <View style={notificacoesStyles.statusView}>
                     <Text style={notificacoesStyles.notificationSubtitleText}>Mensagem: 
                             {<Text style={{flexShrink: 1, fontSize:14}}> {item['message']}</Text>}
                     </Text>
                 </View>
                 
                 <View style={notificacoesStyles.statusView}>
                     <Text style={notificacoesStyles.notificationSubtitleText}>Status: </Text>
                     {item['solved'] === 1 ? <Text style={notificacoesStyles.statusResolved}>Resolvido</Text> : <Text style={notificacoesStyles.statusNotResolved}>Por resolver</Text>}
                 </View>
                 
             </View>
             }
             />
     
     </SafeAreaView>         

                }       
                
            
                </View>   
                </SafeAreaView>   
                    
                </Modal>    
            </View>
    );

                         

}


export default NotificationModal;

