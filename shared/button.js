import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default function FlatButton(props){
    return(
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles(props).button}>
                <Text style={styles(props).buttonText}>{props.text}</Text>    
            </View>
        </TouchableOpacity>
    )
}

const styles = (props)  => StyleSheet.create({
    button: {
        marginTop:10,
        marginBottom:10,
        borderRadius: props.borderRadius,
        paddingVertical: props.paddingVertical,
        paddingHorizontal: props.paddingHorizontal,
        backgroundColor: props.color,
        width:"100%",
        alignSelf:'center',
        height: props.height,
        justifyContent:'center'
    },
    buttonText: {
        color: props.textColor,
        fontWeight: props.fontWeight,
        //textTransform: 'uppercase',
        fontSize: props.fontSize,
        textAlign: props.textAlign,
        
    }
})