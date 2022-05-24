import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import ConfiguracoesCard from '../shared/configuracoesCard';
import { globalStyles,configuracoesStyles } from '../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Configuracoes({navigation}) {

  return (
    <View style={globalStyles.container}>
         <SafeAreaView>
      <ConfiguracoesCard>
           
           <View style={{paddingTop:'2%', paddingBottom:'2%'}}>
               <FlatList/>
           <TouchableOpacity style={configuracoesStyles.listItemDefault} onPress={() => navigation.navigate('GerenciarAlarmes')}>       
                 <Text style={configuracoesStyles.defaultText}>Gerir Alarmes</Text> 
            </TouchableOpacity>
            <TouchableOpacity style={configuracoesStyles.listItemDefault} onPress={() => navigation.navigate('GerenciarUnidades')}>       
                 <Text style={configuracoesStyles.defaultText}>Gerir Unidades</Text>            
            </TouchableOpacity>
            <TouchableOpacity style={configuracoesStyles.listItemDefault} onPress={() => navigation.navigate('GerenciarContactos')}>       
                 <Text style={configuracoesStyles.defaultText}>Gerir Contactos</Text>            
            </TouchableOpacity>
            <TouchableOpacity style={configuracoesStyles.lastListItem} onPress={() => navigation.navigate('GerenciarUtilizadores')}>       
                 <Text style={configuracoesStyles.defaultText}>Gerir Utilizadores</Text>            
            </TouchableOpacity>
          
           </View>
           
      </ConfiguracoesCard>
          </SafeAreaView>
    </View>
  );
}

