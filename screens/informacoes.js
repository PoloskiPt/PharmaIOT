import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import InformacoesCard from '../shared/informacoesCard';
import { globalStyles,informacoesStyles } from '../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Informacoes({navigation}) {
     const nomesCreditos = [
   
          {content: 'Bruno Silva [Business Development Director]'},
          {content: 'Bernardino Neves [Project Manager]'},
          {content: 'Igor Soares [Software Developer]'},
          {content: 'Marco Francisco [Software Developer]'},
      ]; 
  return (
    <View style={globalStyles.container}>
         <SafeAreaView >
    
           <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <ScrollView   showsVerticalScrollIndicator ={false}
  showsHorizontalScrollIndicator={false}>
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

            <View style={{marginTop:'2%'}}>
            <Text style={{fontWeight:'bold'}}>Versão</Text>
            <Text>Versão: 2.7.4 R3.</Text>
            </View>
            </ScrollView>
            </View>
                     
                     </View>
          </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
centeredView: {
     flex: 1,
     alignItems: 'center',
   },
   modalView: {
     height: '98%',
     width: '96%',
     backgroundColor: 'white',
     borderTopRightRadius:10,
     borderTopLeftRadius:10, 
     borderBottomRightRadius:10,
     borderBottomLeftRadius:10, 
     paddingBottom:25,
     paddingLeft:25,
     paddingRight:25,
     paddingTop:4,
     alignItems: 'center',
     shadowColor: '#000',
     shadowOffset: {
       width: 0,
       height: 2,
     },
     shadowOpacity: 0.25,
     shadowRadius: 4,
     elevation: 5,
    
   }
});
