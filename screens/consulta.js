import React, {useState} from 'react';
import { StyleSheet, View, Text, Dimensions, Button,TextInput, Platform, Modal} from 'react-native';
import MainCard from '../shared/mainCard';
import { globalStyles } from '../styles/global';
import { LineChart } from "react-native-chart-kit";
import FlatButton from '../shared/button';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function Consulta() {
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

  let cardHeight = Platform.OS === 'android'? '95%': "95%";
  const data = {
    labels: ["14 Mar", "21 Mar", "28 Mar", "4 Apr", " 9 Apr"],
    datasets: [
      {
        data: [13, 14, 15, 16, 20, 18],
        color: () => `rgba(1,1,1)`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Temperatura"] // optional
  };

  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={globalStyles.container}>         
       
      <View style={{ height:'8%', width:'90%', marginTop:4, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>

    <View style={{backgroundColor: "rgb(94,147,174)", 
     shadowOffset: { width: 4, height: 4 }, 
    borderRadius:10, width:'29%', height:'90%', 
    marginRight:'1%',shadowColor:"rgba(0,0,0,0.25)",flex:1,flexDirection:'row', borderColor:'red', borderWidth:2}}>
     <View style={{width:'80%'}}>
     <RNPickerSelect
              
              style={{ 
                inputAndroid: { 
                color: 'white',
                textAlign:'left',
                marginLeft:'5%',
                height:'100%',
                width: '90%',
                borderWidth:2,
                borderColor:'red'
               }, 
               inputIOS: {
                 color:'white',
                 textAlign:'left',
                 marginLeft:'5%',
                 height:'100%'
               },

          }}
              useNativeAndroidPickerStyle={false}
              onValueChange={(value) => console.log(value)}
              items={[
                { label: 'Armazém', value: 'football' },
                { label: 'Gaveta_1', value: 'baseball' },
                { label: 'Gaveta_2', value: 'hockey' },
              ]}
              placeholder={{ label: " ", value: "default" }}
          />
     </View>
      
      <View style={{width:'15%',alignSelf:'center'}}>

      <Icon name='caret-down-outline' style={{color:'white', alignSelf:'center'}} size={15}  type="Ionicons" />

      </View>

          
    </View>

    <View style={{backgroundColor: "rgb(94,147,174)", 
     shadowOffset: { width: 4, height: 4 }, 
    borderRadius:10, width:'29%', height:'90%', 
    marginRight:'1%',shadowColor:"rgba(0,0,0,0.25)",flex:1,flexDirection:'row'}}>
     <View style={{width:'89%'}}>
     <RNPickerSelect            
              style={{ 
                inputAndroid: { 
                color: 'white',
                textAlign:'left',
                marginLeft:'5%',
                height:'100%',
                width: '100%',
               }, 
               inputIOS: {
                 color:'white',
                 textAlign:'left',
                 marginLeft:'5%',
                 height:'100%'
               },

          }}
              useNativeAndroidPickerStyle={false}
              onValueChange={(value) => console.log(value)}
              items={[
                { label: 'Armazém', value: 'football' },
                { label: 'Gaveta_1', value: 'baseball' },
                { label: 'Gaveta_2', value: 'hockey' },
              ]}
              placeholder={{ label: " ", value: "default" }}
          />
     </View>
      
      <View style={{width:'9%', justifyContent:'center', marginRight:'2%'}}>

      <Icon name='caret-down-outline' style={{color:'white'}} size={9}  type="Ionicons" />

      </View>

          
    </View>
     
    
      <FlatButton 
         width = '20%'
         height = '90%'
         text="Exportar Relatório" 
         borderRadius={10} 
         textColor= "white"
         color="#5E93AE"
         textAlign="left" 
         paddingVertical={10}
         paddingHorizontal={10}
         fontSize={14}
         onPress={() => alert('a exportar...')}         
         />     
 
       
              
      </View>
      <View height="92%">   
      <MainCard height={cardHeight}>
          
     
      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      />
    
      <View style={{margin:20, flex:1, flexDirection:'row', borderWidth:1,borderColor:'red' }}>
      <Text>De:</Text>
      <Text onPress={() => showMode('date')} placeholder="dd/mm/aaaa" style={{fontWeight: 'bold', fontSize:15, borderWidth:1.5, borderColor:'#C4C4C4', alignItems:'center'}}>{text} 
      <Icon name='calendar-outline' style={{height:40, width:40,color:'black'}} size={16}  type="Ionicons" /> </Text>  
           
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
