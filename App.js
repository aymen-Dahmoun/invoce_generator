import React, { useEffect } from 'react';
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
import { NavigationContainer } from '@react-navigation/native';
import { getData } from './LocalCache/storageUtils';

ErrorUtils.setGlobalHandler((error, isFatal) => {
  console.log("Caught global error:", error);
});

export default function App() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  useEffect(() => {
    (async () => {
      const stored = await getData("isDarkModeEnabled");
      if (typeof stored === "boolean") {
        if ((stored && colorScheme !== "dark") || (!stored && colorScheme !== "light")) {
          toggleColorScheme();
        }
      }
    })();
  }, []);

  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false,
  });

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <View style={{ flex: 1 }}>
          <MainRouter />
        </View>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}