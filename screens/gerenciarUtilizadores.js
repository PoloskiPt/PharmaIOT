import React from 'react';
import { StyleSheet, View, Text, Platform,Pressable, TouchableOpacity} from 'react-native';
import { globalStyles } from '../styles/global';
import RelatorioCard from '../shared/relatorioCard';
import FlatButton from '../shared/button';

export default function GerenciarUtilizadores() {
  
 let cardHeight = Platform.OS === 'android'? '40%': "40%";
  
  return (
    <View style={globalStyles.container}>
    <RelatorioCard height={cardHeight}>
     
     <View style={{borderTopLeftRadius:15 , borderTopRightRadius: 15 ,flexDirection:'row', flexWrap: 'wrap', justifyContent: 'space-between',alignItems:'center' , backgroundColor: '#EEDEDE', padding:10}}>
  
    <View style={{width:'60%'}}>
      <Text style={{fontSize:16}}>Utilizadores</Text>
    </View>
     
    <View style={styles.buttonContainer}>    
       <FlatButton 
       text="Adicionar" 
       borderRadius={25} 
       textColor= "black"
       color="#17A2B8" 
       paddingVertical={10}
       paddingHorizontal={20}
       fontSize={14}
       onPress={() => alert('a gerar...')}
       />
   </View> 
   </View>
    </RelatorioCard>
  </View>
  );
}

const styles = StyleSheet.create({
  cardTextContainer:{
      padding:20,
      marginTop:5
  },
  textoCard:{
    textAlign:'center',
    fontSize: 16
  },
  buttonContainer:{
    width:'40%',
    alignItems:'center',
    position:'relative',

  },
})