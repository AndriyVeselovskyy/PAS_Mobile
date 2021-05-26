import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, VirtualizedList, StyleSheet, Text, StatusBar, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { styleConfig } from "../style";
import * as Network from 'expo-network';
import { useSelector, useDispatch } from 'react-redux';
import { addFilm } from '../redux/actions';

export let DATA = []

// let texttext = 'init'

const getItemCount = (data) => data.length;

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
const getItem = (data, index) => {
    return ({
        id: `${data[index].imdbID}`,
        title: `${data[index].Title}`,
        year: `${data[index].Year}`,
        type: `${data[index].Type}`,
        poster: `${data[index].Poster}`
    })
};


export default function Movies({ navigation }) {


    const { filmsData } = useSelector(state => state.filmsReducer);
    const dispatch = useDispatch();

    const addToStorage = films => dispatch(addFilm(films));

    const handleAddFilm = films => {
        addToStorage(films);
    };
    
    const [dimensions, setDimensions] = useState({ window, screen });
    const [selectedData, setSelectedData] = useState([]);
    const [reloade, setReloade] = useState(false);

    const [storedData, setStoredData] = useState([]);

    const [search, setSearch] = useState('');

    const cachedContent = filmsData

    const filteredItems = (items, term) => {
        if (term.length === 0) {
            return null
        }
        if (term.trim().length === 0) {
            return null
        }
        return items.filter((item) => {
            if (
                item.Title
                    .replace(/[^a-zA-Z ]/g, "")
                    .toLowerCase()
                    .indexOf(term) > -1) {
                return (
                    item
                )
            }
        })
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

    const orientation = () => {
        const dim = Dimensions.get('screen');
        if (dim.height >= dim.width) {
            return portrait
        } else {
            return landscape
        }
    }

    function getUniqueListBy(arr, key) {
        return [...new Map(arr.map(item => [item[key], item])).values()]
    }

    const apiSearchFunction = async (text) => {

        const filteredText = text.toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/\s+/g, ' ').trim().replace(/,/g, '')

        if (filteredText.length < 3) {
            setSelectedData([])
        } else {
            let cashedContentData = cachedContent

            if ((await Network.getNetworkStateAsync()).isConnected) {
                let url = `http://www.omdbapi.com/?apikey=dbf1a99b&s=${filteredText}&page=1`;
                let response = await fetch(url)
                    .then(loadedData => loadedData.json())
                    .catch(error => {
                        console.log(error);
                    })


                cashedContentData = response.Search;
            } else {
                cashedContentData = cachedContent;
            }
            
            if (cashedContentData !== undefined) {
                setSelectedData(getUniqueListBy(cashedContentData, 'imdbID'))
                handleAddFilm(getUniqueListBy(cashedContentData, 'imdbID'))


            }
        }
    };

    const LeftActions = () => {
        return (
            <View style={portrait.rightAction}>
                <Text style={portrait.actionText}>Delete</Text>
            </View>
        )
    }

    function Item({ id, title, year, type, poster }) {
    
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={
                    () => navigation.navigate('Details', {
                        id: id,
                        title: title,
                        year: year,
                    })}>
                <Swipeable
                    renderRightActions={LeftActions}
                    onSwipeableRightOpen={() => {
                        const obj = selectedData.findIndex(elem => elem.imdbID === id)
                        selectedData.splice(obj, 1);
                        setReloade(!reloade)
                    }}>
                    <View style={portrait.item}>
                        <View style={portrait.posterViev}>
                            <Image
                                style={orientation().poster}
                                source={poster === 'N/A' ? require('../assets/posters/no-poster.jpg') : { uri: poster }}
                            />
                        </View>
                        <View style={orientation().textViev}>
                            <Text style={portrait.title}>{title}</Text>
                            <Text style={portrait.details}>{year}</Text>
                            <Text style={portrait.details}>{type}</Text>
                        </View>
                    </View>
                </Swipeable>
            </TouchableOpacity>
        )
    }
   
    
    return (
        <SafeAreaView style={portrait.container}>
            {
                React.useLayoutEffect(() => {
                    navigation.setOptions({
                        headerRight: () => (
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => { navigation.navigate('Create')}}>
                                <MaterialCommunityIcons style={portrait.addIcon} name="plus" color={'#808082'} size={30} />
                            </TouchableOpacity>
                        ),
                    });
                }, [navigation])
            }
            <View style={portrait.sectionStyle}>
                <MaterialCommunityIcons style={portrait.searchIcon} name="magnify" color={'#808082'} size={26} />
                <TextInput
                    style={portrait.textInputStyle}
                    placeholder={'Find movie you want'}
                    clearButtonMode={'while-editing'}
                    onChangeText={(text) => {
                        apiSearchFunction(text)
                        setSearch(text)
                        }   
                    }
                    
                />
            </View>
            <VirtualizedList
                data={selectedData}
                ItemSeparatorComponent={() => {return(<View style={portrait.separator}/>)}}
                renderItem={({ item }) => (
                    <Item id={item.id} title={item.title} year={item.year} type={item.type} poster={item.poster} />
                )}
                getItemCount={getItemCount}
                getItem={getItem}
            />

        </SafeAreaView>
    );
}


const portrait = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        backgroundColor: styleConfig.bg,
    },

    separator: {
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: styleConfig.separator,
        width: '92%',
        height: 0.5,
    },

    item: {
        flexDirection: 'row',
        backgroundColor: styleConfig.bg,
        height: 'auto',
        justifyContent: 'center',
        marginHorizontal: 0,
        padding: 20,
    },

    title: {
        fontSize: 20,
        color: styleConfig.color
    },

    poster: {
        width: 86,
        height: 150,
        borderRadius: 1,
        borderColor: styleConfig.color,
       
        marginTop: 6
    },

    posterViev: {
        flex: 2
    },

    textViev: {
        flex: 10,
        marginLeft: 50,
    },


    details: {
        fontSize: 16,
        marginTop: 10,
        color: styleConfig.color
    },

    textInputStyle: {
        flex: 1,
        height: 40,
        margin: 2,
        borderRadius: 10,
        color: styleConfig.searchColor.color
        
    },

    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: styleConfig.searchColor.bg,

        height: 40,
        borderRadius: 12,
        marginTop: 10,
        marginHorizontal: 6,
        marginBottom: 3,
    },

    searchIcon: {
        margin: 8,
        color: styleConfig.searchColor.color
    },



    rightAction: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'red',

    },

    actionText: {
        color: '#fff',
        padding: 20,
        textAlign: 'right'
    },

    addIcon: {
        textAlign: 'right',
        marginHorizontal: 16,
        marginBottom: 5,
        marginTop: 2,
        color: 'white'
    }
});

const landscape = StyleSheet.create({
    textViev: {
        marginRight: 20,
        flex: 10,
        marginLeft: -20
    },

    poster: {
        width: 80,
        height: 135,
        borderRadius: 1,
        marginTop: 6,
        borderColor: styleConfig.color,
        borderWidth: 3,
    },

    
})
