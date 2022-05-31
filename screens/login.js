import React, {useState, useContext, useEffect} from 'react';
import {View, Text, TouchableWithoutFeedback, StyleSheet ,Keyboard,Image,TextInput, Modal, ScrollView,TouchableOpacity} from 'react-native';
import { loginStyles } from '../styles/global';
import Card from '../shared/card';
import CheckBox from 'react-native-check-box';
import FlatButton from '../shared/button';
import { useNavigation } from '@react-navigation/native';
import md5 from 'md5';
import { UserContext } from '../store/userContext';
import {save,storeNotificationToken} from '../functions/genericFunctions';
import * as SecureStore from 'expo-secure-store';

export default function Login(){
const [name, setName] = useState('');
const [result, onChangeResult] = useState('');    
const [modalVisible, setModalVisible] = useState(false);
const nomesCreditos = [
   
    {content: 'Bruno Silva [Business Development Director]'},
    {content: 'Bernardino Neves [Project Manager]'},
    {content: 'Igor Soares [Sofware Developer]'},
    {content: 'Marco Francisco [Sofware Developer]'},
]; 

const {contextEmail, 
    setContextEmail ,
    contextPassword,
    setContextPassword, 
    contextRememberMe, 
    setContextRememberMe,
    setSessionEmail,
    setSessionPassword,
    sessionPharmacy, 
    setSessionPharmacy,
    expoPushToken
} = useContext(UserContext);

async function getValueForEmail(){
     
    let result = await SecureStore.getItemAsync('email');
    if(result){
      setContextEmail(result);
    }else{
      setContextEmail('');
    }
  }

async function getValueForPassword(){
     
    let result = await SecureStore.getItemAsync('pass');
    if(result){
      setContextPassword(result);
    }else{
      setContextPassword('');
    }
  }

async function getValueFor(key){
    let result = await SecureStore.getItemAsync(key);
    if(result){
        onChangeResult(result);
    }else{
        alert('Inválid key')
    }
}

const [checkBoxState, setCheckBoxState]  = useState(false);
const [email, setEmail] = useState(null);
const [password, setPassword] = useState(null);
const [passwordVisible, setPasswordVisible] = useState(true);   
const navigation = useNavigation();
const img1 = require('../assets/eye-slash-solid.png');
const [imageAsset, setImageAsset] = useState(img1);
const [message, setMessage] = useState(null);

const hideShowPassword = () => {
    setPasswordVisible(!passwordVisible);
   
    if(passwordVisible == true){
        
        const slasheye = require('../assets/eye-slash-solid.png');
        setImageAsset(slasheye);
    }else{
        const eye = require('../assets/eye-solid.png');
        setImageAsset(eye);
    }
}

useEffect(() => {
    //setEmail(contextEmail);
    //setPassword(contextPassword);
    if(contextRememberMe == "true"){     
        setEmail(contextEmail);
        setPassword(contextPassword);
        setCheckBoxState(true);   
    }else{
        setEmail("");
        setPassword("");
        setCheckBoxState(false);
    }
}, [contextEmail, setContextEmail ,contextPassword,setContextPassword, contextRememberMe, setContextRememberMe])

const loginUrl= "https://app.pharmaiot.pt/pharmaiotApi/api/users/login.php";

//fazer Login
async function login(){  
    
    let reqs = await fetch(loginUrl,{
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            email: email,
            pass: md5(password)
        })
    });
    let resp = await reqs.json()
    .then(console.log())
    .catch((error) => alert(resp.error))

    if(checkBoxState === true){
        setContextRememberMe("true");  
        save('rememberMe', "true");
        save('email', email);
        save('pass', password);
        save('name', resp.name + ' ' + resp.surname);
    }else if(checkBoxState === false){
        setContextRememberMe("false");  
        save('rememberMe', 'false');
    }
   
    getValueForEmail();
    getValueForPassword();
    getValueFor('email');
    getValueFor('pass');
    setName(resp.name);
   if(resp.status === true){
    save('session', "true");
    save('sessionEmail', email);
    save('sessionPassword', password);
    save('pharmacy', resp.pharmacy);
    setSessionEmail(email);
    setSessionPassword(password);
    setSessionPharmacy(JSON.stringify(resp.pharmacy));
    let datatime = "12/02/12";
    let tokenResult = await storeNotificationToken(expoPushToken, JSON.stringify(resp.pharmacy), datatime);
    console.log("resutado query: " + JSON.stringify(tokenResult));
    navigation.reset({
        index: 0,
        routes: [{name: 'homeScreen', params: {}}],
      });

    }else{
        setMessage("Credenciais inválidas");
   }  
}

