import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Dimensions, Platform, StyleSheet, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { addImages } from "../redux/actions";
import { useSelector, useDispatch } from 'react-redux';

import Layout from "../layout";

import { styleConfig } from "../style"; 

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const maxSizeOfArray = (arr = [], maxArrSize = 9) => {
    const lst = [];
    for (let i = 0; i < Math.ceil(arr.length / maxArrSize); i++) {
        lst[i] = arr.slice(i * maxArrSize, (i * maxArrSize) + maxArrSize);
    }
    return lst;
};

export default function Picture({ navigation }) {

    const { imageStorage } = useSelector(state => state.filmsReducer);
    const dispatch = useDispatch();
    const addToStorage = img => dispatch(addImages(img));
    const handleAddImage = img => {
        addToStorage(img);
    };

    
    const [dimensions, setDimensions] = useState({ window, screen });

    const imageSize = {
        width: dimensions.window.width / 3,
        height: dimensions.window.width / 3,
    }

    const onChange = ({ window, screen }) => {
        setDimensions({ window, screen });
    };

    useEffect(() => {
        Dimensions.addEventListener("change", onChange);
        return () => {
            Dimensions.removeEventListener("change", onChange);
        };
    });

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('We need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    useEffect(() => {
        const url = `https://pixabay.com/api/?key=19193969-87191e5db266905fe8936d565&q=yellow+flowers&image_type=photo&per_page=27`;

        (async () => {
            try {
                const fetchResult = await fetch(url);
                const loadedData = await fetchResult.json();
                const loadedDataURIs = loadedData['hits'].map((loadData) => ({ uri: loadData['largeImageURL'] }));
                if (imageStorage.length <= 0) {
                    handleAddImage(loadedDataURIs)
                }
            } catch (e) {
                console.log(e.message)
            }
        })();
    }, []);

    const pickImage = async () => {
        let pickedImage = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            quality: 1,
        });

        if (!pickedImage.cancelled) {
            handleAddImage([...imageStorage, { 'uri': pickedImage.uri }])
        }
    };

    
    const PictureComponent = maxSizeOfArray(imageStorage).map(
        image => (
            <Layout
                key={image[0].uri}
                layout={image}
                width={imageSize.width}
                height={imageSize.height}
            />
        )
    );

    return (
        <SafeAreaView style={styles.container}>
            {
                imageStorage.length === 0 ?
                <View style={styles.textContainer}>
                    <Text style={styles.text}>No items found</Text>
                </View> : 
                    <View>
                        <TouchableOpacity
                            style={{ zIndex: 1, position: 'absolute', bottom: 10,  right: 0, color: 'white' }}
                            activeOpacity={0.5}
                            onPress={pickImage}>
                        <MaterialCommunityIcons style={styles.addIcon} name="plus-circle" color={'#808082'} size={50} />
                        </TouchableOpacity>


                    <ScrollView>
                        {PictureComponent}
                    </ScrollView>
                </View>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: styleConfig.bg,
        flex: 1,
        borderWidth: 1,
        borderColor: styleConfig.bg,
    },

    textContainer: {
        flex: 1,
        marginTop: '10%'
    },

    text: {
        textAlign: 'center',
        backgroundColor: styleConfig.bg,
        fontSize: 18,
        color: styleConfig.color

    },

    addIcon: {
        textAlign: 'right',
        marginHorizontal: 16,
        marginBottom: 5,
        marginTop: 2,
        color: 'white'
    },
});
