import React, {useState, useContext, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard,Image, TextInput, Dimensions} from 'react-native';
import { loginStyles } from '../styles/global';
import Card from '../shared/card';
import CheckBox from 'react-native-check-box';
import FlatButton from '../shared/button';
import Navigator from '../routes/authUser/drawer';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../store/CredentialsContext';
import { ActivityIndicator } from 'react-native-paper';

export default function Login(){

const [checkBoxState, setCheckBoxState]  = useState(false);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [passwordVisible, setPasswordVisible] = useState(true);   
const navigation = useNavigation();
const img1 = require('../assets/eye-slash-solid.png');
const [imageAsset, setImageAsset] = useState(img1);
const [message, setMessage] = useState(null);


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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

const loginUrl= "https://app.pharmaiot.pt/pharmaiotApi/api/users/login.php";
const [data, setData] = useState([]);
const verificaUser = () => {
    

   
    console.log(data);
    console.log(email);
 
    if(email === 'teste' && password == '1'){
      
        navigation.reset({
            index: 0,
            routes: [{name: 'homeScreen'}],
          });
          
    }
    else {
        alert('utilizador não existe' + windowHeight);
    }
}

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
            pass: password
        })
    });

    let ress = await reqs.json()
    .then(console.log())
    .catch((error) => alert(error))
    //alert(ress);
    //console.log(ress.status);
    console.log(ress);
   if(ress.status === true){
    navigation.reset({
        index: 0,
        routes: [{name: 'homeScreen'}],
      });
   }else{
        alert("Credenciais incorretas");
   }
   
}


return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
       <View  style={loginStyles.loginContainer}>
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
                       onClick={() => {setCheckBoxState(!checkBoxState)}}
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
