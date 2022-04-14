import React from 'react';
import { StyleSheet, View, Text,TouchableHighlight} from 'react-native';
import { globalStyles } from '../styles/global';
import FlatButton from '../shared/button';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PerfilCard from '../shared/perfilCard';

export default function Perfil() {
  const navigateBack = useNavigation();
  let cardHeight = Platform.OS === 'android'? '90%': "90%";
  let nome = 'Igor Soares';
  let email = 'igorsoares@ua.pt';

  return (
    <View style={globalStyles.container}>
      <SafeAreaView>
      <View style={styles.backIcon}>
      <TouchableHighlight >   
      <Icon name='arrow-back-outline' style={{color:'black'}} size={40}  type="Ionicons" onPress={() => navigateBack.navigate('homeScreen') }/>
      </TouchableHighlight>
      </View> 
     
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
       <View style={styles.buttonContainer}> 
        <FlatButton 
         width='40%'
         text="Salvar" 
         textColor= "white"
         color="#5E93AE"
         textAlign="left" 
         borderRadius={25} 
         borderWidth={2}
         borderColor="red"
         paddingVertical={15}
         paddingHorizontal={45}
         fontSize={12}
         onPress={() => alert('a exportar...')}         
         />   
         </View>
      </PerfilCard >
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  perfilContainer:{
    padding:28,
  },
  borderContainer:{
    borderBottomWidth:1 ,
    borderBottomColor: 'black',   
    paddingBottom: '3%',
    marginBottom: '3%'

  },
  buttonContainer:{
    width:'100%',
    marginTop:'12%',
    alignItems:'center',
    position:'relative',

  },
  backIcon:{
    marginRight: '78%',
    justifyContent: 'center',
    marginTop: '0.5%',
    marginBottom: '-5.5%',

},
  resultText:{
    fontSize:14
  },
  titleText:{
    fontSize: 20,
    fontWeight: '500'
  }
})