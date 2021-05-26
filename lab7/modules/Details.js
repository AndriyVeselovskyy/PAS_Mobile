import React, { useState, useEffect } from 'react';
import { View, Dimensions, Text, StyleSheet, SafeAreaView, ScrollView, Image, ActivityIndicator } from 'react-native';
import { styleConfig } from "../style";

import { addFilmInfo } from "../redux/actions";
import { useSelector, useDispatch } from 'react-redux';

import * as Network from 'expo-network';


const window = Dimensions.get("window");
const screen = Dimensions.get("screen");



export default function Details({ route }) {

    const { filmInfoData } = useSelector(state => state.filmsReducer);
    const dispatch = useDispatch();

    const addToStorage = films => dispatch(addFilmInfo(films));

    const handleAddFilmInfo = films => {
        addToStorage(films);
    };


    const { id } = route.params;
    const [data, setData] = useState([]);
    const [dimensions, setDimensions] = useState({ window, screen });
    const [isLoading, setLoading] = useState(true);

    const onChange = ({ window, screen }) => {
        setDimensions({ window, screen });
    };

    useEffect(() => {
        Dimensions.addEventListener("change", onChange);
        return () => {
            Dimensions.removeEventListener("change", onChange);
        };
    });

    const getUniqueInfoList = (arr, key) => {
            return [...new Map(arr.map(item => [item[key], item])).values()]
        }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetch(`http://www.omdbapi.com/?apikey=dbf1a99b&i=${id}`)
                    .then((response) => response.json())
                    .then( (data) => {
                                const filteredFilmInfo =
                                    getUniqueInfoList(
                                        [data, ...filmInfoData],
                                        'imdbID'
                                    )
                                // handleAddFilmInfo(filteredFilmInfo)
                            }
                    )
                    .finally(() => setLoading(false));
            } catch (error) {
                console.error(error);
            }
            
        }
        fetchData()
        
    }, []);
    
    const orientation = () => {
        const dim = Dimensions.get('screen');
        if (dim.height >= dim.width) {
            return styles
        } else {
            return landscape
        }
    }

    let check = []

    return (
        <SafeAreaView >
            <ScrollView style={{ backgroundColor: styleConfig.bg }}>
                {
                    filmInfoData.map((item, i) => {
                        if ( isLoading ) {
                            return (
                                <View key={item.imdbID} style={orientation().loading}><ActivityIndicator size='large' /></View>
                            )
                        } else if(id === item.imdbID) {
                            check.push('')
                            return (
                                <View style={orientation().infoScreen} key={item.imdbID}>
                                    <View style={orientation().infoImageSection}>
                                        <Image
                                            style={orientation().infoImage}
                                            source={ item.Poster === 'N/A' ? require('../assets/posters/no-poster.jpg') : { uri: item.Poster } }
                                        />
                                    </View>
                                    <View style={orientation().infoScreenTextView}>
                                        <Text style={orientation().titleText}>Title</Text>
                                        <Text style={orientation().subText}>{item.Title}</Text>

                                        <Text style={orientation().titleText}>Runtime</Text>
                                        <Text style={orientation().subText}>{item.Runtime}</Text>

                                        <Text style={orientation().titleText}>Genre</Text>
                                        <Text style={orientation().subText}>{item.Genre}</Text>

                                        <Text style={orientation().titleText}>Awards</Text>
                                        <Text style={orientation().subText}>{item.Awards}</Text>

                                        <Text style={orientation().titleText}>Rating</Text>
                                        <Text style={orientation().subText}>{item.imdbRating}</Text>

                                        <Text style={orientation().titleText}>Actors</Text>
                                        <Text style={orientation().subText}>{item.Actors}</Text>

                                        <Text style={orientation().titleText}>Language</Text>
                                        <Text style={orientation().subText}>{item.Language}</Text>

                                        <Text style={orientation().titleText}>Plot</Text>
                                        <Text style={orientation().subText}>{item.Plot}</Text>

                                        <Text style={orientation().titleText}>Director</Text>
                                        <Text style={orientation().subText}>{item.Director}</Text>

                                        <Text style={orientation().titleText}>Country</Text>
                                        <Text style={orientation().subText}>{item.Country}</Text>

                                        <Text style={orientation().titleText}>Production</Text>
                                        <Text style={orientation().subText}>{item.Production}</Text>

                                        <Text style={orientation().titleText}>Released</Text>
                                        <Text style={orientation().subText}>{item.Released}</Text>                   

                                        <Text style={orientation().titleText}>Year</Text>
                                        <Text style={orientation().subText}>{item.Year}{'\n'}</Text>

                                    </View>
                                </View>
                            )
                        }
                    })
                }
                
            </ScrollView>
            {
                check.length === 0 ?
                <View style={{backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', }}>
                    <Text>No Data In Database</Text>
                </View> : null
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
        backgroundColor: styleConfig.bg,
    },
    
     textStyle: {
        textAlign: 'center', 
        color: styleConfig.color,
        fontSize: 20,
    },

    titleText: {
        color: styleConfig.color,
        fontWeight: '600',
        fontSize: 20,
        marginVertical: 2,
    },

    subText: {
        color: styleConfig.color,
        fontWeight: '400',
        marginTop: 2,
        marginBottom: 8,
        fontSize: 18,
    },

    infoScreen: {
        paddingHorizontal: 13,
        paddingTop: 10,
        paddingBottom: 40,
        backgroundColor: styleConfig.bg
    },

    infoImageSection: {
        alignItems: 'center'
    },

    infoImage: {
        width: 180,
        height: 270,

        borderWidth: 2,
        borderColor: '#EEE'

    },
    infoScreenTextView: {
        marginTop: 30,
    },

    loading: {
        position: 'absolute',
        marginTop: 50,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: styleConfig.bg,
        color: styleConfig.color
    }


});


const landscape = StyleSheet.create({

    infoScreen: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 40,
        backgroundColor: styleConfig.bg,
        flex: 1,
        flexDirection: 'row',
    },

    infoImage: {
        width: 170,
        height: 300,
        borderWidth: 2,
        borderColor: styleConfig.color,
        marginTop: 6,
    },

    infoScreenTextView: {
        paddingLeft: 14,
        flexShrink: 1 
    },

    titleText: {
        color: styleConfig.color,
        fontWeight: '600',
        fontSize: 21,
        marginVertical: 1,
    },

    subText: {
        color: styleConfig.color,
        fontWeight: '400',
        fontSize: 19,
    },

    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: styleConfig.bg,
        color: styleConfig.color

    }
    

})