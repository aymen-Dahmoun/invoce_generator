import React from 'react';
import { View } from 'react-native';
import MainRouter from './MainRouter';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './global.css'
import 'react-native-reanimated';
import { configureReanimatedLogger } from 'react-native-reanimated';
import { ThemeProvider } from './context/themeContext';


export default function App() {
  configureReanimatedLogger({
    disableStrictMode: true 
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
