import React from 'react';
import { View } from 'react-native';
import MainRouter from './MainRouter';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './global.css'
import 'react-native-reanimated';
import { ThemeProvider } from './context/themeContext';
import { configureReanimatedLogger } from 'react-native-reanimated';


export default function App() {

configureReanimatedLogger({
  disableLogs: true
});


  return (
    <ThemeProvider >
      <SafeAreaProvider>
        <View style={{flex: 1}}>
          <MainRouter />
        </View>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
