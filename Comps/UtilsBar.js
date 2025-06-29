import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useColorScheme } from "nativewind";

export default function UtilsBar({ onAdd, onChange, onDelete }) {
    const {colorScheme, tooggleColorScheme} = useColorScheme();
  
  return (
    <View className="flex-row justify-around p-3 border-t border-red-300 bg-red-100 bottom-0 dark:bg-neutral-800 dark:border-blue-800">
      <TouchableOpacity
        onPress={onAdd}
        className="flex-row items-center px-4 py-2 rounded-xl bg-red-500 dark:bg-blue-500"
      >
        <Text className="text-base font-bold text-white pr-2">Ajouter</Text>
        <Feather name="plus" size={20} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onDelete}
        className="flex-row items-center px-4 py-2 rounded-xl bg-red-200 dark:bg-blue-200"
      >
        <Text className="text-base font-bold text-red-800 pr-2 dark:text-blue-800">Supprimer tout</Text>
        <Feather name="x-circle" size={20} color={colorScheme === "light" ? "#a30000" : "#1e40af"} />
      </TouchableOpacity>
    </View>
  );
}