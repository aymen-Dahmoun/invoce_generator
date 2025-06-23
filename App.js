import React from 'react';
import { View } from 'react-native';
import MainRouter from './MainRouter';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {

  return (
    <SafeAreaProvider>
    <View style={{flex: 1}}>
      <MainRouter />
    </View>
    </SafeAreaProvider>
  );
}
