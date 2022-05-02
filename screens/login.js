import React, {useState, useContext, useEffect} from 'react';

import {View, Text, TouchableWithoutFeedback, Keyboard,Image, TextInput} from 'react-native';
import { loginStyles } from '../styles/global';
import Card from '../shared/card';
import CheckBox from 'react-native-check-box';
import FlatButton from '../shared/button';
import { useNavigation } from '@react-navigation/native';
import md5 from 'md5';
import { UserContext } from '../store/userContext';
import {save, deleteItem, storeNotificationToken} from '../functions/genericFunctions';
import * as SecureStore from 'expo-secure-store';


export default function Login(){
const [name, setName] = useState('');
const [result, onChangeResult] = useState('');    
      
const {contextEmail, 
    setContextEmail ,
    contextPassword,
    setContextPassword, 
    contextRememberMe, 
    setContextRememberMe,
    setSessionEmail,
    setSessionPassword,
    sessionPharmacy, 
    setSessionPharmacy,
    expoPushToken
} = useContext(UserContext);

async function getValueForEmail(){
     
    let result = await SecureStore.getItemAsync('email');
    if(result){
      setContextEmail(result);
    }else{
      setContextEmail('');
    }
  }

async function getValueForPassword(){
     
    let result = await SecureStore.getItemAsync('pass');
    if(result){
      setContextPassword(result);
    }else{
      setContextPassword('');
    }
  }

async function getValueFor(key){
    let result = await SecureStore.getItemAsync(key);
    if(result){
        onChangeResult(result);
    }else{
        alert('Inválid key')
    }
}

const [checkBoxState, setCheckBoxState]  = useState(false);
const [email, setEmail] = useState(null);
const [password, setPassword] = useState(null);
const [passwordVisible, setPasswordVisible] = useState(true);   
const navigation = useNavigation();
const img1 = require('../assets/eye-slash-solid.png');
const [imageAsset, setImageAsset] = useState(img1);
const [message, setMessage] = useState(null);

const hideShowPassword = () => {
    setPasswordVisible(!passwordVisible);
   
    if(passwordVisible == true){
        
        const slasheye = require('../assets/eye-slash-solid.png');
        setImageAsset(slasheye);
    }else{
        const eye = require('../assets/eye-solid.png');
        setImageAsset(eye);
    }
}

useEffect(() => {
    setEmail(contextEmail);
    setPassword(contextPassword);
    if(contextRememberMe == "true"){     
        setEmail(contextEmail);
        setCheckBoxState(true);   
    }else{
        setPassword(contextPassword);
        setCheckBoxState(false);
    }
}, [contextEmail, setContextEmail ,contextPassword,setContextPassword, contextRememberMe, setContextRememberMe])

const loginUrl= "https://app.pharmaiot.pt/pharmaiotApi/api/users/login.php";

//fazer Login
async function login(){  
    
    let reqs = await fetch(loginUrl,{
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            email: email,
            pass: md5(password)
        })
    });
    let resp = await reqs.json()
    .then(console.log())
    .catch((error) => alert(resp.error))

    if(checkBoxState === true){
        setContextRememberMe("true");  
        save('rememberMe', "true");
        save('email', email);
        save('pass', password);
        save('name', resp.name + ' ' + resp.surname);
        save('pharmacy', resp.pharmacy);
        getValueForEmail();
        getValueForPassword();
   
    }else if(checkBoxState === false){
        setContextRememberMe("false");  
        deleteItem('rememberMe', 'false');
        deleteItem('pass', '');
        deleteItem('email', '');
        getValueForEmail();
        getValueForPassword();
    }
    getValueFor('email');
    getValueFor('pass');
    setName(resp.name);
    
   if(resp.status === true){
    save('session', "true");
    save('sessionEmail', email);
    save('sessionPassword', password);
    save('pharmacy', resp.pharmacy);
    setSessionEmail(email);
    setSessionPassword(password);
    setSessionPharmacy(resp.pharmacy);
    console.log("teste: " + expoPushToken);
    console.log("pharmacy: " + resp.pharmacy);
    let datatime = "12/02/12";
    let tokenResult = await storeNotificationToken(expoPushToken, resp.pharmacy, datatime);
    console.log("resutado query: " + JSON.stringify(tokenResult));
    navigation.reset({
        index: 0,
        routes: [{name: 'homeScreen', params: {}}],
      });

    }else{
        alert("Credenciais incorretas");
   }  
}

return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
       <View style={loginStyles.loginContainer}>
            <View style={loginStyles.loginContent}>     
            <View style={loginStyles.loginLogoContainer}>
                <Image source={require('../assets/logoLogin.png')} style={loginStyles.loginLogoImage} />
                <Text style={loginStyles.loginLogoText}>PharmaIOT</Text>
            </View>
            <Card>
            <Text style={loginStyles.loginLabel}>Login</Text>           
                <View style={loginStyles.loginForm}>       
                   <View style={loginStyles.emailSection}>
                       <View style={loginStyles.labelLogoContainer}>
                            <Image style={loginStyles.loginIcons}source= {require('../assets/email.png')}/>
                             <Text style={loginStyles.emailLabel}>Email</Text>                      
                       </View>                       
                        <TextInput 
                        value={email}
                        onChangeText={setEmail}
                        keyboardType='email-address' 
                        style={loginStyles.borderTextInput}/>
                   </View>              
                   <View style={loginStyles.passwordSection}>
                       
                       <View style={loginStyles.labelLogoContainer}>
                            <Image style={loginStyles.loginIcons}source= {require('../assets/lock.png')}/>
                            <Text style={loginStyles.passwordLabel}>Password</Text>                   
                       </View>    
             {/* Password section */}                
                     <View style={loginStyles.passwordView}>                      
                       <TextInput 
                       value={password}
                       onChangeText={setPassword}
                       secureTextEntry={passwordVisible} 
                       keyboardType={'default'} 
                       style={loginStyles.borderTextInputPassword}
                       />
                      <TouchableWithoutFeedback onPress={hideShowPassword}>
                       <Image style={loginStyles.eyeIcon}  source={imageAsset}/>
                       </TouchableWithoutFeedback>
                     </View>  
                     </View>
             {/*Fim password section */} 
                  
                  <View>
                      {message && ( <Text>{message}</Text> )}
                  </View>

                   <View style={loginStyles.lembrarDadosSection}>
                       <CheckBox 
                       style={loginStyles.checkBox}
                       isChecked={checkBoxState}
                       onClick={() => {{setCheckBoxState(!checkBoxState), console.log(checkBoxState)}}}
                       />
                       <Text style={loginStyles.lembrarDadosLabel}>Lembrar os meus dados</Text>
                   </View>   
                           
                   <FlatButton 
                    fontSize={20} 
                    borderRadius={7.5} 
                    text='Entrar' 
                    textColor="white" 
                    color="#398BEA"  
                    onPress={login} 
                    paddingVertical={14}
                    paddingHorizontal={10}
                    fontWeight='bold'
                    textAlign = 'center'
                    />                  

                </View>                       
                                         
                <View style={loginStyles.webConnectLogoContainer}>
                     <Image source={require('../assets/logo_2bWebConnect.png')}/>
                </View> 
           
            </Card>

            </View>
        </View>
        </TouchableWithoutFeedback>
    )     
}