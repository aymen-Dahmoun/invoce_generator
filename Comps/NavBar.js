import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { CommonActions, useNavigation } from "@react-navigation/native";

export default function NavBar() {
  const navigation = useNavigation();

  return (
    <View className="flex-row justify-around py-6 bg-red-100 border-t border-t-red-300">
      <TouchableOpacity
        className="items-center justify-center flex-1 flex-row"
        onPress={() =>
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Home" }],
            })
          )
        }
      >
        <Feather name="home" size={22} color="#8b0000" />
        <Text className="text-xs text-red-900 mt-0.5 ml-1">Accueil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="items-center justify-center flex-1 flex-row"
        onPress={() => navigation.navigate("Storage")}
      >
        <Feather name="archive" size={22} color="#8b0000" />
        <Text className="text-xs text-red-900 mt-0.5 ml-1">Stock</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="items-center justify-center flex-1 flex-row"
        onPress={() => navigation.navigate("Settings")}
      >
        <Feather name="settings" size={22} color="#8b0000" />
        <Text className="text-xs text-red-900 mt-0.5 ml-1">Stock</Text>
      </TouchableOpacity>
    </View>
  );
}