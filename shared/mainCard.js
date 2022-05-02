import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Platform } from 'react-native';

export default function MainCard(props){
    
    return(
        <View style={styles(props.height).mainCard}>
            <View style={styles.cardContent}>
               <ScrollView>
                {props.children}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = (height)  => StyleSheet.create({
    mainCard:{
        borderRadius: 15,
        elevation: 3,
        backgroundColor: '#fff',
        height: height,
        width: Platform.OS === 'ios'? '90%': '90%',
        marginTop: Platform.OS === 'ios'? 0: 10,
        marginHorizontal: 4,
        marginVertical: 2,

    },
    cardContent:{
        marginHorizontal: 18,
        marginVertical: 20,    
        borderRadius:15, 
    },
});