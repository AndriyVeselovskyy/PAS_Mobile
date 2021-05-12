import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const backColor = "#000"
const textColor = "#fff"

export default function CreatorScreen() {
    
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>
                Веселовський Андрій{"\n"}Група ІО-83{"\n"}ЗК 8304
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
        backgroundColor: backColor,
    },

    textStyle: {
        textAlign: 'center', 
        color: textColor
    }
})
