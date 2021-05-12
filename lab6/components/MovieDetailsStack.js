import React, { useState, useEffect } from 'react';
import { View, Dimensions, Text, StyleSheet, SafeAreaView, ScrollView, Image, ActivityIndicator } from 'react-native';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const screenColor = {
    bg: "#000",
    color: 'white',
}

export default function MovieDetailsStack({ route }) {

    const { id, title, year } = route.params;

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


    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetch(`http://www.omdbapi.com/?apikey=dbf1a99b&i=${id}`)
                    .then((response) => response.json())
                    .then((json) => setData(json))
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

    return (
        <>
            {isLoading ? <View style={orientation().loading}><ActivityIndicator size='large' /></View>:(
                <SafeAreaView>
                    <ScrollView style={{ backgroundColor: screenColor.bg }}>
                        <View style={orientation().infoScreen}>
                            <View style={orientation().infoImageSection}>
                                <Image
                                    style={orientation().infoImage}
                                    source={ data.Poster === 'N/A' ? require('../assets/posters/no-poster.jpg') : { uri: data.Poster } }
                                />
                            </View>
                            <View style={orientation().infoScreenTextView}>
                                <Text style={orientation().titleText}>Title</Text>
                                <Text style={orientation().subText}>{data.Title != '' ? data.Title : title}</Text>

                                <Text style={orientation().titleText}>Runtime</Text>
                                <Text style={orientation().subText}>{data.Runtime}</Text>

                                <Text style={orientation().titleText}>Genre</Text>
                                <Text style={orientation().subText}>{data.Genre}</Text>

                                <Text style={orientation().titleText}>Awards</Text>
                                <Text style={orientation().subText}>{data.Awards}</Text>

                                <Text style={orientation().titleText}>Rating</Text>
                                <Text style={orientation().subText}>{data.imdbRating}</Text>

                                <Text style={orientation().titleText}>Actors</Text>
                                <Text style={orientation().subText}>{data.Actors}</Text>

                                <Text style={orientation().titleText}>Language</Text>
                                <Text style={orientation().subText}>{data.Language}</Text>

                                <Text style={orientation().titleText}>Plot</Text>
                                <Text style={orientation().subText}>{data.Plot}</Text>

                                <Text style={orientation().titleText}>Director</Text>
                                <Text style={orientation().subText}>{data.Director}</Text>

                                <Text style={orientation().titleText}>Country</Text>
                                <Text style={orientation().subText}>{data.Country}</Text>

                                <Text style={orientation().titleText}>Production</Text>
                                <Text style={orientation().subText}>{data.Production}</Text>

                                <Text style={orientation().titleText}>Released</Text>
                                <Text style={orientation().subText}>{data.Released}</Text>                   

                                <Text style={orientation().titleText}>Year</Text>
                                <Text style={orientation().subText}>{data.Year != '' ? data.Year : year}{'\n'}</Text>

                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            )}
        </>
    );
}

const styles = StyleSheet.create({

    titleText: {
        color: screenColor.color,
        fontWeight: '600',
        fontSize: 20,
        marginVertical: 2,
        textAlign: 'center',
        letterSpacing: 2,
    },

    subText: {
        color: screenColor.color,
        fontWeight: '400',
        textAlign: 'center',
        marginTop: 2,
        marginBottom: 8,
        fontSize: 18,
        letterSpacing: 3,
    },

    infoScreen: {
        paddingHorizontal: 13,
        paddingTop: 10,
        paddingBottom: 40,
        backgroundColor: screenColor.bg
    },

    infoImageSection: {
        alignItems: 'center',
    },

    infoImage: {
        width: 200,
        height: 340,

        borderWidth: 2,
        borderColor: '#EEE'

    },
    infoScreenTextView: {
        marginTop: 30,
    },

    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: screenColor.bg,
        color: screenColor.color
    }


});


const landscape = StyleSheet.create({

    infoScreen: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 40,
        backgroundColor: screenColor.bg,
        flex: 1,
        flexDirection: 'row',
    },

    infoImage: {
        width: 170,
        height: 300,
        borderWidth: 2,
        borderColor: screenColor.color,
        marginTop: 6,
    },

    infoScreenTextView: {
        paddingLeft: 14,
        flexShrink: 1 
    },

    titleText: {
        color: screenColor.color,
        fontWeight: '600',
        fontSize: 21,
        marginVertical: 1,
        letterSpacing: 1        
    },

    subText: {
        color: screenColor.color,
        fontWeight: '400',
        fontSize: 19,
        letterSpacing: 2
    },

    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: screenColor.bg,
        color: screenColor.color

    }
    

})