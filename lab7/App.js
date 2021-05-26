import React from 'react';
import { NavigationContainer, DefaultTheme  } from '@react-navigation/native';
import RootNavigator from "./navigation/RootNavigator";
import { StatusBar  } from 'react-native';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

StatusBar.setBarStyle('light-content')

const backColor = "#000000"

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: backColor,
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer theme={MyTheme}>
          <RootNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}