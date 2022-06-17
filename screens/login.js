import React, {useState, useContext, useEffect} from 'react';
import {View, Text, TouchableWithoutFeedback, StyleSheet ,Keyboard,Image,TextInput, ScrollView} from 'react-native';
import { loginStyles } from '../styles/global';
import Card from '../shared/card';
import CheckBox from 'react-native-check-box';
import FlatButton from '../shared/button';
import { useNavigation } from '@react-navigation/native';
import md5 from 'md5';
import { UserContext } from '../store/userContext';
import {save,storeNotificationToken} from '../functions/genericFunctions';
import * as SecureStore from 'expo-secure-store';

export default function Login(){
const [name, setName] = useState();
const [result, onChangeResult] = useState('');    
const [modalVisible, setModalVisible] = useState(false);
const [dbName, setDbName] = useState('');

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
    expoPushToken,
    contextDb,
    setContextDb,
    sessionDb,
    setSessionDb,
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
    //setEmail(contextEmail);
    //setPassword(contextPassword);
    console.log('loginexpopishtoken: ' + expoPushToken);
    if(contextRememberMe == "true"){     
        setEmail(contextEmail);
        setPassword(contextPassword);
        setCheckBoxState(true);   
    }else{
        setEmail("");
        setPassword("");
        setCheckBoxState(false);
    }
}, [contextEmail, setContextEmail ,contextPassword,expoPushToken,setContextPassword, contextRememberMe, setContextRememberMe])

const loginUrl= "https://app.pharmaiot.pt/api/api/users/login.php";
const firstLoginLayer = "https://app.pharmaiot.pt/api/api/users/loginFirstLayer.php";

const generateCurrentDate = () => {
  
  let tempDate = new Date();
  let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
  return fDate;
}

//fazer Login
async function login(){  
  
  let loginState;

  let reqFirstLayer = await fetch(firstLoginLayer,{
    method: 'POST',
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    },
    body: JSON.stringify({
        email: email,
    })
  });
    let respFirstLayer = await reqFirstLayer.json()
    .then(console.log(respFirstLayer))
    .catch((respFirstLayer) => console.log("sera que aparece: " + respFirstLayer.error))
    setDbName(respFirstLayer[0].bd);
    setContextDb(respFirstLayer[0].bd);
    //console.log("Resultado first Layer: " + loginState);
 /// end of first layer of verification
     
    loginState = respFirstLayer[0].bd;
    
    if(loginState != false && loginState != ''){

      let reqs = await fetch(loginUrl,{
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            email: email,
            pass: md5(password),
            db_name: 'pharmaio_' + loginState,
            username: 'pharmaio_' + loginState
        })
    });
    let resp = await reqs.json()
    .then(console.log())
    .catch()

    if(checkBoxState === true){
      setContextRememberMe("true");  
      save('rememberMe', "true");
      save('email', email);
      save('contextDb', loginState);
      save('pass', password);
      save('name', resp.name + ' ' + resp.surname);
  }else if(checkBoxState === false){
      setContextRememberMe("false");  
      save('rememberMe', 'false');
  }

  getValueForEmail();
    getValueForPassword();
    getValueFor('email');
    getValueFor('pass');
    setName(resp.name);
   if(resp.status === true){
    save('session', "true");
    save('sessionEmail', email);
    save('sessionPassword', password);
    save('sessionDb', 'pharmaio_' + loginState)
    save('pharmacy', resp.pharmacy);
    setSessionEmail(email);
    setSessionPassword(password);
    setSessionDb('pharmaio_' + loginState);
    setSessionPharmacy(JSON.stringify(resp.pharmacy));
    console.log(JSON.stringify(resp.pharmacy));
    let tokenResult = await storeNotificationToken(expoPushToken, JSON.stringify(resp.pharmacy), generateCurrentDate(), 'pharmaio_' + loginState);
    console.log("resutado query: " + JSON.stringify(tokenResult));
    navigation.reset({
        index: 0,
        routes: [{name: 'homeScreen', params: {}}],
      });

    }else{
        setMessage("Credenciais inválidas");
   } 

    }else{
      setMessage("Credenciais inválidas");
 } 
     
}

return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
       <View style={loginStyles.loginContainer}>
            
     
      
            
            <View style={{position:'relative', bottom:'-2%'}}>
      
           

  
        </View>
    
            
            <View style={loginStyles.loginContent}>     
            <View style={loginStyles.loginLogoContainer}>
                <Image source={require('../assets/logoLogin.png')} style={loginStyles.loginLogoImage} />
                <Text style={loginStyles.loginLogoText}>PharmaIOT</Text>
            </View>
            <Card>
              <ScrollView>
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
                      {message && ( <Text style={loginStyles.message}>{message}</Text> )}
                  </View>

                   <View style={loginStyles.lembrarDadosSection}>
                       <CheckBox 
                       style={loginStyles.checkBox}
                       isChecked={checkBoxState}
                       onClick={() => {{setCheckBoxState(!checkBoxState)}}}
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
                    textAlign = 'center'  
                    />                  

                </View>                       
                                         
                <View style={loginStyles.webConnectLogoContainer}>
                     <Image source={require('../assets/logo_2bWebConnect.png')}/>
                </View> 
           </ScrollView>
            </Card>

            </View>
        </View>
        </TouchableWithoutFeedback>
    )     
}

const styles = StyleSheet.create({
    
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      borderWidth:2
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 24
    },
  });