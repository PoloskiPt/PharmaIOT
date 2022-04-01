import React from 'react';
import {View, Text, Image,Button, StyleSheet,TouchableWithoutFeedback, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {DrawerNavigatorItems} from 'react-navigation-drawer';
import { useNavigation } from '@react-navigation/native';
import {deleteItem} from '../../store/functions';
import * as SecureStore from 'expo-secure-store';

function CustomDrawer({...props}){

async function deleteItem(key){
    await SecureStore.deleteItemAsync(key);
}

const navigation = useNavigation();    

const logout = () => {
    
    deleteItem('session');
    deleteItem('sessionEmail', '');
    deleteItem('sessionPassword', '');
   
    navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
}

    return(
        <View style={styles.drawerContainer}>
            <View style={styles.logoContainer}>
            <Image style={styles.logoImage} source={require('../../assets/logo_drawer.png')}/>
            <Text style={styles.logoText}>PharmaIOT</Text>
            </View>
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
        marginTop: '10%',
        height: '50%'
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