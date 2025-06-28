import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/Home";
import StorageScreen from "./screens/Storage";
import FirstAppAccessTime from "./screens/FirstAppAccessTime";
import { getData, setData } from "./LocalCache/storageUtils";
import Settings from "./screens/Settings";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "isFirstSession";
const Stack = createNativeStackNavigator();

export default function MainRouter() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstSession, setIsFirstSession] = useState(false);

  useEffect(() => {
    
  (async () => {
    try {
      const stored = await getData(STORAGE_KEY);
      const isValid = stored && typeof stored === "object" && stored.nom;
      setIsFirstSession(!isValid);
    } catch (e) {
      Alert.alert("Erreur", "Impossible de lire les données de session.");
      setIsFirstSession(false);
    } finally {
      setIsLoading(false);
    }
  })();
}, []);


  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#8b0000" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: "#ffe5e5" },
          headerTintColor: "#8b0000",
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
        }}
        initialRouteName={isFirstSession ? "FirstAccess" : "Home"}
      >
        <Stack.Screen
          name="FirstAccess"
          options={{ headerShown: false }}
        >
          {props => (
            <FirstAppAccessTime
              {...props}
              onComplete={async () => {
                setIsFirstSession(false);
                props.navigation.replace("Home");
              }}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Storage" component={StorageScreen} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
