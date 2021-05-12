import React from 'react';

import CreatorScreen from "../components/CreatorScreen";
import ChartsScreen from "../components/ChartsScreen";
import MoviesScreen from "../components/MoviesScreen";

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import NewMovieStack from "../components/NewMovieStack";
import MovieDetailsStack from "../components/MovieDetailsStack";

const Stack = createStackNavigator();


const darkGray = "#1C1C1C"
const backColor = "#000000"

const styleConfig = {    
    headerStyle: {
        backgroundColor: darkGray,
        shadowColor: backColor,
    },
    headerTintColor: '#FFF',
}

const moviesStackNavigator = () => {
    return(
        <Stack.Navigator initialRouteName="MoviesScreen">
            <Stack.Screen 
                name="MoviesScreen"
                component={MoviesScreen}
                options={{ ...styleConfig, title: 'Movies' }}
            />
            <Stack.Screen 
                name="NewMovieStack"
                component={NewMovieStack}
                options={{ ...styleConfig, title: 'Create your movie' }}
            />
            <Stack.Screen 
                name="MovieDetailsStack"
                component={MovieDetailsStack}
                options={{ ...styleConfig, title: 'Details' }}
            />
        </Stack.Navigator>
    )
}



const creatorStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="CreatorScreen">
            <Stack.Screen
                name="CreatorScreen"
                component={CreatorScreen}
                options={{ ...styleConfig, title: 'Creator' }}
            />
        </Stack.Navigator>
    )
}


const chartStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="ChartsScreen">
            <Stack.Screen
                name="ChartsScreen"
                component={ChartsScreen}
                options={{ ...styleConfig, title: 'Charts' }}
            />
        </Stack.Navigator>
    )
}



const Tab = createBottomTabNavigator();

export default function AppNavigation() {
    return (
        <Tab.Navigator
            tabBarOptions={{ 
                labelStyle: { paddingBottom: 5 }, 
                style: { borderTopColor: backColor},
                activeTintColor: 'white',
                    activeBackgroundColor: darkGray,
                    inactiveBackgroundColor: darkGray }}>

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
                name="Charts"
                component={chartStackNavigator}
                options={{
                    tabBarLabel: 'Charts',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="poll" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Movies"
                component={moviesStackNavigator}
                options={{
                    tabBarLabel: 'Movies',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="movie-roll" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
