import * as SecureStore from 'expo-secure-store';

/** ENDPOINTS **/
const notificationsUrl= "https://app.pharmaiot.pt/pharmaiotApi/api/monitorizacao/getAlarmHistory.php";




//**  GET NOTIFICATIONS **/

export async function getNotifications() {
    let reqs = await fetch(notificationsUrl,{
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


// ** stores a value on the secure store **//
export async function save(key, value){
        await SecureStore.setItemAsync(key, value);
    }

// ** deletes a value on the secure store **//
export async function deleteItem(key){
        await SecureStore.deleteItemAsync(key);
    }

