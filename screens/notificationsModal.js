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
    const [input,setInput] = useState();
    const {sessionDb} = useContext(UserContext);
    let notificationsExist = false;
    let notificationsArray = [];
    const [notificationsData, setNotificationsData] = useState(props.route.params.notificationsData);

    const saveProfileDataUrl = "https://app.pharmaiot.pt/api/api/monitorizacao/update_alert_status.php";
   

    const deleteSelectedElement = (id) => {
 
        Alert.alert(
          'Tem a certeza que pretende realizar esta operação? ',
          'Selecione uma das opções',
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
    response = await fetch(saveProfileDataUrl,{
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
    deleteSelectedElement(id);
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
                 <View key={item['input']}   style={notificacoesStyles.notificationCard}>
                 <TouchableOpacity onPress={() =>  updateInformation(item['input']) && deleteSelectedElement(item['input'])}>
                <View style={loginStyles.informacoesSection}>
                <Image style={loginStyles.loginIcons}source= {require('../assets/info.png')}/>
                <Text>{item['input']}</Text>
                </View> 
                </TouchableOpacity> 
                 <View style={notificacoesStyles.statusView}>
                     <Text style={notificacoesStyles.notificationSubtitleText}>Data: </Text> 
                     <Text>{item['dt']}</Text>
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

