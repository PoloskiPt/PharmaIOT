import React, {useEffect, useState, useRef, useContext} from 'react';
import { StyleSheet, View, Text,TouchableHighlight, TextInput, KeyboardAvoidingView, ScrollView, Keyboard,TouchableWithoutFeedback, Button } from 'react-native';
import { globalStyles,perfilStyles } from '../styles/global';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FlatButton from '../shared/button';
import PerfilCard from '../shared/perfilCard';
import * as SecureStore from 'expo-secure-store';
import md5 from 'md5';
import Spinner from 'react-native-loading-spinner-overlay';
import {save} from '../functions/genericFunctions';
import LottieView from 'lottie-react-native';
import {UserContext} from '../store/userContext';

export default function Perfil(props) {
  const animation = useRef(null);
  const navigateBack = useNavigation();
  let cardHeight = Platform.OS === 'android'? '90%': "90%";
  const [email, setEmail] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState();
  const [profileData, setProfileData] = useState([]);
  const [btnEditText,setBtnEditText] = useState('Editar');
  const [btnEditColor,setBtnEditColor] = useState('#FFC222');
  const [editableState, setEditableState] = useState(false);
  const [animationState, setAnimationState] = useState(false);
  const {sessionDb} = useContext(UserContext);
  // use states updated values
 
  const [emailUpdate,setEmailUpdate] = useState();
  const [addressUpdate, setAddressUpdate] = useState();
  const [cityUpdate, setCityUpdate] = useState();
  const [countryUpdate, setCountryUpdate] = useState();
  const [phoneUpdate, setPhoneUpdate] = useState();
  const [nameUpdate, setNameUpdate] = useState();
  
  const [surnameUpdate, setSurnameUpdate] = useState();
  const [userId, setUserId] = useState();
 

  let response;
  const loginUrl= "https://app.pharmaiot.pt/api/api/users/login.php";
  
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
     
    else{ setBtnEditText('Editar'); setEditableState(false); setBtnEditColor("#FFC222"); updateInformation(); setAnimationState(true); animation.current?.play(); }  
     
    
  }

  const saveProfileDataUrl = "https://app.pharmaiot.pt/api/api/users/update_profile_info.php";
  
  async function updateInformation()  {
    response = await fetch(saveProfileDataUrl,{
        method: 'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
          email: email,
          address: addressUpdate,
          city: cityUpdate,
          country : countryUpdate,
          tel : phoneUpdate,
          name : nameUpdate,
          surname : surnameUpdate,
          pass : password,
          input : userId,
          db_name: sessionDb,
          username: sessionDb
        })
    });
    const data = await response.json()
    save('name', nameUpdate + ' ' + surnameUpdate);
    
  }

  async function getValueForPassword(){
     
    let result = await SecureStore.getItemAsync('sessionPassword');
    if(result){
      setPassword(md5(result));
      //console.log(md5(result));
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
            pass: password,
            db_name: sessionDb,
            username: sessionDb
        })
    });
      const data = await response.json()
     // console.log(data);
      setEmailUpdate(data.email);
      setAddressUpdate(data.address);
      setCityUpdate(data.city);
      setCountryUpdate(data.country);
      setPhoneUpdate(data.tel);
      setNameUpdate(data.name);
      setSurnameUpdate(data.surname);
      setUserId(data.input);
      setProfileData(data);  
      setIsLoading(false);
      
    } 

    
    fetchMyAPI();
  },[sessionDb]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View onPress={Keyboard.dismiss} style={globalStyles.container}>
         
      {isLoading && <Spinner visible={isLoading}  textContent={'Loading...'}  textStyle={{color:'black'}}/>} 
      <SafeAreaView >
      <View style={perfilStyles.backIcon}>
      <TouchableHighlight>   
      <Icon name='arrow-back-outline' style={{color:'white'}} size={40}  type="Ionicons" onPress={() => navigateBack.pop()}/>
      </TouchableHighlight>
      </View> 
      
      <PerfilCard height={cardHeight}>  
   
      <ScrollView>
      <KeyboardAvoidingView>
        <View style={perfilStyles.perfilContainer}>
        
           <View style={perfilStyles.success}>

  
              <LottieView
              ref={animation}
              style={{
                width: 220,
                height: 220,
                backgroundColor: 'transparent',
                zIndex:1
              }}
              loop={false}
              onAnimationFinish = {() => navigateBack.pop()}
              autoPlay={false}
              // Find more Lottie files at https://lottiefiles.com/featured
              source={require('../assets/success.json')}
            />
          </View>

            <View style={perfilStyles.borderContainer}>
              <Text style={perfilStyles.titleText}>Nome </Text>
            {profileData && <TextInput 
            style={perfilStyles.inputText} 
            editable = {editableState}
            onChangeText={(text) => setNameUpdate(text)}
            >
              {profileData.name}</TextInput>} 
             
            </View>   

            <View style={perfilStyles.borderContainer}>
              <Text style={perfilStyles.titleText}>Apelido </Text>
              {profileData && <TextInput 
              style={perfilStyles.inputText} 
              editable = {editableState}
              onChangeText={(text) => setSurnameUpdate(text)}
              >
                {profileData.surname}</TextInput>}
            </View>   
           
            <View style={perfilStyles.borderContainer}>
              <Text style={perfilStyles.titleText}>Endereço de e-mail </Text>
              {profileData && <TextInput 
              style={perfilStyles.inputText} 
              editable = {editableState}
              onChangeText={(text) => setEmailUpdate(text)}
              >
                {profileData.email}</TextInput>}
            </View>
           
            <View style={perfilStyles.borderContainer}>
              <Text style={perfilStyles.titleText}>Contacto telefónico </Text>
              {profileData && <TextInput 
              style={perfilStyles.inputText} 
              editable = {editableState} 
              onChangeText={(val) => setPhoneUpdate(val)}
              >
                {profileData.tel}</TextInput>}
            </View>
           
            <View style={perfilStyles.borderContainer}>
                <Text style={perfilStyles.titleText}>Morada </Text>
                {
                  profileData && 
                  <TextInput 
                  style={perfilStyles.inputText} 
                    editable = {editableState}
                    onChangeText={(val) => setAddressUpdate(val)}
                  >
                     {profileData.address}
                  </TextInput>
                }
            </View>

            <View style={perfilStyles.borderContainer}>
              <Text style={perfilStyles.titleText}>Cidade </Text>
              {
                  profileData && 
                  <TextInput 
                  style={perfilStyles.inputText} 
                      editable = {editableState}
                      onChangeText={(val) => setCityUpdate(val)}
                  >
                       {profileData.city}
                  </TextInput>
              }
            </View>

            <View style={perfilStyles.borderContainer}>
              <Text style={perfilStyles.titleText}>País </Text>
              {profileData && <TextInput style={perfilStyles.inputText} 
              editable = {editableState}
              onChangeText={(val) => setCountryUpdate(val)}
              >
                {profileData.country}</TextInput>}
            </View>
           
        </View> 
        <View style={perfilStyles.buttonContainer}> 
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
</TouchableWithoutFeedback>
  );
}

