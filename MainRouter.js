import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/Home";
import StorageScreen from "./screens/Storage";

const Stack = createNativeStackNavigator();

export default function MainRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#ffe5e5", // Light pink background
          },
          headerTintColor: "#8b0000", // Dark red text/icons
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Storage" component={StorageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
