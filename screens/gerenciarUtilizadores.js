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
        <View style={styles.cardTextContainer}>
            <Text style={styles.textoCard}>Pretende gerar o relatório quinzenal?</Text>
            <Text style={styles.textoCard}>Dependendo do volume de dados irá demorar alguns segundos</Text>
            <Text style={styles.textoCard}>Por favor aguarde.</Text>
        </View>
       
      <View style={styles.buttonContainer}>    
         <FlatButton 
         text="Criar Relatório" 
         borderRadius={25} 
         textColor= "black"
         color="#17A2B8" 
         paddingVertical={10}
         paddingHorizontal={20}
         fontSize={16}
         onPress={() => alert('a gerar...')}
         fontWeight="700"
         />
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
    width:'100%',
    marginTop:'5%',
    alignItems:'center',
    //justifyContent:'center',
    position:'relative',

  },
})