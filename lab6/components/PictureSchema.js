import React from 'react';
import { View, StyleSheet } from 'react-native';
import Image from 'react-native-image-progress';

const borderColor = '#18191D'

const PictureSchema = ({ imageCollector, width, height}) => {

    const imageBoxStyle = (size = 1) => {
        if (size === 1) {
            return(
                {
                    width: width,
                    height: height,
                    borderWidth: 1,
                    borderColor: borderColor,
                }
            )
        } else if (size === 2) {
            return(
                {
                    width: width * 2,
                    height: height * 2,
                    borderWidth: 1,
                    borderColor: borderColor,
                }
            )
        }
    }

    const ImageBox = (uri, style = imageBoxStyle()) => (
        <View style={style}>
            <Image
                style={styles.imageStyle}
                source={uri}
            />  
        </View>
    );


    return (
        <View>
            <View style={styles.row}>
                {imageCollector[0] && ImageBox(imageCollector[0], imageBoxStyle(2))}
                <View style={styles.column}>
                    {imageCollector[1] && ImageBox(imageCollector[1])}
                    {imageCollector[2] && ImageBox(imageCollector[2])}
                </View>
            </View>
            <View style={styles.row}>
                {imageCollector[3] && ImageBox(imageCollector[3])}
                {imageCollector[4] && ImageBox(imageCollector[4])}
                {imageCollector[5] && ImageBox(imageCollector[5])}
            </View>
                
            <View style={styles.row}>
                <View style={styles.column}>
                    {imageCollector[6] && ImageBox(imageCollector[6])}
                    {imageCollector[8] && ImageBox(imageCollector[8])}
                </View>
                <View style={styles.column}>
                    {imageCollector[7] && ImageBox(imageCollector[7], imageBoxStyle(2))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: "row",
    },

    column: {
        flexDirection: "column",
    },

    imageStyle: {
        height: "100%",
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    }
})

export default PictureSchema
