import React, {useRef, useState,useContext, useEffect} from 'react';
import {Text, View,TouchableOpacity,Image,FlatList, Alert, RefreshControl} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {getNotifications} from '../functions/genericFunctions';
import {UserContext} from '../store/userContext';
import LottieView from 'lottie-react-native';
import { notificacoesStyles} from '../styles/global';
import Spinner from 'react-native-loading-spinner-overlay';

const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

export default function Notifications() {
    const {sessionDb} = useContext(UserContext);
    const [notificationsData, setNotificationsData] = useState();
    const animation = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [notificationsExist, setNotificationsExist] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const updateAlertStatus = "https://app.pharmaiot.pt/api/api/monitorizacao/update_alert_status.php";

    const deleteSelectedElement = (id) => {
 
        Alert.alert(
          'Tem a certeza que pretende definir este alerta como resolvido? ',
          '',
          [
            { text: 'Cancelar', onPress: () => { return; } },
            {
              text: 'Sim', onPress: () => {
                // Filter Data 

                updateInformation(id);
                const filteredData = notificationsData.filter(item => item.input !== id);
                //Updating List Data State with NEW Data.
                setNotificationsData(filteredData);
              }
            },
          ])
      }

    async function updateInformation(id)  {
        let response = await fetch(updateAlertStatus,{
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
        
         const data = await response.json();
     
     }

    const refreshInformation = async () => {
        setRefreshing(true);
        let notificationsFetchResult = await getNotifications(sessionDb);
        setNotificationsData(notificationsFetchResult);
        wait(1600).then(() => setRefreshing(false));
    }

    useEffect(async () => {
        setIsLoading(true);
        console.log(sessionDb);
        let notificationsFetchResult = await getNotifications(sessionDb);
        console.log(notificationsFetchResult);
        setNotificationsData(notificationsFetchResult);
        setIsLoading(false);
      
        if(notificationsFetchResult.message != "No data found"){
            setNotificationsExist(true);
        }
 
        console.log("notifications result: " + notificationsExist);
        //console.log(notificationsData.length);
    }, [getNotifications])

  return (
    
   <SafeAreaView style={{backgroundColor: '#398BEA',height:'100%'}}>
     {isLoading && <Spinner visible={isLoading}  textContent={'Loading...'}  textStyle={{color:'black'}}/>} 
   

{isLoading === false && notificationsExist === false &&
    <View style={{backgroundColor: '#fff',alignItems: 'center',justifyContent: 'center', flex: 1,height:'100%'}}>
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
   
{isLoading === false && notificationsExist === true &&
            
    <FlatList
        style={{height:'100%'}}
        refreshControl={
            <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshInformation}         
            />
        }
        keyExtractor={(item) => item.input}
        data={notificationsData}
        renderItem={({item}) =>               
        <View style={notificacoesStyles.notificationCard}>
       
        <View style={{flex:1, flexDirection:'row', justifyContent: 'space-between', paddingBottom:10}}>
           
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

}                                                
                </SafeAreaView>   
  
  );
}

