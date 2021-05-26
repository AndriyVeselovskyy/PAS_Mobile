import React from 'react';
import { View, StyleSheet } from 'react-native';
import Image from 'react-native-image-progress';
import { styleConfig } from "../style";


const Layout = ({ layout, width, height }) => {

    const imageBoxStyle = (size = 1) => {
        if (size === 1) {
            return (
                {
                    width: width,
                    height: height,
                    borderWidth: 1,
                    borderColor: styleConfig.bg,
                }
            )
        } else if (size === 2) {
            return (
                {
                    width: width * 2,
                    height: height * 2,
                    borderWidth: 1,
                    borderColor: styleConfig.bg,
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
                {layout[0] && ImageBox(layout[0], imageBoxStyle(2))}
                <View style={styles.column}>
                    {layout[1] && ImageBox(layout[1])}
                    {layout[2] && ImageBox(layout[2])}
                </View>
            </View>
            <View style={styles.row}>
                {layout[3] && ImageBox(layout[3])}
                {layout[4] && ImageBox(layout[4])}
                {layout[5] && ImageBox(layout[5])}
            </View>

            <View style={styles.row}>
                <View style={styles.column}>
                    {layout[6] && ImageBox(layout[6])}
                    {layout[8] && ImageBox(layout[8])}
                </View>
                <View style={styles.column}>
                    {layout[7] && ImageBox(layout[7], imageBoxStyle(2))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
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

export default Layout
