import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useColorScheme } from "nativewind";

export default function NavBar() {
  const navigation = useNavigation();
  const {colorScheme} = useColorScheme();

  return (
    <View className="flex-row justify-around py-6 bg-red-100 border-t border-t-red-300 dark:border-blue-800 dark:bg-neutral-800">
      <TouchableOpacity
        className="items-center justify-center flex-1 flex-row"
        onPress={() =>
          navigation.navigate("Home")
        }
      >
        <Feather name="home" size={22} color={colorScheme === 'dark' ? "#bfdbfe" : "#8b0000"} />
        <Text className="text-xs text-red-900 mt-0.5 ml-1 dark:text-blue-200">Accueil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="items-center justify-center flex-1 flex-row"
        onPress={() => navigation.navigate("Storage")}
      >
        <Feather name="archive" size={22} color={colorScheme === 'dark' ? "#bfdbfe" : "#8b0000"} />
        <Text className="text-xs text-red-900 mt-0.5 ml-1 dark:text-blue-200">Stock</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="items-center justify-center flex-1 flex-row"
        onPress={() => navigation.navigate("Settings")}
      >
        <Feather name="settings" size={22} color={colorScheme === 'dark' ? "#bfdbfe" : "#8b0000"} />
        <Text className="text-xs text-red-900 mt-0.5 ml-1 dark:text-blue-200">Parametre</Text>
      </TouchableOpacity>
    </View>
  );
}