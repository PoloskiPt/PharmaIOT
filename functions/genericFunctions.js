import * as SecureStore from 'expo-secure-store';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

/** DOWNLOAD Cerificado Calibração PDF **/
export const onShare = async () => {
    const {uri: localUri} = await FileSystem.downloadAsync(
      'https://app.pharmaiot.pt/Pdfs/ProjetoFinal-TQS.pdf',
      FileSystem.documentDirectory + 'Certificado-Calibracao.pdf'
    ).catch((error) => {
      console.error(error)
    })
    await Sharing.shareAsync(localUri)
      .catch((err) => console.log('Sharing::error', err))
  }

/** ENDPOINTS **/
const notificationsEndpoint= "https://app.pharmaiot.pt/pharmaiotApi/api/monitorizacao/getAlarmHistory.php";
const tokensEndpoint= "https://app.pharmaiot.pt/pharmaiotApi/api/tokens/createToken.php";
const measurePointsEndpoint= "https://app.pharmaiot.pt/pharmaiotApi/api/monitorizacao/getAllMeasurePoints.php";
const measurePointsDataIntervalEndpoint= "https://app.pharmaiot.pt/pharmaiotApi/api/monitorizacao/getAllMeasurePointsInterval.php";
const measurePointDataEndpoint= "https://app.pharmaiot.pt/pharmaiotApi/api/monitorizacao/getAllMeasurePoints_status.php";
const measurePointDataLastDayEndpoint= "https://app.pharmaiot.pt/pharmaiotApi/api/monitorizacao/getMeasurePointsLastDay.php";
const updateProfileEndpoint="https://app.pharmaiot.pt/pharmaiotApi/api/users/update_profile.php";

//** GET MEASURE POINTS **/

export async function getMeasurePoints() {
    let measurePointsArray = [];
    
    let reqs = await fetch(measurePointsEndpoint,{
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'charset': 'utf-8',
        },
    });
    let resp = await reqs.json()
    .then(console.log())
    .catch((error) => alert(error))
    
    resp.map(element => {
        measurePointsArray.push(
          { label: element['name'], value: element['sn'] },
      )
     }); 
     
     return measurePointsArray;
    }

//** GET MEASURE POINTS **/

export async function getMeasurePointData(sn) {
    let reqs = await fetch(measurePointDataEndpoint,{
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            sn: sn,
        })
    });
    let resp = await reqs.json()
    .then(console.log())
    .catch((error) => alert(error))
    return resp;
    }

    export async function getMeasurePointDataLastDay(sn) {
        let reqs = await fetch(measurePointDataLastDayEndpoint,{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                sn: sn,
            })
        });
        let resp = await reqs.json()
        .then(console.log())
        .catch((error) => alert(error))
        return resp;
        }

    //** GET MEASURE POINTS **/

export async function getMeasurePointDataInterval(sn,dt,dt1) {
    let reqs = await fetch(measurePointsDataIntervalEndpoint,{
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            sn: sn,
            dt:dt,
            dt1:dt1,
        })
    });
    let resp = await reqs.json()
    .then(console.log())
    .catch((error) => alert(error))
    return resp;
    }

//**  GET NOTIFICATIONS **/

export async function getNotifications() {
    let reqs = await fetch(notificationsEndpoint,{
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'charset': 'utf-8',
        },
    });
    let resp = await reqs.json()
    .then(console.log())
    .catch((error) => alert(error))
    return resp;

    }

//**  STORE NOTIFICAITON TOKENS DATABASE **/

export async function storeNotificationToken(token,pharmacy,datatime) {
    let reqs = await fetch(tokensEndpoint,{
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            token: token,
            pharmacy: pharmacy,
            datatime: datatime
        })
    });
    let resp = await reqs.json()
    .then(console.log())
    .catch((error) => alert(error))
    return resp;
    }

// ** stores a value on the secure store **//
export async function save(key, value){
        await SecureStore.setItemAsync(key, value);
    }

// ** deletes a value on the secure store **//
export async function deleteItem(key){
        await SecureStore.deleteItemAsync(key);
    }

