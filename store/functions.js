import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import React from 'react';

 
export async function save(key, value){
    await SecureStore.setItemAsync(key, value);
}

export async function deleteItem(key){
    await SecureStore.deleteItemAsync(key);
}

export async function getValueFor(key){
    
    const [resultReturn, onChangeResult] = useState('');  
    
    let result = await SecureStore.getItemAsync(key);
    if(result){
        onChangeResult(result);
        return resultReturn;
        }else{
            return false;
        }
    
}