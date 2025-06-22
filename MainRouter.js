import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/Home";
import StorageScreen from "./screens/Storage";

const Stack = createNativeStackNavigator();

export default function MainRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Storage" component={StorageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
