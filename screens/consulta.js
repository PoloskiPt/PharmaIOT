import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform, Alert  } from 'react-native';
import MainCard from '../shared/mainCard';
import { globalStyles } from '../styles/global';
import { LineChart } from "react-native-chart-kit";
import FlatButton from '../shared/button';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Spinner from 'react-native-loading-spinner-overlay';
import { getMeasurePoints, getMeasurePointDataInterval} from '../functions/genericFunctions';

export default function Consulta() {

  const [measurePoints, setMeasurePoints] = useState([]);
  const [DataInterval, setDataInterval] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // useStates pickers topo
  const [currentSn, setCurrentSn] = useState();
  const [selectedTimeSpan, setSelectedTimeSpan] = useState();
  const [dataInicial, setDataInicial] = useState();
  const [dataFinal, setDataFinal] = useState();
  const [datepick, setDatepick] = useState(null);
  const [datepickEnd, setDatepickEnd] = useState(null);
  useEffect(() => {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    setDatepick(date);
    requestMeasurePoints(0);
  }, []);


  //console.log(datepickEnd);
  //passar a farmacia por parametro mais tarde.
  async function requestMeasurePoints(id) {
   
    let resultMeasurePoints = await getMeasurePoints();
    setMeasurePoints(resultMeasurePoints);
    requestMeasurePointDataInterval(resultMeasurePoints[id].value, "2022-04-02 17:40:21", "2022-05-11 17:40:21");
    
    
  }
 
  async function requestMeasurePointDataInterval(sn, dt, dt1) {
   
    setIsLoading(true);
 
    let measurePointInterval = await getMeasurePointDataInterval(sn, dt, dt1);
    setDataInterval(measurePointInterval);

    //console.log(measurePointInterval);
    setIsLoading(false);

  }
  useEffect(() => {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + (today.getHours()+1) + ':' + today.getMinutes() + ':' + today.getSeconds();
    setDatepick(date);
   
    let today1 = new Date();
    let date1 = today1.getFullYear() + '-' + 0 + (today1.getMonth() + 1 ) + '-' + 0 + (today1.getDate() - 1) + ' ' + (today1.getHours() + 1 )+ ':' + today1.getMinutes() + ':' + today1.getSeconds();
    
    setDatepickEnd(date1);
   
    requestMeasurePoints(0);
  }, []);
  console.log(datepickEnd);
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
  const [textEnd, setTextEnd] = useState('dd/mm/aaaa');


  // verficar date inputs

  const verificarDateInputs = () => {

    if(dataFinal == null || dataInicial == null){
      Alert.alert("Dados em falta","Por favor preencha as duas datas.", [{text:'Compreendo'}]);
    }

    console.log("resultado data final: " + dataFinal + " data inicial: " +  dataInicial);

  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    let fTime = 'Hours: ' + tempDate.getHours() + '| Minutes: ' + tempDate.getMinutes();
    setText(fDate);
    setDataInicial(fDate);
    console.log(fDate + ' (' + fTime + ')');
    
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }

  const [dateEnd, setDateEnd] = useState(new Date());
  const [modeEnd, setModeEnd] = useState('date');
  const [showEnd, setShowEnd] = useState(false);

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowEnd(Platform.OS === 'ios');
    setDateEnd(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    let fTime = 'Hours: ' + tempDate.getHours() + '| Minutes: ' + tempDate.getMinutes();
    setTextEnd(fDate);
    setDataFinal(fDate);
    console.log(fDate + ' (' + fTime + ')');
    console.log(fDate);
  }

  const showModeEnd = (currentMode) => {
    setShowEnd(true);
    setModeEnd(currentMode);
  }

  

  let cardHeight = Platform.OS === 'android' ? '90%' : "90%";

  return (

    <View style={globalStyles.container}>
      {isLoading && <Spinner visible={isLoading} textContent={'A carregar...'} textStyle={{ color: 'black' }} />}
      <View style={{ flex:1,height: '8%', width: '85%',marginBottom: '-4%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>

        <View style={{
          backgroundColor: "#286cbe",
          shadowOffset: { width: 4, height: 4 },
          borderRadius: 10, 
          marginRight: '4%', shadowColor: "rgba(0,0,0,0.25)", flex: 1, flexDirection: 'row'
        }}>
          <View style={{ width: '70%' }}>
            <RNPickerSelect
              style={{
                inputAndroid: {
                  fontFamily: 'roboto-medium',
                  color: 'white',
                  textAlign: 'left',
                  fontSize: 14.5,
                  marginLeft: '6%',
                  height: '100%',
                  width: '90%',
                  
                },
                inputIOS: {
                  fontFamily: 'roboto-medium',
                  color: 'white',
                  textAlign: 'left',
                  fontSize: 14.5,
                  marginLeft: '6%',
                  height: '100%'
                },

              }}
              useNativeAndroidPickerStyle={false}
              onValueChange={(value) => requestMeasurePointDataInterval(value, datepickEnd,datepick) && setCurrentSn(value)}
              placeholder={{}}
              items={measurePoints}
            />

          </View>

          <View style={{ width: '15%', alignSelf: 'center', marginLeft: '3%' }}>

            <Icon name='caret-down-outline' style={{ color: 'white', alignSelf: 'center' }} size={16} type="Ionicons" />

          </View>


        </View>

        <View style={{
          backgroundColor: "#286cbe",
          shadowOffset: { width: 4, height: 4 },
          borderRadius: 10,  
          marginLeft: '4%', shadowColor: "rgba(0,0,0,0.25)", flex: 1, flexDirection: 'row'
        }}>
          <View style={{ width: '80%' }}>
            <RNPickerSelect
              style={{
                inputAndroid: {
                  fontFamily: 'roboto-medium',
                  color: 'white',
                  textAlign: 'left',
                  fontSize: 14.5,
                  marginLeft: '9%',
                  height: '100%',
                  width: '90%',
                },
                inputIOS: {
                  fontFamily: 'roboto-medium',
                  color: 'white',
                  textAlign: 'left',
                  marginLeft: '6%',
                  fontSize: 14.5,
                  height: '100%'
                },

              }}

              useNativeAndroidPickerStyle={false}
              onValueChange={(value) => requestMeasurePointDataInterval(currentSn,value,datepick) &&  setDatepickEnd(value)} 
              placeholder={{}}

              items={[
                //put value of items as last string datepickend
                
                { label: 'Últimas 24 horas', value: "2022-05- 17:40:21"},
                { label: 'Mês Passado', value: "2022-04-04 17:40:21" },
                { label: 'Últimos 7 dias', value: "2022-03-04 17:40:21" },
              ]}
            />
          </View>

          <View style={{ width: '15%', justifyContent: 'center', marginLeft: '3%' }}>

            <Icon name='caret-down-outline' style={{ color: 'white' }} size={16} type="Ionicons" />

          </View>
        </View>
      </View>
      <View height="94%" style={{borderColor:'red', borderWidth:2,}}>
        <MainCard height={cardHeight}>

        <View style={styles.consultaContainer}>

          {DataInterval && DataInterval.length > 0 && <LineChart
            data={{
              labels: ["14 Mar"],
              datasets: [
                {
                  data: DataInterval.map((item) => {
                    return ((item.hum) * 100) / 100;
                  }),
                  color: () => "#097907",
                  strokeWidth: 3,
                },

              ],
              legend: ["Humidade"] 
            }}
            width={300}
            height={240}
            chartConfig={chartConfig}
          />}

          {DataInterval && DataInterval.length > 0 && <LineChart
            data={{
              labels: ["14 Mar"],
              datasets: [
                {
                  data: DataInterval.map((item) => {
                    return ((item.temp) * 100) / 100;
                  }),
                  color: () => "#18A0FB", 
                  strokeWidth: 3, 
                },

              ],
              legend: ["Temperatura"]
            }}
            width={300}
            height={240}
            chartConfig={chartConfig}
          />}

          <View style={styles.containerDates}>
            <View style={styles.containerDatePicker}>
              <Text style={{fontFamily: 'roboto-regular', fontSize:16, marginRight:'2%',width:'20%', textAlign:'center'}}>De:</Text>      
           <View style={{borderWidth: 1.3, borderColor: '#C4C4C4', flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height:30, width:80}}> 
                  <Text onPress={() => showMode('date')}  placeholder="dd/mm/aaaa" style={{ fontFamily: 'roboto-bold', fontSize: 14, alignItems: 'center', marginRight:'8%', marginLeft:'8%'}}>{text}
                  <Icon name='calendar-outline' style={{ color: 'black', marginLeft: '1%' }} size={22} type="Ionicons" /> 
                  </Text>           
              </View>
            </View> 
            <View style={styles.containerDatePicker}>
              <Text style={{fontFamily: 'roboto-regular',fontSize:16,marginRight:'2%', width:'20%'}}>Até:</Text>     
                 <View style={{borderWidth: 1.3, borderColor: '#C4C4C4', flex:1, flexDirection: 'row',justifyContent: 'center', alignItems: 'center', height:30, width:80}}> 
                      <Text onPress={() => showModeEnd('date')} placeholder="dd/mm/aaaa" style={{ fontFamily: 'roboto-bold', fontSize: 14, alignItems: 'center' ,marginRight:'8%', marginLeft:'8%'}}>{textEnd}
                      <Icon name='calendar-outline' style={{ color: 'black'}} size={13} type="Ionicons" />
                      </Text>       
                  </View>
              </View>   
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
          {showEnd && (
            <DateTimePicker
              testID='dateTimePicker'
              value={dateEnd}
              mode={modeEnd}
              is24Hour={true}
              animationType={"fade"}
              androidMode={"default"}
              display="spinner"
              locale="pt-PT"
              onChange={onChangeEnd}
            />
          )}
        
        </View>

      <View style={styles.buttonContainer}> 
          <FlatButton 
          text="Filtrar" 
          textColor= "white"
          fontFamily= 'roboto-light'
          color="#17A2B8" 
          borderRadius={25}    
          paddingVertical={11}
          paddingHorizontal={52}
          fontSize={16}
          onPress={verificarDateInputs}         
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
  backgroundGradientToOpacity: 0,  
  color: (opacity = 1) => `rgba(2, 1, 1, ${opacity})`,
  strokeWidth: 3,
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
  consultaContainer:{
    height:'87.5%',
    padding: '4%',
  },
  
  buttonContainer:{
    width:'100%',
    marginTop:'10%',
    alignItems:'center',
    position:'relative',
  },
  containerDates:{
    padding:'2%',
    flex: 1, 
    flexDirection: 'row', 
    //borderWidth: 1, 
    //borderColor: 'red', 
    width:'100%'
  },
  
  containerDatePicker:{
    flex:1, 
    flexDirection: 'row', 
    //borderWidth:2, 
    //borderColor:'green', 
    justifyContent:'center',
    alignItems: 'center',
    marginLeft:'1%'
  }

});
