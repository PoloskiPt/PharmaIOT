import React, {useRef, useState,useContext, useEffect} from 'react';
import {Text, View, ScrollView ,Modal, TouchableHighlight,TouchableOpacity,Image,FlatList, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {getNotifications} from '../functions/genericFunctions';
import {UserContext} from '../store/userContext';
import LottieView from 'lottie-react-native';
import { notificacoesStyles} from '../styles/global';



export default function Notifications({navigation}) {
    const {sessionDb} = useContext(UserContext);
    const [notificationsData, setNotificationsData] = useState();
    const animation = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    let notificationsExist = false;

    useEffect(async () => {
        console.log(sessionDb);
        let notificationsFetchResult = await getNotifications(sessionDb);
        console.log(notificationsFetchResult);
        setNotificationsData(notificationsFetchResult);
        if(notificationsData.message != "No data found"){
            notificationsExist = true;
        }
      
        console.log(notificationsData); 
        //console.log(notificationsData.length);
    }, [getNotifications])

  return (
   <View>
   
   <SafeAreaView>
                <View style={{display:'flex', height:'100%'}} >
                
            <View style={{backgroundColor: '#fff',alignItems: 'center',justifyContent: 'center', flex: 1,}}>
    
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
  

<View style={{backgroundColor: '#fff',alignItems: 'center',justifyContent: 'center', flex: 1,}}>
    
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
      
                <SafeAreaView>
                
             <FlatList
                 keyExtractor={(item) => item.input}
                 data={notificationsData}
                 renderItem={({item}) =>               
                 <View style={notificacoesStyles.notificationCard}>
                
                 <View style={{flex:1, flexDirection:'row', justifyContent: 'space-between', paddingBottom:10   }}>
                    
                 <View style={notificacoesStyles.statusView}>
                     <Text style={notificacoesStyles.notificationSubtitleText}>Data: </Text> 
                     <Text>{item['dt']}</Text>
                 </View>

                 <TouchableOpacity onPress={() => deleteSelectedElement(item['input'])}>              
                    <Image style={{height:35, width:35, marginRight:'2%'}} source= {require('../assets/success-notifications.png')}/>
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

       
                
            
                </View>   
                </SafeAreaView>   

   </View>
  
  
  );
}