return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
       <View style={loginStyles.loginContainer}>
            
       <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <ScrollView   showsVerticalScrollIndicator ={false}
  showsHorizontalScrollIndicator={false}>
            <Text style={styles.modalText}>Informações</Text>
            <View style={{marginBottom:'2%'}}>
            <Text style={{fontWeight:'bold'}}>PharmaIoT</Text>
            <Text>Sistema inovador de monitorização da temperatura e humidade exclusivo para Farmácias.</Text>
            <Text>A conservação correta dos medicamentos é um facto critico para garantir a sua qualidade, eficácia e segurança, pelo que é imprescindível a implementação de um sistema de gestão integrado que monitoriza os dados online, envia alertas e gera relatórios automáticos.</Text>
            </View>

            <View style={{marginBottom:'2%'}}>
            <Text style={{fontWeight:'bold'}}>Âmbito Geral</Text>
            <Text>A Empresa 2bWebConnect pode a qualquer momento modificar, adicionar ou eliminar qualquer um dos Termos de Utilização da APP. O utilizador é assim aconselhado a visitar esta página regularmente.</Text>
            </View>

            <View style={{marginBottom:'2%'}}>
            <Text style={{fontWeight:'bold'}}>Aceitação dos Termos de Utilização</Text>
            <Text>Ao aceder a esta APP, que mencionem os ditos termos, o utilizador declara ter lido, compreendido e aceite os Termos de Utilização abaixo descritos, sem necessidade de qualquer ato ou consentimento posterior.</Text>
            </View>

            <View style={{marginBottom:'2%'}}>
            <Text style={{fontWeight:'bold'}}>Direitos de Autor</Text>
            <Text>Os textos, imagens, gráficos, downloads, sons, vídeos, animação, e todas as outras informações juntamente com a forma como são representadas graficamente na APP, assim como a disposição e a estrutura do site (Materiais e Informação), estão todos sujeitos aos direitos de autor pela Empresa 2bWebConnect.</Text>
            </View>

            <View style={{marginBottom:'2%'}}>
            <Text style={{fontWeight:'bold', fontStyle: 'italic'}}>SecureStore</Text>
            <Text>A <Text style={{fontStyle:'italic'}}>SecureStore</Text> é uma API que permite encriptar e armazenar de forma segura informação relativa à utilização da aplicação no seu dispositivo.</Text>
            </View>

            <View style={{marginBottom:'2%'}}>
            <Text style={{fontWeight:'bold'}}>Empresa 2bWebConnect utiliza SecureStore para:</Text>
            <Text>A <Text style={{fontStyle:'italic'}}>SecureStore</Text> é utilizada para armazenar dados relativos à sessão do utilizador, permitindo que não seja necessário fazer autenticação sempre que a aplicação é utilizada.</Text>
            </View>

            <View style={{marginBottom:'2%'}}>
            <Text style={{fontWeight:'bold'}}>Lei Aplicável</Text>
            <Text>Os presentes Termos de Utilização são regidos e elaborados de acordo com a legislação Portuguesa. Qualquer conflito ou divergência de interpretação dos mesmos será submetido ao Tribunal português competente.</Text>
            </View>

            <View style={{marginBottom:'2%'}}>
            <Text style={{fontWeight:'bold', fontSize:22, marginBottom:'2%'}}>Política de Privacidade</Text>
            <Text>A privacidade do utilizador é importante para Empresa 2bWebConnect. Comprometer-nos a garantir a confidencialidade e privacidade na recolha e tratamento dos dados dos seus Clientes e Utilizadores, cumprindo com as suas obrigações ao abrigo do Regulamento Geral sobre a Protecção de Dados, tendo para esse efeito desenvolvido a presente Política de Privacidade.</Text>
            </View>

            <View style={{marginBottom:'2%'}}>
            <Text style={{fontWeight:'bold'}}>Âmbito Geral</Text>
            <Text>A Empresa 2bWebConnect é responsável por esta Política de Privacidade.
                  No âmbito desta Política de Privacidade definiu como:
                  Cliente: qualquer entidade que adquire os nossos serviços; e
                  Utilizador: qualquer visitante desta APP.
            </Text>
            </View>

            <View style={{marginBottom:'2%'}}>
            <Text style={{fontWeight:'bold'}}>Consentimento</Text>
            <Text>Ao utilizar esta APP, está a dar o seu consentimento para a recolha e utilização das informações.</Text>
            </View>

            <View style={{marginBottom:'2%'}}>
            <Text style={{fontWeight:'bold'}}>Dados recolhidos</Text>
            <Text>A Empresa 2bWebConnect recolhe dados dos seus Clientes e Utilizadores, mediante submissão de formulários existentes para esse efeito, em formato digital e/ou físico.</Text>
            <Text>A Empresa 2bWebConnect é a entidade responsável pela recolha e tratamento destes dados, decidindo as categorias dos dados recolhidos, qual o seu tratamento e as finalidades que dará aos mesmos.</Text>
            <Text>Todos os procedimentos realizados de modo automatizado e não automatizado que permitam a recolha, organização, armazenamento, modificação e a transferência dos dados pessoais serão considerados como “tratamento de dados pessoais”.
            </Text>
            </View>

            <View style={{marginBottom:'2%'}}>
            <Text style={{fontWeight:'bold'}}>Utilização dos dados</Text>
            <Text>Os dados recolhidos destinam-se ao processo de comunicação com os Clientes e Utilizadores, processamento de pedidos de informação, análise estatística, bem como a respetiva utilização para efeitos de marketing direto.</Text>
            <Text>Poderemos utilizar os seus dados pessoais para lhe enviar qualquer correio não solicitado relacionado com produtos ou ofertas comerciais que possam ser do seu interesse. Não vende nem negocia os seus dados.</Text>
            <Text>O utilizador autoriza expressamente a Empresa 2bWebConnect a enviar informação sobre produtos e serviços que possam ser do seu interesse utilizando os seus dados pessoais para efeitos de marketing direto através de qualquer canal de comunicação, nomeadamente mediante a utilização de correio eletrónico, telefone, SMS, MMS ou outras formas de chamada automática. Não comercializaremos nem partilharemos a sua base de dados de clientes com terceiros.</Text>
            </View>

            <View style={{marginBottom:'2%'}}>
            <Text style={{fontWeight:'bold'}}>Acesso aos dados</Text>
            <Text>Não divulgaremos a terceiros quaisquer dados pessoais dos seus Clientes e Utilizadores, sem o seu consentimento.</Text>
            <Text>Adotaremos as precauções razoáveis para garantir que os seus funcionários ou colaboradores com acesso a dados pessoais recebam formação adequada ao seu correto processamento, com respeito pela presente política e pelas obrigações legais de proteção de dados. No caso de incumprimento.</Text>
            </View>

            <View style={{marginBottom:'2%'}}>
            <Text style={{fontWeight:'bold'}}>Armazenamento dos dados</Text>
            <Text>Guardamos os dados dos seus clientes e Utilizadores nos seus servidores. Estes servidores são protegidos e mantidos de acordo com standards elevados de segurança e por forma a respeitar as leis de privacidade aplicáveis.</Text>
            </View>

            <View style={{marginBottom:'2%'}}>
            <Text style={{fontWeight:'bold'}}>Tempo de Armazenamento dos dados</Text>
            <Text>O período de tempo de armazenamento e conservação dos dados pessoais de Clientes e Utilizadores varia de acordo com a finalidade.</Text>
            <Text>Os dados pessoais dos Utilizadores da APP serão conservados até que os mesmos se mantenham ativos, sendo apagados com o fim desta utilização.</Text>
            <Text>Os dados pessoais fornecidos para efeitos da nossa lista de distribuição de conteúdos por correio eletrónicos serão armazenados até ao termo da sua utilização. Neste caso, os Clientes e Utilizadores podem cancelar, a qualquer momento.</Text>
            <Text>Os dados dos Clientes e outros dados específicos a conservar para cumprimento de obrigações legais poderão estender-se por um período máximo de até 10 anos (de acordo com o artigo 130º do Código do Imposto sobre o Rendimento das Pessoas Coletivas), findo o qual os mesmos serão eliminados.</Text>
            </View>

            <View style={{marginBottom:'2%'}}>
            <Text style={{fontWeight:'bold'}}>Segurança dos dados</Text>
            <Text>Tomámos as medidas técnicas e organizacionais necessárias para proteger, de forma adequada, os seus dados relativamente a processamento e acesso não autorizado.</Text>
            <Text>Desenvolvemos todos os esforços razoáveis adequados para evitar a utilização não autorizada ou ilegal dos dados pessoais do utilizador, bem como a sua perda, destruição ou danificação. No entanto, não podemos fornecer uma garantia absoluta relativamente aos dados do Utilizador. Sempre que exista uma fuga, perda ou violação de dados pessoais que seja suscetível de implicar um elevado risco para os direitos e liberdades dos seus Clientes e Utilizadores, iremos:</Text>
            <Text>Notificar, num espaço de 72 horas após ter tido conhecimento do ocorrido, as autoridades de controlo;</Text>
            <Text>Comunicar atempadamente a situação ao(s) titular(es) dos dados afetados.</Text>
            <Text>Garantimos a segurança dos dados pessoais do utilizador através dos seguintes meios: (1) uso de encriptação com certificado, (2) uso de password para acesso;.</Text>
            </View>

            <View style={{marginBottom:'2%'}}>
            <Text style={{fontWeight:'bold'}}>Direitos do utilizador</Text>
            <Text>De acordo com Lei da Proteção de Dados Pessoais, o utilizador tem direito a obter informações sobre os seus dados pessoais. Tem o direito de saber que dados pessoais foram processados pela Empresa 2bWebConnect, podendo também requerer à mesma para corrigir, complementar, bloquear ou eliminar os dados total ou parcialmente no caso de se revelarem incompletos, incorretos ou irrelevantes para efeitos de processamento. A atualização de dados deverá ser comunicada pelo próprio utilizador através do email geral@2bconnect.pt.</Text>
            <Text>Caso deseje, a qualquer momento, deixar de fazer parte da base de dados da Empresa 2bWebConnect poderá exercer esse direito, contactando-nos através do email geral@2bconnect.pt.</Text>
            </View>
            
            <Text style={{fontWeight:'bold'}}>Créditos:</Text>
            
            <Text>{nomesCreditos[0].content}</Text>
            <Text>{nomesCreditos[1].content}</Text>
            <Text>{nomesCreditos[2].content}</Text>
            <Text>{nomesCreditos[3].content}</Text>

            </ScrollView>
            
            <View style={{position:'relative', bottom:'-2%'}}>
      
            <FlatButton 
                    fontSize={18} 
                    borderRadius={12} 
                    text='Fechar' 
                    textColor="white" 
                    color="#398BEA"  
                    onPress={() => setModalVisible(!modalVisible)}
                    paddingVertical={14}
                    paddingHorizontal={16}
                    textAlign = 'center'  
                    />      

            </View>
                     
          </View>
        </View>
      </Modal> 
            
            <View style={loginStyles.loginContent}>     
            <View style={loginStyles.loginLogoContainer}>
                <Image source={require('../assets/logoLogin.png')} style={loginStyles.loginLogoImage} />
                <Text style={loginStyles.loginLogoText}>PharmaIOT</Text>
            </View>
            <Card>
            <Text style={loginStyles.loginLabel}>Login</Text>           
                <View style={loginStyles.loginForm}>       
                   <View style={loginStyles.emailSection}>
                       <View style={loginStyles.labelLogoContainer}>
                            <Image style={loginStyles.loginIcons}source= {require('../assets/email.png')}/>
                             <Text style={loginStyles.emailLabel}>Email</Text>                      
                       </View>                       
                        <TextInput 
                        value={email}
                        onChangeText={setEmail}
                        keyboardType='email-address' 
                        style={loginStyles.borderTextInput}/>
                   </View>              
                   <View style={loginStyles.passwordSection}>
                       
                       <View style={loginStyles.labelLogoContainer}>
                            <Image style={loginStyles.loginIcons}source= {require('../assets/lock.png')}/>
                            <Text style={loginStyles.passwordLabel}>Password</Text>                   
                       </View>    
             {/* Password section */}                
                     <View style={loginStyles.passwordView}>                      
                       <TextInput 
                       value={password}
                       onChangeText={setPassword}
                       secureTextEntry={passwordVisible} 
                       keyboardType={'default'} 
                       style={loginStyles.borderTextInputPassword}
                       />
                      <TouchableWithoutFeedback onPress={hideShowPassword}>
                       <Image style={loginStyles.eyeIcon}  source={imageAsset}/>
                       </TouchableWithoutFeedback>
                     </View>  
                     </View>
             {/*Fim password section */} 
                  
                  <View>
                      {message && ( <Text style={loginStyles.message}>{message}</Text> )}
                  </View>

                   <View style={loginStyles.lembrarDadosSection}>
                       <CheckBox 
                       style={loginStyles.checkBox}
                       isChecked={checkBoxState}
                       onClick={() => {{setCheckBoxState(!checkBoxState), console.log(checkBoxState)}}}
                       />
                       <Text style={loginStyles.lembrarDadosLabel}>Lembrar os meus dados</Text>
                   </View>   

                   <TouchableOpacity onPress={() => setModalVisible(true)}>
                   <View style={loginStyles.informacoesSection}>
                   <Image style={loginStyles.loginIcons}source= {require('../assets/info.png')}/>
                       <Text style={loginStyles.informacoesLabel}>Ver termos e condições</Text>
                   </View> 
                   </TouchableOpacity> 
                           
                   <FlatButton 
                    fontSize={20} 
                    borderRadius={7.5} 
                    text='Entrar' 
                    textColor="white" 
                    color="#398BEA"  
                    onPress={login} 
                    paddingVertical={14}
                    paddingHorizontal={10}
                    textAlign = 'center'  
                    />                  

                </View>                       
                                         
                <View style={loginStyles.webConnectLogoContainer}>
                     <Image source={require('../assets/logo_2bWebConnect.png')}/>
                </View> 
           
            </Card>

            </View>
        </View>
        </TouchableWithoutFeedback>
    )     
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      height: '100%',
      width: '100%',
      backgroundColor: 'white',
      borderTopRightRadius:20,
      borderTopLeftRadius:20, 
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      borderWidth:2
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 24
    },
  });