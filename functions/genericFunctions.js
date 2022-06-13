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
const notificationsEndpoint= "https://app.pharmaiot.pt/api/api/monitorizacao/getAlarmHistory.php";
const tokensEndpoint= "https://app.pharmaiot.pt/api/api/tokens/createToken.php";
const measurePointsEndpoint= "https://app.pharmaiot.pt/api/api/monitorizacao/getAllMeasurePoints.php";
const measurePointsDataIntervalEndpoint= "https://app.pharmaiot.pt/api/api/monitorizacao/getAllMeasurePointsInterval.php";
const measurePointDataEndpoint= "https://app.pharmaiot.pt/api/api/monitorizacao/getAllMeasurePoints_status.php";
const measurePointDataLastDayEndpoint= "https://app.pharmaiot.pt/api/api/monitorizacao/getMeasurePointsLastDay.php";
const updateProfileEndpoint="https://app.pharmaiot.pt/api/api/users/update_profile.php";

//** GET MEASURE POINTS **/

export async function getMeasurePoints(db_name) {
    let measurePointsArray = [];
    
    let reqs = await fetch(measurePointsEndpoint,{
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'charset': 'utf-8',
        },
        body: JSON.stringify({
            db_name: db_name,
            username: db_name
        })
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

export async function getMeasurePointData(sn, db_name) {
    let reqs = await fetch(measurePointDataEndpoint,{
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            sn: sn,
            db_name: db_name,
            username: db_name
        })
    });
    let resp = await reqs.json()
    .then(console.log())
    .catch((error) => alert(error))
    return resp;
    }

    export async function getMeasurePointDataLastDay(sn, db_name) {
        let reqs = await fetch(measurePointDataLastDayEndpoint,{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                sn: sn,
                db_name: db_name,
                username: db_name
            })
        });
        let resp = await reqs.json()
        .then(console.log())
        .catch((error) => alert(error))
        return resp;
        }

    //** GET MEASURE POINTS **/

export async function getMeasurePointDataInterval(sn,dt,dt1, db_name) {
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
            db_name: db_name,
            username: db_name
        })
    });
    let resp = await reqs.json()
    .then(console.log())
    .catch((error) => alert(error))
    return resp;
    }

//**  GET NOTIFICATIONS **/

export async function getNotifications(db_name) {
    let reqs = await fetch(notificationsEndpoint,{
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'charset': 'utf-8',
        },
        body: JSON.stringify({
            db_name: db_name,
            username: db_name
        })
    });
    let resp = await reqs.json()
    .then(console.log())
    .catch((error) => alert(error))
    return resp;

    }

//**  STORE NOTIFICAITON TOKENS DATABASE **/

export async function storeNotificationToken(token,pharmacy,datatime, db_name) {
    console.log("token generic: " + token);
    let reqs = await fetch(tokensEndpoint,{
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            token: token,
            pharmacy: pharmacy,
            datatime: datatime,
            db_name: db_name,
            username: db_name
        })
    });
    let resp = await reqs.json()
    .then()
    .catch((error) => console.log(error))
    console.log("resultado: " + JSON.stringify(resp));
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

