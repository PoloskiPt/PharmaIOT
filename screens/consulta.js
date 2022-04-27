import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, Dimensions, Button,TextInput, Platform, Modal} from 'react-native';
import MainCard from '../shared/mainCard';
import { globalStyles } from '../styles/global';
import { LineChart } from "react-native-chart-kit";
import FlatButton from '../shared/button';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Spinner from 'react-native-loading-spinner-overlay';
import {getMeasurePoints,getMeasurePointDataInterval} from '../functions/genericFunctions';

export default function Consulta() {

 
  const [measurePoints, setMeasurePoints] = useState([]);
  const [DataInterval, setDataInterval] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [datepick, setDatepick] = useState(null);
  useEffect(() => {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() +' '+today.getHours()+':'+today.getMinutes()+':'+ today.getSeconds();
    setDatepick(date);
  }, []);
  
  //passar a farmacia por parametro mais tarde.
    async function requestMeasurePoints(id){
      setIsLoading(true);
    let resultMeasurePoints = await getMeasurePoints();
    requestMeasurePointDataInterval(resultMeasurePoints[id].value,"2022-04-02 17:40:21", "2022-04-05 17:40:21");  
    setMeasurePoints(resultMeasurePoints);
    
    setIsLoading(false);
    }
    async function requestMeasurePointDataInterval(sn,dt,dt1){

      let measurePointInterval = await getMeasurePointDataInterval(sn,dt,dt1);
      setDataInterval(measurePointInterval);
      console.log(measurePointInterval);
      
    }
     
  useEffect(() => {

    requestMeasurePoints(0);
    
    
  }, [])
  
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };
  
  const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('dd/mm/aaaa');

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);

      let tempDate = new Date(currentDate);
      let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) +  '/' +  tempDate.getFullYear();
      let fTime = 'Hours: ' +  tempDate.getHours() + '| Minutes: ' + tempDate.getMinutes();
      setText(fDate);
      console.log(fDate + ' (' + fTime + ')');
    }

    const showMode = (currentMode) => {

      setShow(true);
      setMode(currentMode);
    }
   
  


 
  
const sn = DataInterval && DataInterval[0].sn;

  let cardHeight = Platform.OS === 'android'? '95%': "95%";


  const screenWidth = Dimensions.get("window").width;

  return (
    
    <View style={globalStyles.container}>         
      {isLoading && <Spinner visible={isLoading}  textContent={'A carregar...'}  textStyle={{color:'black'}}/>} 
      <View style={{ height:'8%', width:'90%', marginTop:4, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>

    <View style={{backgroundColor: "rgb(94,147,174)", 
    shadowOffset: { width: 4, height: 4 }, 
    borderRadius:10, width:'29%', height:'90%', 
    marginRight:'1%',shadowColor:"rgba(0,0,0,0.25)",flex:1,flexDirection:'row'}}>
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
               onValueChange={(value) => requestMeasurePointDataInterval(value,"2022-04-03 19:40",datepick)}
              
               placeholder={{}}
              items={measurePoints}
              
              
          />
            
     </View>
   
      <View style={{width:'15%',alignSelf:'center',marginLeft:'3%'}}>

      <Icon name='caret-down-outline' style={{color:'white', alignSelf:'center'}} size={15}  type="Ionicons" />

      </View>

          
    </View>

    <View style={{backgroundColor: "rgb(94,147,174)", 
     shadowOffset: { width: 4, height: 4 }, 
    borderRadius:10, width:'29%', height:'90%', 
    marginRight:'1%',shadowColor:"rgba(0,0,0,0.25)",flex:1,flexDirection:'row'}}>
     <View style={{width:'80%'}}>
     <RNPickerSelect            
              style={{ 
                inputAndroid: { 
                color: 'white',
                textAlign:'left',
                fontSize: 12,
                marginLeft:'6%',
                height:'100%',
                width: '100%',
               }, 
               inputIOS: {
                 color:'white',
                 textAlign:'left',
                 marginLeft:'6%',
                 height:'100%',
                 fontSize: 12,
                 height:'100%'
               },

          }}
              
              useNativeAndroidPickerStyle={false}
              onValueChange={(value) => requestMeasurePointDataInterval(sn,value,datepick) }
              placeholder={{ }}

              items={[
                { label: 'Últimas 24 horas', value: '2022-04-03 19:40' },
                { label: 'Mês Passado', value: "2022-03-04 17:40:21"},
                { label: 'Últimos 7 dias', value: "2022-03-04 17:40:21" },           
              ]}
          />
     </View>
      
      <View style={{width:'15%', justifyContent:'center',marginLeft:'3%'}}>

      <Icon name='caret-down-outline' style={{color:'white'}} size={15}  type="Ionicons" />

      </View>      
    </View>    
      <FlatButton 
         
         width = '29%'
         height = '90%'
         text="Exportar Relatório" 
         borderRadius={10} 
         textColor= "white"
         color="#5E93AE"
         textAlign="left" 
         borderWidth={2}
         borderColor="red"
         paddingVertical={10}
         paddingHorizontal={6}
         fontSize={12}
         onPress={() => alert('a exportar...')}         
         />     
                  
      </View>
      <View height="92%">   
      <MainCard height={cardHeight}>
        
      {DataInterval && <LineChart
        data = {{
          labels: ["14 Mar"],
          datasets: [
            {
              data: DataInterval.map((item) => {
                   return ( (item.hum) * 100) / 100;
              }),
              color: () => `rgba(1,1,1)`, // optional
              strokeWidth: 2 // optional
            },
           
          ],
          legend: ["Humidade"] // optional
        }}
        width={360}
        height={240}
        chartConfig={chartConfig}
      />}
        {DataInterval && <LineChart
        data = {{
          labels: ["14 Mar"],
          datasets: [
            {
              data: DataInterval.map((item) => {
                return ( (item.temp)*100) / 100;
           }),
              color: () => `rgba(1,1,1)`, // optional
              strokeWidth: 2 // optional
            },
           
          ],
          legend: ["Temperatura"] // optional
        }}
        width={360}
        height={240}
        chartConfig={chartConfig}
      />}
    
      <View style={{margin:20, flex:1, flexDirection:'row', borderWidth:1,borderColor:'red' }}>
      <Text style={{marginRight:4}}>De</Text>
      <Text onPress={() => showMode('date')} placeholder="dd/mm/aaaa" style={{fontWeight: 'bold', fontSize:15, borderWidth:1.5, paddingLeft:7.5,  borderColor:'#C4C4C4', alignItems:'center'}}>{text} 
      <Icon name='calendar-outline' style={{color:'black',marginLeft:'3%'}} size={16} type="Ionicons" /> </Text>  
      <Text style={{marginLeft:5}}>Até</Text>
      </View>
      
      {show && (
      <DateTimePicker
      testID='dateTimePicker'
      value={date}
      mode={mode}
      is24Hour={true}
      animationType={"fade"}
      androidMode={"default"}
      display="spinner"
      locale="pt-PT"
      onChange={onChange} 
      />
      )}

    <View>
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
        </MainCard>
      </View>
    
    </View>
    
  );
}

const chartConfig = {
  
  backgroundGradientFrom: "white",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "white",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(1, 1, 1, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'yellow'
  },
  text: {
    fontSize: 24,
  },
  picker: {
    marginVertical: 30,
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: "#666",
  },


});
