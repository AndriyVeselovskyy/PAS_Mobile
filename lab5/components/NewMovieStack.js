import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text, Button, ScrollView } from 'react-native';


import { DATA } from "./MoviesScreen";


let newPosterCounter = 0

const screenColor = {
    bg: "#000",
    color: 'white',

}

const inputColor = {
    bg: '#1C1C1C',
    color: '#949494',
}
export default function NewMovieStack({ navigation, route }) {


    const [title, onChangeTitle] = useState('');
    const [type, onChangeType] = useState('');
    const [year, onChangeYear] = useState('');

    const [show, setShow] = useState(false)

    const newItem = () => {
        onChangeTitle('')
        onChangeType('')
        onChangeYear('')
        if (title != '') {
            const obj = { "Title": title, "Type": type, "Year": year, "imdbID": newPosterCounter + 1 }
            DATA.push(obj)
            newPosterCounter++
            navigation.navigate('MoviesScreen')
        } else {
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 5000);
        }

    }

    return (
        <View style={styles.screen}>
            <ScrollView 
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps='handled'
            >
                <Text style={styles.textStyle}>Title</Text>
                <View style={styles.sectionStyle}>
                    <TextInput
                        style={styles.textInputStyle}
                        onChangeText={(text) => onChangeTitle(text)}
                        value={title}
                        clearButtonMode={'while-editing'}
                    />
                </View>
                <View style={{ padding: 2 }}>
                    {show ? (<Text style={styles.textTipStyle}>This field must be filled!</Text>) : null}
                </View>
                <Text style={styles.textStyle}>Type</Text>
                <View style={styles.sectionStyle}>
                    <TextInput
                        style={styles.textInputStyle}
                        onChangeText={(text) => onChangeType(text)}
                        value={type}
                        clearButtonMode={'while-editing'}
                    />
                </View>
                <View style={{ padding: 2 }}></View>
                <Text style={styles.textStyle}>Year</Text>
                <View style={styles.sectionStyle}>
                    <TextInput
                        keyboardType={'numeric'}
                        style={styles.textInputStyle}
                        onChangeText={(text) => onChangeYear(text)}
                        value={year}
                        clearButtonMode={'while-editing'}
                        maxLength={4}
                    />
                </View>
                <View style={{ padding: 2 }}></View>
                <View style={styles.buttonStyleContainer}>
                    <Button
                        style={styles.buttonStyle}
                        title="Add"
                        onPress={newItem}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        backgroundColor: screenColor.bg,
        paddingHorizontal: 20,
        paddingVertical: 0,
    },

    textInputStyle: {
        flex: 1,
        height: 40,
        marginLeft: 10,
        borderRadius: 10,
        color: inputColor.color
        
    },

    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: inputColor.bg,

        height: 40,
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: 8,

        borderColor: '#808082',
        borderWidth: 1,
    },

    imageStyle: {
        margin: 5,
    },

    buttonStyleContainer: {
        marginVertical: 16,
        
    },

    buttonStyle: {
        color: screenColor.color,

    },

    textStyle: {
        marginLeft: 16,
        color: screenColor.color,
        marginTop: 20,
        fontSize: 16,
    },

    textTipStyle: {
        paddingTop: 6,
        marginLeft: 16,
        position: 'absolute',
        fontSize: 12,
        color: 'yellow',
    },

    closeButtonParent: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        color: '#3076CB'
    },
});

