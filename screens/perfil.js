import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { globalStyles } from '../styles/global';
import PerfilCard from '../shared/perfilCard';

export default function Perfil() {

  let cardHeight = Platform.OS === 'android'? '90%': "90%";
  let nome = 'Igor Soares';
  let email = 'igorsoares@ua.pt';
  return (
    <View style={globalStyles.container}>
      
      <PerfilCard height={cardHeight}>
        <View style={styles.perfilContainer}>
            
            <View style={styles.borderContainer}>
              <Text style={styles.titleText}>Nome </Text>
              <Text style={styles.resultText}>{nome} </Text>
            </View>   

            <View style={styles.borderContainer}>
              <Text style={styles.titleText}>Apelido </Text>
              <Text style={styles.resultText}>{nome} </Text>
            </View>   
           
            <View style={styles.borderContainer}>
              <Text style={styles.titleText}>Endereço de e-mail </Text>
              <Text style={styles.resultText}>{email} </Text>
            </View>
           
            <View style={styles.borderContainer}>
              <Text style={styles.titleText}>Contacto telefónico </Text>
              <Text style={styles.resultText}>{nome} </Text>
            </View>
           
            <View style={styles.borderContainer}>
              <Text style={styles.titleText}>Palavra-passe </Text>
              <Text style={styles.resultText}>{nome} </Text>
            </View>
           
            <View style={styles.borderContainer}>
              <Text style={styles.titleText}>Morada </Text>
              <Text style={styles.resultText}>{nome} </Text>
            </View>

            <View style={styles.borderContainer}>
              <Text style={styles.titleText}>Cidade </Text>
              <Text style={styles.resultText}>{nome} </Text>
            </View>

            <View >
              <Text style={styles.titleText}>País </Text>
              <Text style={styles.resultText}>Portugal</Text>
            </View>
        
        </View>  
      </PerfilCard >
    </View>
  );
}

const styles = StyleSheet.create({
  perfilContainer:{
    padding:28
  },
  borderContainer:{
    borderBottomWidth:1 ,
    borderBottomColor: 'black',   
    paddingBottom: '3%',
    marginBottom: '3%'

  },
  resultText:{
    fontSize:14
  },
  titleText:{
    fontSize: 20,
    fontWeight: '500'
  }
})