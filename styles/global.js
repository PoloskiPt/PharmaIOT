import { StyleSheet, Platform } from 'react-native';

export const loginStyles = StyleSheet.create({
  loginContainer: {
    backgroundColor: '#398BEA',
    alignItems: 'center',
    display:"flex",
    height:'100%',
    justifyContent:'center',
    flexDirection:'column',
  },
  loginContent:{
    display:"flex",
    flexDirection:"column",
    height:'90%'
  },
  loginLogoText:{
    color: '#fff',
    fontSize: 44,
    fontWeight: "600",
    textAlign: 'center',
    justifyContent: "center",
    width: 308,
    },
  loginIcons:{
    height:35,
    width:35  
    },
  loginLogoImage:{
    width:49,
    height: 44,
  },
  loginLogoContainer:{
    display:"flex",
    flexDirection:"column",
    alignItems: "center",
    alignContent: "center",
    position: "absolute",
    top:5,
    width: 341,
    left:6,
  },
  loginForm:{
    display:"flex",
    justifyContent:'center',
    flexDirection:'column',
    padding:10,
    marginTop:10,
    marginBottom:30,
},
  lembrarDadosLabel:{
    color: 'black',
    height:30,
    marginLeft:8,
    marginTop: Platform.OS === 'ios'? 4: 2,
    fontSize: 16,
},
  checkBox:{
    borderRadius: 2,
},
  labelLogoContainer:{ 
    flexDirection: 'row',
    alignItems: 'flex-start',
},

loginLabel:{
    marginBottom:10,  
    fontSize: 26,
    fontWeight: "700",
    justifyContent: 'center',
    marginLeft: 14,

},
emailSection:{
    margin:4
},
emailLabel:{
    color: "rgba(57,139,234,0.94)",
    fontSize:20,
    fontWeight: '600',
    marginTop:6,
    marginLeft:8,
},

passwordLabel:{
  color: "rgba(57,139,234,0.94)",
  fontSize:20,
  fontWeight: '600',
  marginTop:10,
  marginLeft:8,
},
passwordSection:{
    margin:4
},
passwordView:{
  flexDirection: 'row',
  borderBottomWidth: 2,
  borderColor: 'grey',
  paddingBottom: 4,
},
eyeIcon:{
    height:20,
    width:24,
},  
borderTextInputPassword:{
  fontSize:16,
  flex: 1,
  
},
lembrarDadosSection:{
  flexDirection: 'row',
  alignItems:'flex-start',
  marginTop:20,
},
borderTextInput:{
    borderBottomWidth:2,
    borderBottomColor:'grey',
    height:40,
    fontSize:16,
},
webConnectLogoContainer:{
  position:'relative',
  bottom: Platform.OS === 'ios'? -50: -15,
  justifyContent:'center',
  alignItems:'center',
  left:15,
  height:60
},
message:{
  color:"red",
  fontFamily:"roboto-bold"
}

 
});

export const globalStyles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontFamily: 'roboto-bold',
    color: '#333',
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  headerText:{
    fontSize: 28
  },
  container: {
    flex: 1,
    backgroundColor: "#398BEA",
    alignItems: 'center',
    display:"flex",
    height:'100%',
    flexDirection:'column',
  },
  pickerButton:{
    backgroundColor: "#286cbe",
    shadowOffset: { width: 4, height: 4 },
    borderRadius: 10, 
    marginRight: '3%', 
    shadowColor: "rgba(0,0,0,0.25)", 
    flex: 1, 
    flexDirection: 'row'
  },
  pickerButton1 :{
    backgroundColor: "#286cbe",
    shadowOffset: { width: 4, height: 4 },
    borderRadius: 10, 
    marginLeft: '3%', 
    shadowColor: "rgba(0,0,0,0.25)", 
    flex: 1, 
    flexDirection: 'row'
  },
  input:{
    borderWidth:1,
    borderColor: '#ddd',
    padding: 10,
    fontSize:18,
    borderRadius:6,
    marginBottom:4,
  },
  arrowIcon:{
    color: 'white', 
    alignSelf: 'center' 
  },
  errorText: {
    color: 'crimson',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop:6,
    textAlign: 'center'
  }
});

