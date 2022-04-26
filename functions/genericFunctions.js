import * as SecureStore from 'expo-secure-store';

/** ENDPOINTS **/
const notificationsEndpoint= "https://app.pharmaiot.pt/pharmaiotApi/api/monitorizacao/getAlarmHistory.php";
const tokensEndpoint= "https://app.pharmaiot.pt/pharmaiotApi/api/tokens/createToken.php";
const measurePointsEndpoint= "https://app.pharmaiot.pt/pharmaiotApi/api/monitorizacao/getAllMeasurePoints.php";
const measurePointsDataIntervalEndpoint= "https://app.pharmaiot.pt/pharmaiotApi/api/monitorizacao/getAllMeasurePointsInterval.php";
const measurePointDataEndpoint= "https://app.pharmaiot.pt/pharmaiotApi/api/monitorizacao/getAllMeasurePoints_status.php";

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

