import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import ConfiguracoesCard from '../shared/configuracoesCard';
import { globalStyles } from '../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
{ConfiguracoesCard}

export default function Configuracoes({navigation}) {

  return (
    <View style={globalStyles.container}>
         <SafeAreaView>
      <ConfiguracoesCard>
           
           <View style={{paddingTop:'2%', paddingBottom:'2%'}}>
               <FlatList/>
           <TouchableOpacity style={styles.listItemDefault} onPress={() => navigation.navigate('GerenciarAlarmes')}>       
                 <Text style={styles.defaultText}>Gerenciar Alarmes</Text> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.listItemDefault} onPress={() => navigation.navigate('GerenciarContactos')}>       
                 <Text style={styles.defaultText}>Gerenciar Contactos</Text>            
            </TouchableOpacity>
            <TouchableOpacity style={styles.listItemDefault} onPress={() => navigation.navigate('GerenciarUtilizadores')}>       
                 <Text style={styles.defaultText}>Gerenciar Utilizadores</Text>            
            </TouchableOpacity>
            <TouchableOpacity style={styles.lastListItem} onPress={() => navigation.navigate('GerenciarUnidades')}>       
                 <Text style={styles.defaultText}>Gerenciar Unidades</Text>            
            </TouchableOpacity>
           </View>
           
      </ConfiguracoesCard>
          </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({

     listItemDefault: {
          borderBottomWidth:1, 
          borderColor:'#C4C4C4', 
          padding:'5%',
     },
     lastListItem: {
          padding:'5%'
     },
     defaultText:{
          fontSize:18,
          fontFamily:'roboto-light',
          color:'black',
          marginLeft: '5%'
     }

})