export const consultaStyles = StyleSheet.create({
consultaContainer:{
  height:'87.5%',
  padding: '4%',
},

pickerContainer:{
  marginLeft:'2%',
  flex:1,
  height: '8%', 
  width: '87.5%',
  marginBottom: '-4%', 
  flexDirection: 'row', 
  justifyContent: 'space-between', 
  alignItems: 'center',
},


buttonContainer:{
  width:'100%',
  marginTop:'10%',
  alignItems:'center',
  position:'relative',
},
arrow:{
  width: '15%', 
  alignSelf: 'center', 
  marginLeft: '3%' 
},

showDate:{
  borderWidth: 1.3, 
  borderColor: '#C4C4C4', 
  flex:1, 
  flexDirection: 'row', 
  justifyContent: 'center', 
  alignItems: 'center', 
  height:30, 
  width:80
},
picked:{
  fontFamily: 'roboto-bold', 
  fontSize: 14, 
  alignItems: 'center' ,
  marginRight:'8%',
  marginLeft:'8%'
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

export const pickerSelectStyles = StyleSheet.create({
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
});

export const pickerSelectStyless = StyleSheet.create({
  inputAndroid: { 
    fontFamily: 'roboto-medium',
    color: 'white',
    textAlign:'left',
    fontSize: 16,
    marginLeft:'9%',
    height:'100%',
    width: '90%',
  }, 
  inputIOS: {
    fontFamily: 'roboto-medium',
    color:'white',
    textAlign:'left',
    marginLeft:'9%',
    height:'100%'
  },
  });

export const perfilStyles = StyleSheet.create({
  perfilContainer:{
    padding:28,
    height:'84%'
  },
  borderContainer:{
    borderBottomWidth:1 ,
    borderBottomColor: 'black',   
    paddingBottom: '3%',
    marginBottom: '3%'

  },
  buttonContainer:{
    width:'100%',
    marginTop:'6%',
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
    fontFamily: 'roboto-bold',
  },
  inputText:{
    color:'black', fontSize:16
  },
  success:{
    position:'absolute', 
    top:'40%', 
    alignSelf: 'center'
  }
})
export const monitorizacaoStyles = StyleSheet.create({
  monoContainer:{
    height:'87.5%',
    padding: '4%',
  },
  buttonContainer:{
    marginTop:'4%',
    alignItems:'center',
    marginLeft: '18%',
    borderWidth: 2,
    width: '66%',
    borderColor:"rgba(110,110,110,1)",
    borderRadius:15,
    position:'relative',
    marginBottom:'1.5%',
    padding:2
  },
pickerContainer: {
  height:'8%', 
  width:'40%', 
  flexDirection:'row', 
  justifyContent:'center',
  marginBottom:'-4%'
},
arrow: {
  width:'20%',alignSelf:'center',marginLeft:'3%'
},
text:{
  textAlign: 'center', 
  fontSize:24, 
  fontFamily: 'roboto-bold'
},
pieChart: {
  alignItems:'center', 
  justifyContent:'center'
},
pieChartText: {
  position:'absolute', 
  textAlign: 'center', 
  fontSize:28, 
  fontFamily: 'roboto-light'
}
})

export const configuracoesStyles = StyleSheet.create({

  listItemDefault: {
       borderBottomWidth:1, 
       borderColor:'#C4C4C4', 
       padding:'5%',
  },
  lastListItem: {
       padding:'5%'
  },
  defaultText:{
       fontFamily: 'roboto-light',
       fontSize:18,
       color:'black',
       marginLeft: '5%'
  }

})

export const notificacoesStyles = StyleSheet.create({
  modalStyle:{
      position: 'absolute',
  },
  statusView:{
      flexDirection:'row',
      padding:'1%',
      alignItems:'center',
     
  },
  notificationCard:{
      borderRadius: 8,
      padding:'2%',
      elevation: 10,
      backgroundColor: '#fff',
      shadowOffset: {width: 1, height: 1},
      shadowColor: 'black',
      shadowOpacity: 0.8,
      shadowRadius: 2,
      marginHorizontal: '1%',
      marginVertical: '1.2%',
    
  },
  closeIcon:{
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: '1%',
  },
  statusResolved:{
      color:'green',
      fontFamily: 'roboto-light',
  },
  statusNotResolved:{
      color:'red',
      fontFamily: 'roboto-light',
  },
  notificationSubtitleText:{
      fontSize:18,   
      fontFamily: 'roboto-light',
  }
})
export const images = {
  ratings:{
    '1' : require('../assets/rating-1.png'),
    '2' : require('../assets/rating-2.png'),
    '3' : require('../assets/rating-3.png'),
    '4' : require('../assets/rating-4.png'),
    '5' : require('../assets/rating-5.png'),
  }
}