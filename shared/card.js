import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Platform } from 'react-native';

export default function Card(props){
    return(
        <View style={styles.card}>
            <View style={styles.cardContent}>
                {props.children}
            </View>
        </View>
    )
}

export function MainCard(props){
    return(
        <View style={styles.mainCard}>
            <View style={styles.cardContent}>
                {props.children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainCard:{
        borderRadius: 15,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: {width: 1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        height: Platform.OS === 'android'? "82%": "75%",
        width: Platform.OS === 'ios'? 340: 360,
        marginTop: Platform.OS === 'ios'? 0: 10,
        marginHorizontal: 4,
        marginVertical: 6,
    },
    card:{
        borderRadius: 15,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: {width: 1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        height: Platform.OS === 'android'? "82%": "75%",
        width: Platform.OS === 'ios'? 340: 360,
        marginTop: Platform.OS === 'ios'? 150: 120,
        marginHorizontal: 4,
        marginVertical: 6,
    },
    cardContent:{
        marginHorizontal: 18,
        marginVertical: 20,
    },
});