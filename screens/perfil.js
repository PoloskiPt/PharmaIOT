import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text,TouchableHighlight, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
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
  const [btnEditText,setBtnEditText] = useState('Editar');
  const [btnEditColor,setBtnEditColor] = useState('#FFC222');
  const [editableState, setEditableState] = useState(false);
  
  // use states updated values
 
  const [emailUpdate,setEmailUpdate] = useState();
  const [addressUpdate, setAddressUpdate] = useState();
  const [cityUpdate, setCityUpdate] = useState();
  const [countryUpdate, setCountryUpdate] = useState();
  const [phoneUpdate, setPhoneUpdate] = useState();
  const [nameUpdate, setNameUpdate] = useState();
  const [surnameUpdate, setSurnameUpdate] = useState();
 

  let response;
  const loginUrl= "https://app.pharmaiot.pt/pharmaiotApi/api/users/login.php";
  
  async function getValueForEmail(){
     
    let result = await SecureStore.getItemAsync('sessionEmail');
    if(result){
      setEmail(result);
      return result;
    }else{
      setEmail('');
    }
  }

  const editButtonLogic = () => {

    if(btnEditText == "Editar"){ setBtnEditText('Confirmar'); setEditableState(true); setBtnEditColor("#4CBB17");}     
     
    else{ setBtnEditText('Editar'); setEditableState(false); setBtnEditColor("#FFC222"); }  
     
    console.log(profileData);
    console.log(nameUpdate);
    console.log(surnameUpdate);
    console.log(emailUpdate);
    console.log(phoneUpdate);
    console.log(addressUpdate);
    console.log(cityUpdate);
    console.log(countryUpdate);

    
  }

  async function getValueForPassword(){
     
    let result = await SecureStore.getItemAsync('sessionPassword');
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
      <ScrollView>
      <KeyboardAvoidingView>
        <View style={styles.perfilContainer}>
            
            <View style={styles.borderContainer}>
              <Text style={styles.titleText}>Nome </Text>
            {profileData && <TextInput 
            style={{color:'black'}} 
            editable = {editableState}
            onChangeText={(text) => setNameUpdate(text)}
            >
              {profileData.name}</TextInput>} 
             
            </View>   

            <View style={styles.borderContainer}>
              <Text style={styles.titleText}>Apelido </Text>
              {profileData && <TextInput 
              style={{color:'black'}} 
              editable = {editableState}
              onChangeText={(text) => setSurnameUpdate(text)}
              >
                {profileData.surname}</TextInput>}
            </View>   
           
            <View style={styles.borderContainer}>
              <Text style={styles.titleText}>Endereço de e-mail </Text>
              {profileData && <TextInput 
              style={{color:'black'}} 
              editable = {editableState}
              onChangeText={(text) => setEmailUpdate(text)}
              >
                {profileData.email}</TextInput>}
            </View>
           
            <View style={styles.borderContainer}>
              <Text style={styles.titleText}>Contacto telefónico </Text>
              {profileData && <TextInput 
              style={{color:'black'}} 
              editable = {editableState} 
              onChangeText={(val) => setPhoneUpdate(val)}
              >
                {profileData.tel}</TextInput>}
            </View>
           
            <View style={styles.borderContainer}>
                <Text style={styles.titleText}>Morada </Text>
                {
                  profileData && 
                  <TextInput 
                    style={{color:'black'}} 
                    editable = {editableState}
                    onChangeText={(val) => setAddressUpdate(val)}
                  >
                     {profileData.address}
                  </TextInput>
                }
            </View>

            <View style={styles.borderContainer}>
              <Text style={styles.titleText}>Cidade </Text>
              {
                  profileData && 
                  <TextInput 
                      style={{color:'black'}} 
                      editable = {editableState}
                      onChangeText={(val) => setCityUpdate(val)}
                  >
                       {profileData.city}
                  </TextInput>
              }
            </View>

            <View style={styles.borderContainer}>
              <Text style={styles.titleText}>País </Text>
              {profileData && <TextInput style={{color:'black'}} 
              editable = {editableState}
              onChangeText={(val) => setCountryUpdate(val)}
              >
                {profileData.country}</TextInput>}
            </View>
           
        </View> 
        <View style={styles.buttonContainer}> 
        <FlatButton 
         text={btnEditText}
         textColor= "white"
         fontFamily= 'roboto-medium'
         color={btnEditColor}
         borderRadius={25}    
         paddingVertical={11}
         paddingHorizontal={40}
         fontSize={20}
         onPress={editButtonLogic}         
         />   
         </View> 
         </KeyboardAvoidingView>
         </ScrollView>
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
    marginTop:'6%',
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