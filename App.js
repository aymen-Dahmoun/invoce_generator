import React from 'react';
import { View } from 'react-native';
import MainRouter from './MainRouter';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './global.css'
import 'react-native-reanimated';
import { useColorScheme } from 'nativewind';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

ErrorUtils.setGlobalHandler((error, isFatal) => {
  console.log("Caught global error:", error);
  // Optionally: send to Sentry or show a fallback UI
});

export default function App() {
  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false,
  });

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <MainRouter />
      </View>
    </SafeAreaProvider>
  );
}