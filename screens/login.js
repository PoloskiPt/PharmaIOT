import React, {useState, useContext} from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard,Image, TextInput} from 'react-native';
import { loginStyles } from '../styles/global';
import Card from '../shared/card';
import CheckBox from 'react-native-check-box';
import FlatButton from '../shared/button';
import Navigator from '../routes/authUser/drawer';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../store/CredentialsContext';

export default function Login(){

const [checkBoxState, setCheckBoxState]  = useState(false);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [passwordVisible, setPasswordVisible] = useState(true);   
const navigation = useNavigation();
const img1 = require('../assets/eye-slash-solid.png');
const [imageAsset, setImageAsset] = useState(img1);

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


const verificaUser = () => {
    console.log(email);
    if(email === 'teste' && password == '1'){
      
        navigation.reset({
            index: 0,
            routes: [{name: 'homeScreen'}],
          });
          
    }
    else {
        alert('utilizador não existe');
    }
}

const loginPressed = () => {
    //validate user
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
                  
                  

                   <View style={loginStyles.lembrarDadosSection}>
                       <CheckBox 
                       style={loginStyles.checkBox}
                       isChecked={checkBoxState}
                       onClick={() => {setCheckBoxState(!checkBoxState)}}
                       />
                       <Text style={loginStyles.lembrarDadosLabel}>Lembrar os meus dados</Text>
                   </View>   
                
                </View>    
                                           
                 <FlatButton 
                 fontSize={20} 
                 borderRadius={7.5} 
                 text='Entrar' 
                 textColor="white" 
                 color="#398BEA" 
                 onPress={verificaUser} 
                 paddingVertical={14}
                 paddingHorizontal={10}
                 fontWeight='bold'
                 textAlign = 'center'
                 />  
                   
                <View style={loginStyles.webConnectLogoContainer}>
                     <Image source={require('../assets/logo_2bWebConnect.png')}/>
                </View> 
           
            </Card>

            </View>
        </View>
        </TouchableWithoutFeedback>
    )     
}
