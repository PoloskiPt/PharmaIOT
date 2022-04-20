import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Platform } from 'react-native';

export default function MonoCard(props){
    
    return(
        <View style={styles(props.height).mainCard}>
            <View style={styles.cardContent}>            
                {props.children}             
            </View>
        </View>
    )
}

const styles = (height)  => StyleSheet.create({
    mainCard:{
        borderRadius: 15,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: {width: 1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        height: height,
        width: Platform.OS === 'ios'? 340: 360,
        marginTop: Platform.OS === 'ios'? '8%': '8%',
        marginHorizontal: 4,
        marginVertical: 6,
    },
    cardContent:{
        marginHorizontal: 18,
        marginVertical: 20,     
    },
});