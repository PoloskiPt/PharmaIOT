import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text,TouchableHighlight } from 'react-native';
import { globalStyles } from '../styles/global';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FlatButton from '../shared/button';
import PerfilCard from '../shared/perfilCard';
import * as SecureStore from 'expo-secure-store';
import md5 from 'md5';
import Spinner from 'react-native-loading-spinner-overlay';

export default function Perfil() {
  const navigateBack = useNavigation();
  let cardHeight = Platform.OS === 'android'? '90%': "90%";
  const [email, setEmail] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState();
  const [profileData, setProfileData] = useState([]);
  let response;
  const loginUrl= "https://app.pharmaiot.pt/pharmaiotApi/api/users/login.php";
  
  async function getValueForEmail(){
     
    let result = await SecureStore.getItemAsync('email');
    if(result){
      setEmail(result);
      return result;
    }else{
      setEmail('');
    }
  }

  async function getValueForPassword(){
     
    let result = await SecureStore.getItemAsync('pass');
    if(result){
      setPassword(md5(result));
      return md5(result);
    }else{
      setPassword('');
    }
  }

  useEffect( async () => {
    setIsLoading(true);
    getValueForEmail();
    getValueForPassword();  
    async function fetchMyAPI() {
      let email = await getValueForEmail();
      let password = await getValueForPassword();
       response = await fetch(loginUrl,{
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            email: email,
            pass: password
        })
    });
      const data = await response.json()
      setProfileData(data);  
      setIsLoading(false);
    }  
    
    fetchMyAPI();
  },[]);

  return (
   
    <View style={globalStyles.container}>
         
      {isLoading && <Spinner visible={isLoading}  textContent={'Loading...'}  textStyle={{color:'black'}}/>} 
      <SafeAreaView>
      <View style={styles.backIcon}>
      <TouchableHighlight>   
      <Icon name='arrow-back-outline' style={{color:'white'}} size={40}  type="Ionicons" onPress={() => navigateBack.navigate('homeScreen') }/>
      </TouchableHighlight>
      </View> 
      
      <PerfilCard height={cardHeight}>  
      
        <View style={styles.perfilContainer}>
            
            <View style={styles.borderContainer}>
              <Text style={styles.titleText}>Nome </Text>
            {profileData && <Text>{profileData.name}</Text>} 
             
            </View>   

            <View style={styles.borderContainer}>
              <Text style={styles.titleText}>Apelido </Text>
              {profileData && <Text>{profileData.surname}</Text>}
            </View>   
           
            <View style={styles.borderContainer}>
              <Text style={styles.titleText}>Endereço de e-mail </Text>
              {profileData && <Text>{profileData.email}</Text>}
            </View>
           
            <View style={styles.borderContainer}>
              <Text style={styles.titleText}>Contacto telefónico </Text>
              {profileData && <Text>{profileData.tel}</Text>}
            </View>
           
           
            <View style={styles.borderContainer}>
              <Text style={styles.titleText}>Morada </Text>
              {profileData && <Text>{profileData.address}</Text>}
            </View>

            <View style={styles.borderContainer}>
              <Text style={styles.titleText}>Cidade </Text>
              {profileData && <Text>{profileData.city}</Text>}
            </View>

            <View >
              <Text style={styles.titleText}>País </Text>
              {profileData && <Text>{profileData.country}</Text>}
            </View>
           
        </View> 
        <View style={styles.buttonContainer}> 
        <FlatButton 
         text="Salvar" 
         textColor= "white"
         fontFamily= 'roboto-light'
         color="#17A2B8" 
         borderRadius={25}    
         paddingVertical={11}
         paddingHorizontal={52}
         fontSize={16}
         onPress={() => alert('salvando...')}         
         />   
         </View> 
      </PerfilCard >
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  perfilContainer:{
    padding:28,
    height:'84%'
  },
  borderContainer:{
    borderBottomWidth:1 ,
    borderBottomColor: 'black',   
    paddingBottom: '3%',
    marginBottom: '3%'

  },
  buttonContainer:{
    width:'100%',
    marginTop:'10%',
    alignItems:'center',
    position:'relative',
  },
  backIcon:{
    marginRight: '78%',
    justifyContent: 'center',
    marginTop: '0.5%',
    marginBottom: '-5.5%',
},
  resultText:{
    fontSize:14
  },
  titleText:{
    fontSize: 20,
    fontFamily: 'roboto-bold',
  }
})