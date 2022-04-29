import React, {useState, useContext, useEffect} from 'react';
import { StyleSheet, View, Text, ScrollView} from 'react-native';
import { globalStyles } from '../styles/global';
import MonoCard from '../shared/monoCard';
import FlatButton from '../shared/button';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';
import { UserContext } from '../store/userContext';
import {getMeasurePoints, getMeasurePointData, onShare} from '../functions/genericFunctions';
import Svg, { G, Circle } from "react-native-svg";
import { LineChart } from "react-native-chart-kit";
import Spinner from 'react-native-loading-spinner-overlay';

export default function Monitorizacao() {

  let cardHeight = Platform.OS === 'android'? '85%': "85%";
  const [measurePoints, setMeasurePoints] = useState([]);
  const [monitoringData, setmonitoringData] = useState();
  const [humCircleChartColor, setHumCircleChartColor] = useState();
  const [tempCircleChartColor, setTempCircleChartColor] = useState(null);
  const {sessionPassword, sessionEmail,sessionPharmacy} = useContext(UserContext);
  const [userEmail, setUserEmail] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const radius = 70;
  const circleCircumference = 2 * Math.PI * radius;


  async function requestMeasurePoints(id){
     
      setIsLoading(true);
      let resultMeasurePoints = await getMeasurePoints();
      setMeasurePoints(resultMeasurePoints);
      requestMeasurePointData(resultMeasurePoints[id].value);
      setIsLoading(false);
    
  }

  async function requestMeasurePointData(sn){

    let measurePointData = await getMeasurePointData(sn);
    setmonitoringData(measurePointData);
    let humidade = Math.round(measurePointData[0].hum);
    let temperatura = Math.round(measurePointData[0].temp);
    
    if(humidade <= measurePointData[0].hum_min_admissivel && humidade <= measurePointData[0].hum_max_admissivel) {
      setHumCircleChartColor('#ba0000');
    }

    if(humidade >= measurePointData[0].hum_min_threshold && humidade >= measurePointData[0].hum_min_admissivel || humidade <= measurePointData[0].hum_max_threshold) {
      setHumCircleChartColor('#e4d60b');
    }

    if(humidade >= measurePointData[0].hum_min_histerese && humidade <= measurePointData[0].hum_max_histerese) {
      setHumCircleChartColor('#11eb0d');
    }

    // INICIO TESTES TEMPERATURA

    if(temperatura <= measurePointData[0].temp_min_admissivel && temperatura <= measurePointData[0].temp_max_admissivel) {
      setTempCircleChartColor('#ba0000');
    }

    if(temperatura >= measurePointData[0].temp_min_threshold && temperatura >= measurePointData[0].temp_min_admissivel || temperatura <= measurePointData[0].temp_max_threshold) {
      setTempCircleChartColor('#e4d60b');
    }

    if(temperatura >= measurePointData[0].temp_min_histerese && temperatura <= measurePointData[0].temp_max_histerese) {
      setTempCircleChartColor('#11eb0d');
    }

  }
  
  useEffect(() => {
    
    requestMeasurePoints(0); 
    setUserPassword(sessionPassword);
    setUserEmail(sessionEmail);

  }, [sessionPassword, sessionEmail, sessionPharmacy])

   return (
  
    <View style={globalStyles.container}>
      {isLoading && <Spinner visible={isLoading}  textContent={'A carregar...'}  textStyle={{color:'black'}}/>} 
      <View style={{ height:'8%', width:'30%', flexDirection:'row', justifyContent:'center',marginBottom:'-4%'}}>
<View style={{backgroundColor: "rgb(94,147,174)", 
shadowOffset: { width: 4, height: 4 }, 
borderRadius:10,shadowColor:"rgba(0,0,0,0.25)",
flex:1,flexDirection:'row'}}>
   
 <View style={{width:'80%'}}>
 <RNPickerSelect
          style={{ 
            inputAndroid: { 
            fontFamily: 'roboto-light',
            color: 'white',
            textAlign:'left',
            fontSize: 12,
            marginLeft:'6%',
            height:'100%',
            width: '90%',
           }, 
           inputIOS: {
            fontFamily: 'roboto-light',
            color:'white',
            textAlign:'left',
            marginLeft:'6%',
            height:'100%'
           },

      }}  
          useNativeAndroidPickerStyle={false}
          onValueChange={(value) => requestMeasurePointData(value)}
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
      
      <MonoCard height={cardHeight} >
     
      <ScrollView style={{height:'100%'}}
        showsVerticalScrollIndicator ={false}
        showsHorizontalScrollIndicator={false}
      >
    
     
    <View style={styles.monoContainer}>
   
         {monitoringData &&
         <View style={{ flex: 1, flexjustifyContent: 'center', alignItems:'center'}} >     
         <Text style={{textAlign: 'center', fontSize:24, fontFamily: 'roboto-bold'}}>Humidade</Text>
         <View style={{alignItems:'center', justifyContent:'center'}}>       
         <Svg height="140" width="140" viewBox="0 0 180 180" >
          <G rotation={-90} originX="90" originY="90">
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="#F1F6F9"
              fill="transparent"
              strokeWidth="11"  
            />
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke= {humCircleChartColor}
              fill="transparent"
              strokeWidth="11"
              strokeDasharray={circleCircumference}
              strokeDashoffset={circleCircumference - (circleCircumference * Math.round(monitoringData[0].hum)) / 100}
              strokeLinecap="round"
            />
          </G>
         
        </Svg>
        <Text style={{position:'absolute', textAlign: 'center', fontSize:28, fontFamily: 'roboto-light',}}>{Math.round(monitoringData[0].hum) + "%"}</Text>
        </View>
        </View>
      
        }

{monitoringData && 
         <View style={{ flex: 1, flexjustifyContent: 'center', alignItems:'center'}} >     
         <Text style={{textAlign: 'center', fontSize:24, fontFamily: 'roboto-bold'}}>Temperatura</Text>
         <View style={{alignItems:'center', justifyContent:'center'}}>       
         <Svg height="140" width="140" viewBox="0 0 180 180" >
          <G rotation={-90} originX="90" originY="90">
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="#F1F6F9"
              fill="transparent"
              strokeWidth="11"  
            />
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke={tempCircleChartColor}
              fill="transparent"
              strokeWidth="11"
              strokeDasharray={circleCircumference}
              strokeDashoffset={circleCircumference - (circleCircumference * Math.round(monitoringData[0].temp)) / 100}
              strokeLinecap="round"
            />
          </G>
         
        </Svg>
        <Text style={{position:'absolute', textAlign: 'center', fontSize:28, fontFamily: 'roboto-light',}}>{Math.round(monitoringData[0].temp) + "°"}</Text>
        </View>
        </View>
      
        }
 
 {monitoringData && <LineChart
        data={{
          labels : ["6pm", "9pm"],
          datasets: [ 
            {
              data: [monitoringData[0].hum, 50],
              color: () => "#097907", // optional
              strokeWidth: 3, // optional, default
            },
            {
              data: [monitoringData[0].temp, 25],
              color: () => "#18A0FB", // optional
              strokeWidth: 3, // optional, default
            },
          ],
           legend: ["Humidade","Temperatura"],
           withShadow: false,
        }}
        withInnerLines={true}
        withOuterLines={false}     
        width={310}
        height={240}
        chartConfig={chartConfig}
        style={{marginVertical:"2%"}}
      />}


     <View style={styles.buttonContainer}> 
        <FlatButton 
         text="Certificado de calibração" 
         fontFamily= 'roboto-light'
         textColor= "grey"
         paddingVertical={6}
         fontSize={17}
         onPress={onShare}         
         />   
       </View>
  
    </View>
        
    </ScrollView>
    </MonoCard>
  
    </View>
  
    </View>
   
  );
}

  // CONFIGURAÇÕES DO LINE CHART

const chartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "white",
  backgroundGradientToOpacity: 0.5,  
  color: (opacity = 1) => `rgba(2, 1, 1, ${opacity})`,
  strokeWidth: 3, // optional, default 3
  propsForDots: {
    r: "1",
    strokeWidth: "2",
    stroke: "#ffa726"
  },
  useShadowColorFromDataset: true,
  propsForBackgroundLines: {
    strokeDasharray: ""
  },
  propsForLabels:{
    fontSize:15,  
    fontWeight:400, 
  },

  propsForHorizontalLabels:{
    fontSize: "15",
    x:"50"
    
    
  } 
};

const styles = StyleSheet.create({
  monoContainer:{
    height:'87.5%',
    padding: '4%',
  },
  buttonContainer:{
    marginTop:'4%',
    alignItems:'center',
    marginLeft: '18%',
    borderWidth: 2,
    width: '64%',
    borderStyle:"solid",
    borderColor:"rgba(126,118,118,0.88)",
    borderRadius:15,
    position:'relative',
    marginBottom:'1.5%'
  },
  modalClose: {
    marginTop:20,
    marginBottom:0
  },
  modalContent:{
    flex: 1,
  }
})