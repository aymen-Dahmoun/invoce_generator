import { View, Text, Switch, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { setData } from "../LocalCache/storageUtils";

export default function ThemeToggleButton({ isEnabled, toggleSwitch }) {
  const THEME_KEY = "isDarkModeEnabled";
  const prevValue = useRef(isEnabled);

  useEffect(() => {
    setData(THEME_KEY, isEnabled);
    if (prevValue.current !== isEnabled) {
      prevValue.current = isEnabled;
      if (typeof global !== "undefined" && global?.Expo) {
        global.Expo.Updates?.reload?.();
      } else if (typeof window !== "undefined" && window.location) {
        window.location.reload();
      }
    }
  }, [isEnabled]);

  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-red-100 dark:bg-neutral-900 rounded-2xl my-2">
      <View className="flex-row items-center space-x-3">
        <Feather
          name={isEnabled ? "moon" : "sun"}
          size={24}
          color={isEnabled ? "#60a5fa" : "#f87171"}
        />
        <Text className="text-base font-medium text-red-900 dark:text-blue-400">
          {isEnabled ? "Mode Sombre" : "Mode Clair"}
        </Text>
      </View>

      <Pressable onPress={toggleSwitch} className="active:scale-95">
        <Switch
          value={isEnabled}
          onValueChange={toggleSwitch}
          trackColor={{ false: "#fecaca", true: "#bfdbfe" }}
          thumbColor={isEnabled ? "#60a5fa" : "#f87171"}
        />
      </Pressable>
    </View>
  );
}