import { StyleSheet, Platform } from 'react-native';


export const loginStyles = StyleSheet.create({
  loginContainer: {
    //backgroundColor: 'rgba(57,139,234,0.94)',
    backgroundColor: '#398BEA',
    alignItems: 'center',
    display:"flex",
    height:'100%',
    justifyContent:'center',
    flexDirection:'column',

    //shadowColor: 'rgba(0,0,0,0.25)',
    //shadowOffset: { width: 0, height: 4 },
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
    //borderWidth: 1,
    //borderColor: 'red',
    //height:'100%',
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
    //justifyContent: 'center',
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
  //borderWidth:1,
  //borderColor: 'red',
  height:60
}

 
});

export const globalStyles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontFamily: 'nunito-bold',
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
  
  input:{
    borderWidth:1,
    borderColor: '#ddd',
    padding: 10,
    fontSize:18,
    borderRadius:6,
    marginBottom:4,
  },
  errorText: {
    color: 'crimson',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop:6,
    textAlign: 'center'
  }
});

export const images = {
  ratings:{
    '1' : require('../assets/rating-1.png'),
    '2' : require('../assets/rating-2.png'),
    '3' : require('../assets/rating-3.png'),
    '4' : require('../assets/rating-4.png'),
    '5' : require('../assets/rating-5.png'),
  }
}