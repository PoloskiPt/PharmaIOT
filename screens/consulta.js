import React, { useEffect, useState ,useRef, useContext} from 'react';
import { View, Text, Platform, Alert  } from 'react-native';
import { consultaStyles,pickerSelectStyles } from '../styles/global';
import MainCard from '../shared/mainCard';
import { globalStyles } from '../styles/global';
import { LineChart } from "react-native-chart-kit";
import FlatButton from '../shared/button';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';
import {UserContext} from '../store/userContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import Spinner from 'react-native-loading-spinner-overlay';
import { getMeasurePoints, getMeasurePointDataInterval,convertMonthNumberToText} from '../functions/genericFunctions';
import LottieView from 'lottie-react-native';

export default function Consulta() {

  const animation = useRef(null);
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
  const [graphDataStatus, setGraphDataStatus] = useState(null);
  const [dataInicialMiliseconds, setDataInicialMiliseconds] = useState(null);
  const [dataFinalMiliseconds, setDataFinalMiliseconds] = useState(null);
  const [yesterdayDate, setYesterdayDate] = useState(null);
  const [lastWeekDate, setLastWeekDate] = useState(null);
  const [lastMonthDate, setLastMonthDate] = useState(null);
  const {sessionDb} = useContext(UserContext);
  const [datasGrafico, setDatasGrafico] = useState();

  useEffect(() => {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    setDatepick(date);

    let today1 = new Date();
    today1.setDate(today1.getDate() - 1);
    let date1 = today1.getFullYear() + '-' + 0 + (today1.getMonth() + 1 ) + '-' + 0 + (today1.getDate() - 1) + ' ' + (today1.getHours()-1) + ':' + today1.getMinutes() + ':' + today1.getSeconds();
    setDatepickEnd(date1);
    
    requestMeasurePoints(0);
    getYesterdayDate();
    getLastWeekDate();
    getLastMonthDate();
  }, [sessionDb]);

 

  // converte a data em numerico para texto
  const convertNumberedDateToText = (datas) => {

      let dateArrayAux = [];

      for(let i = 0; i < datas.length; i++){
       
        let auxDataMonth = convertMonthNumberToText(datas[i].substring(5,7));
        let auxDataDay = datas[i].substring(8,10);
        dateArrayAux.push(auxDataDay + ' ' + auxDataMonth);

      }
      return dateArrayAux;
  }
   
  const getYesterdayDate = () => {

    let dateTeste = new Date();
    dateTeste.setDate(dateTeste.getDate() - 1);
    let fDateTeste = dateTeste.getFullYear() + '-' + (dateTeste.getMonth() + 1) + '-' +  dateTeste.getDate();
    setYesterdayDate(fDateTeste);

  }

  const getLastWeekDate = () => {

    let dateTeste = new Date();
    dateTeste.setDate(dateTeste.getDate() - 7);
    let fDateTeste = dateTeste.getFullYear() + '-' + (dateTeste.getMonth() + 1) + '-' +  dateTeste.getDate();
    setLastWeekDate(fDateTeste);

  }

  const getLastMonthDate = () => {

    let dateTeste = new Date();
    dateTeste.setDate(dateTeste.getDate());
    dateTeste.setMonth(dateTeste.getMonth()-1);
    let fDateTeste = dateTeste.getFullYear() + '-' + (dateTeste.getMonth() + 1) + '-' +  dateTeste.getDate();
    setLastMonthDate(fDateTeste);

  }

  //passar a farmacia por parametro mais tarde.
  async function requestMeasurePoints(id) {
   
    let resultMeasurePoints = await getMeasurePoints(sessionDb);
    setMeasurePoints(resultMeasurePoints);
    requestMeasurePointDataInterval(currentSn, datepickEnd, datepick);
     
  }
 
  async function requestMeasurePointDataInterval(sn, dt, dt1) {
    
    setIsLoading(true);
    let measurePointInterval = await getMeasurePointDataInterval(sn, dt, dt1, sessionDb);
    let auxDatas = parseInt(measurePointInterval.length);
    let datas = [];
    
    console.log("valor aux datas: " + auxDatas);
    if(auxDatas >= 3){
      console.log("é maior ou igual a 3");
      for(let i = 0; i < auxDatas; i++){
        if(i == 0 || i == auxDatas - 1){
        datas.push(measurePointInterval[i].dt);  
      }   
    }     
      let datasConvertidas = convertNumberedDateToText(datas);
      console.log(datasConvertidas);
      setDatasGrafico(datasConvertidas);
    }else{

      
      
    }
    
    setDataInterval(measurePointInterval);
    setIsLoading(false);
    if(measurePointInterval.message == "No data found") {
      setGraphDataStatus(false);
    }else{
      setGraphDataStatus(true);
    }

  }


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

    if(dataFinalMiliseconds < dataInicialMiliseconds){
      Alert.alert("Data inválida","A data inicial não pode ser maior que a data final.", [{text:'Compreendo'}]);
    }
    requestMeasurePointDataInterval(currentSn,date,dateEnd)
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
    console.log(tempDate.getTime());
    setDataInicialMiliseconds(tempDate.getTime());

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
    console.log(tempDate.getTime());
    setDataFinalMiliseconds(tempDate.getTime())
  }

  const showModeEnd = (currentMode) => {
    setShowEnd(true);
    setModeEnd(currentMode);
  }

  let cardHeight = Platform.OS === 'android' ? '90%' : "90%";

  return (

    <View style={globalStyles.container}>
      {isLoading && <Spinner visible={isLoading} textContent={'A carregar...'} textStyle={{ color: 'black' }} />}
      <View style={consultaStyles.pickerContainer}>

        <View style={globalStyles.pickerButton}>
          <View style={{ width: '70%' }}>
            <RNPickerSelect
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              onValueChange={(value) => requestMeasurePointDataInterval(value, datepickEnd,datepick) && setCurrentSn(value)}
              placeholder={{}}
              items={measurePoints}
            />

          </View>

          <View style={consultaStyles.arrow}>
            <Icon name='caret-down-outline' style={globalStyles.arrowIcon} size={16} type="Ionicons" />
          </View>

        </View>

        <View style={globalStyles.pickerButton1}>
          <View style={{ width: '80%' }}>
            <RNPickerSelect
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              onValueChange={(value) => requestMeasurePointDataInterval(currentSn,value,datepick) &&  setDatepickEnd(value)} 
              placeholder={{}}

              items={[
                { label: 'Últimas 24 horas', value: yesterdayDate},    
                { label: 'Últimos 7 dias', value: lastWeekDate },
                { label: 'Mês Passado', value: lastMonthDate },
              ]}
              
            />
          </View>

          <View style={consultaStyles.arrow}>
            <Icon name='caret-down-outline' style={globalStyles.arrowIcon} size={16} type="Ionicons" />
          </View>
        </View>
      </View>
      <View height="94%" style={{width:'88%'}}>
        <MainCard height={cardHeight}>

        <View style={consultaStyles.consultaContainer}>

          {DataInterval && DataInterval.length > 0 && <LineChart
            data={{
              labels: datasGrafico,
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
              labels: datasGrafico,
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

        {graphDataStatus != true && <LottieView
        ref={animation}
        style={{
          width: 100,
          height: 240,
          backgroundColor: 'transparent',
          zIndex:1
        }}
        loop={true}
        autoPlay={true}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../assets/no_data.json')}
      /> 
  }
          <View style={consultaStyles.containerDates}>
            <View style={consultaStyles.containerDatePicker}>
              <Text style={{fontFamily: 'roboto-regular', fontSize:16, marginRight:'2%',width:'20%', textAlign:'center'}}>De:</Text>      
           <View style={consultaStyles.showDate}> 
                  <Text onPress={() => showMode('date')}  placeholder="dd/mm/aaaa" style={consultaStyles.picked}>{text}
                  <Icon name='calendar-outline' style={{ color: 'black', marginLeft: '1%' }} size={20} type="Ionicons" /> 
                  </Text>           
              </View>
            </View> 
            <View style={consultaStyles.containerDatePicker}>
              <Text style={{fontFamily: 'roboto-regular',fontSize:16,marginRight:'2%', width:'20%'}}>Até:</Text>     
                 <View style={consultaStyles.showDate}> 
                      <Text onPress={() => showModeEnd('date')} placeholder="dd/mm/aaaa" style={consultaStyles.picked}>{textEnd}
                      <Icon name='calendar-outline' style={{ color: 'black'}} size={20} type="Ionicons" />
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
              display="default"
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
              display="default"
              locale="pt-PT"
              onChange={onChangeEnd}
            />
          )}

        <View style={consultaStyles.buttonContainer}> 
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






