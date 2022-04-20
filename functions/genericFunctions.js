import * as SecureStore from 'expo-secure-store';

/** ENDPOINTS **/
const notificationsEndpoint= "https://app.pharmaiot.pt/pharmaiotApi/api/monitorizacao/getAlarmHistory.php";
const tokensEndpoint= "https://app.pharmaiot.pt/pharmaiotApi/api/tokens/createToken.php";

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

