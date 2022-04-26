import React, {useState, useContext, useEffect} from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { globalStyles } from '../styles/global';
import MonoCard from '../shared/monoCard';
import FlatButton from '../shared/button';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';
import { UserContext } from '../store/userContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import {getMeasurePoints, getMeasurePointData} from '../functions/genericFunctions';
import Svg, { G, Circle } from "react-native-svg";

export default function Monitorizacao() {
  
  let cardHeight = Platform.OS === 'android'? '85%': "85%";
  const [measurePoints, setMeasurePoints] = useState([]);
  const [monitoringData, setmonitoringData] = useState();
  const {sessionPassword, sessionEmail,sessionPharmacy} = useContext(UserContext);
  const [userEmail, setUserEmail] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const radius = 70;
  const circleCircumference = 2 * Math.PI * radius;
   
  async function requestMeasurePoints(id){

      let resultMeasurePoints = await getMeasurePoints();
      setMeasurePoints(resultMeasurePoints);
      requestMeasurePointData(resultMeasurePoints[id].value);
 
  }

  async function requestMeasurePointData(sn){

    let measurePointData = await getMeasurePointData(sn);
    setmonitoringData(measurePointData);
  }
  
  useEffect(() => {
    
    requestMeasurePoints(0); 
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
      {monitoringData && <Text>{monitoringData[0].temp}</Text>}
      {monitoringData && <Text>{monitoringData[0].hum}</Text>}
     
         {monitoringData &&
         <View style={{ flex: 1, flexjustifyContent: 'center', alignItems:'center'}} >     
         <View style={{alignItems:'center', justifyContent:'center'}}> 
         <Svg height="160" width="160" viewBox="0 0 180 180" >
          <G rotation={-90} originX="90" originY="90">
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="#F1F6F9"
              fill="transparent"
              strokeWidth="10"  
            />
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="#14274E"
              fill="transparent"
              strokeWidth="10"
              strokeDasharray={circleCircumference}
              strokeDashoffset={circleCircumference - (circleCircumference * Math.round(monitoringData[0].hum)) / 100}
              strokeLinecap="round"
            />
          </G>
         
        </Svg>
        <Text style={{position:'absolute', textAlign: 'center', fontSize:24, fontWeight: "600"}}>{Math.round(monitoringData[0].hum) + "%"}</Text>
        </View>
        </View>
      
        }
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