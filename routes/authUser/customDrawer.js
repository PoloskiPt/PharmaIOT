import React, {useState, useEffect} from 'react';
import {View, Text, Image,Button, StyleSheet,TouchableWithoutFeedback, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {DrawerNavigatorItems} from 'react-navigation-drawer';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

function CustomDrawer({...props}){

const [name, setName] = useState('');

async function deleteItem(key){
    await SecureStore.deleteItemAsync(key);
}

useEffect(() => {
    getValueForName();
})

async function getValueForName(){
     
    let result = await SecureStore.getItemAsync('name');
    if(result){
        setName(result);
    }else{
        setName('User');
    }
  }

const navigation = useNavigation();    

const logout = () => {
    
    deleteItem('session');
    deleteItem('sessionEmail', '');
    deleteItem('sessionPassword', '');
    deleteItem('pharmacy', '');
   
    navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
} 

const navigatePerfil = () => {

    alert('Abrir perfil');
    navigation.navigate('Perfil');     

}

    return(
        <View style={styles.drawerContainer}>
            <View style={styles.logoContainer}>
            <Image style={styles.logoImage} source={require('../../assets/logo_drawer.png')}/>
            <Text style={styles.logoText}>PharmaIOT</Text>
            </View>
            <TouchableOpacity onPress={navigatePerfil}>
                <View style={{ flexDirection:'column', alignItems: 'center', justifyContent:'flex-start'}}>
                    <Image source={require('../../assets/user.png')} style={{height:60, width:60}}/>
                    <Text style={{fontSize:22}}>{name}</Text>
                </View>
            </TouchableOpacity>
            
           
            <View style={styles.drawerItems}>         
                <DrawerNavigatorItems  {...props} width={'100%'}/>
            </View>
               
                 <View style={styles.logoutContainer}>           
                 <TouchableWithoutFeedback onPress={logout}>     
                    <View style={styles.logoutContainerWrapper}>
                         <Icon  name='log-out-outline' style={{color:'white'}} size={45}  type="Ionicons" />
                         <Text style={styles.logoutLabel}>Sair</Text>
                    </View>
                    </TouchableWithoutFeedback>    
                 </View>
                                 
        </View>
    )
}

export default CustomDrawer;

const styles = StyleSheet.create({
    drawerContainer:{
        backgroundColor: '#398BEA',
        display:"flex",
        height: '100%',
        flexDirection:'column',    
    },
    logoContainer:{
        marginTop: '20%',
        alignItems: 'center',
        height: '20%'
    },  
    logoText:{
        color: 'white',
        fontSize: 44,
        marginBottom: '5%'
    },
    logoImage:{
        height:44,
        width:50,
        flexDirection:'row'
    },
    userArea:{
        marginTop:'10%',
        marginLeft:10,
        flexDirection: 'row',
        alignItems:'center'
    },
    userNameText:{
        fontSize: 18,
        color: 'white',
        marginLeft: 10,
    },
    user:{
        height:66,
        width:66,
    },
    drawerItems:{
        display:'flex',
        flexDirection: 'row',
        marginTop: '20%',
        height: '35%',

},
logoutContainer:{
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',  
    marginLeft: '3%'
},
logoutLabel:{
    fontSize: 26,   
    color: 'white',
    marginLeft: '2%',
},
logoutContainerWrapper:{    
    flexDirection: 'row',  
    paddingLeft:10,
    width:'100%', 
    height: '90%',
    alignItems:'center', 
    justifyContent:'flex-start',
},

})