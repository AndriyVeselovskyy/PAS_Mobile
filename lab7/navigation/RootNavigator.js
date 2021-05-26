import React from 'react';

import Account from "../components/Account";
import Diagram from "../components/Diagram";
import Movie from "../components/Movie";
import Picture from "../components/Picture";

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Create from "../modules/Create";
import Details from "../modules/Details";

import { styleConfig } from "../style";

const Stack = createStackNavigator();


const movieStackNavigator = () => {
    return(
        <Stack.Navigator initialRouteName="Movie">
            <Stack.Screen 
                name="Movie"
                component={Movie}
                options={{ ...styleConfig, title: 'Movie' }}
            />
            <Stack.Screen 
                name="Create"
                component={Create}
                options={{ ...styleConfig, title: 'Create your movie' }}
            />
            <Stack.Screen 
                name="Details"
                component={Details}
                options={{ ...styleConfig, title: 'Details' }}
            />
        </Stack.Navigator>
    )
}

const galleryStackNavigator = () => {
    return(
        <Stack.Navigator initialRouteName="Picture">
            <Stack.Screen
                name="Picture"
                component={Picture}
                options={{ ...styleConfig, title: 'Pictures' }}
            />
        </Stack.Navigator>
    )
}

const creatorStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Account">
            <Stack.Screen
                name="Account"
                component={Account}
                options={{ ...styleConfig, title: 'Creator' }}
            />
        </Stack.Navigator>
    )
}


const diagramStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Diagram">
            <Stack.Screen
                name="Diagram"
                component={Diagram}
                options={{ ...styleConfig, title: 'Charts' }}
            />
        </Stack.Navigator>
    )
}



const Tab = createBottomTabNavigator();

export default function RootNavigator() {
    return (
        <Tab.Navigator
            tabBarOptions={{ 
                labelStyle: { paddingBottom: 5 }, 
                style: { borderTopColor: styleConfig.footerStyle.shadowColor},
                activeTintColor: 'white',
                    activeBackgroundColor: styleConfig.footerStyle.backgroundColor,
                    inactiveBackgroundColor: styleConfig.footerStyle.backgroundColor }}>

            <Tab.Screen
                name="General"
                component={creatorStackNavigator}
                options={{
                    tabBarLabel: 'Creator',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Diagrams"
                component={diagramStackNavigator}
                options={{
                    tabBarLabel: 'Charts',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="poll" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Movies"
                component={movieStackNavigator}
                options={{
                    tabBarLabel: 'Movies',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="movie-roll" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Gallery"
                component={galleryStackNavigator}
                options={{
                    tabBarLabel: 'Pictures',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="image-frame" color={color} size={size} />
                    ),
                }}

            />
        </Tab.Navigator>
    );
}
