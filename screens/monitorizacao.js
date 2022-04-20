import React, {useState, useContext, useEffect} from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Modal, TouchableWithoutFeedback,TouchableHighlight, Keyboard} from 'react-native';
import { globalStyles } from '../styles/global';
import MonoCard from '../shared/monoCard';
import FlatButton from '../shared/button';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';
import { UserContext } from '../store/userContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Monitorizacao({ navigation }) {
  let cardHeight = Platform.OS === 'android'? '85%': "85%";
  const measurePointsUrl= "https://app.pharmaiot.pt/pharmaiotApi/api/monitorizacao/getAllMeasurePoints.php";
  let teste= [];
  const [measurePoints, setMeasurePoints] = useState([]);
  async function getMeasurePoints() {
    let reqs = await fetch(measurePointsUrl,{
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'charset': 'utf-8',
        },
    });
    let resp = await reqs.json()
    .then(console.log())
    .catch((error) => alert(error))
    //console.log(resp);
    
    resp.map(element => {
      teste.push(
          { label: element['name'], value: element['sn'] },
      )
     }); 
  
     setMeasurePoints(teste);
     console.log(teste);

    }
  
    useEffect(() => {
  
      getMeasurePoints();
      console.log("teste: " + JSON.stringify(measurePoints));
  
    }, [])
  const {sessionPassword, sessionEmail,sessionPharmacy} = useContext(UserContext);
  const [userEmail, setUserEmail] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  useEffect(() => {
    console.log('vazio email: ' + sessionEmail);
    console.log('password : ' + sessionPassword);
    setUserPassword(sessionPassword);
    setUserEmail(sessionEmail);

}, [sessionPassword, sessionEmail, sessionPharmacy])

   return (
   
    <View style={globalStyles.container}>
      <View style={{ height:'8%', width:'30%', flexDirection:'row', justifyContent:'center',marginBottom:'-4%'}}>
<View style={{backgroundColor: "rgb(94,147,174)", 
shadowOffset: { width: 4, height: 4 }, 
borderRadius:10,shadowColor:"rgba(0,0,0,0.25)",
flex:1,flexDirection:'row'}}>
 <View style={{width:'80%'}}>
 <RNPickerSelect
          style={{ 
            inputAndroid: { 
            color: 'white',
            textAlign:'left',
            fontSize: 12,
            marginLeft:'6%',
            height:'100%',
            width: '90%',
           }, 
           inputIOS: {
            color:'white',
            textAlign:'left',
            marginLeft:'6%',
            height:'100%'
           },

      }}  
          useNativeAndroidPickerStyle={false}
          onValueChange={(value) => console.log(value)}
          placeholder={{}}
          items={measurePoints}
          
      />
 </View>

  <View style={{width:'15%',alignSelf:'center',marginLeft:'3%'}}>

  <Icon name='caret-down-outline' style={{color:'white', alignSelf:'center'}} size={15}  type="Ionicons" />

  </View>
  </View> 
</View>
<View height="102%">  
      <MonoCard height={cardHeight}>
      <SafeAreaView>
    <View style={styles.monoContainer}>
      <Text>O email é: {userEmail}</Text>
      <Text>A password é: {userPassword}</Text>
      <Text>A farmácia é: {sessionPharmacy}</Text>
    </View>

    <View style={styles.buttonContainer}> 
        <FlatButton 
         text="Certificado de calibração" 
         textColor= "grey"
         paddingVertical={6}
         fontSize={14}
         onPress={() => alert('abrindo...')}         
         />   
         </View>
    </SafeAreaView>
    </MonoCard>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  monoContainer:{
    height:'87.5%',
  },
  modalToggle: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding:10,
    borderRadius:10,
    alignSelf: 'center'
  },
  buttonContainer:{
    marginTop:'4%',
    alignItems:'center',
    marginLeft: '25%',
    borderWidth: 2,
    width: '50%',
    borderStyle:"solid",
    borderColor:"rgba(126,118,118,0.88)",
    borderRadius:11,
    position:'relative'
  },
  modalClose: {
    marginTop:20,
    marginBottom:0
  },
  modalContent:{
    flex: 1,
  }
})
