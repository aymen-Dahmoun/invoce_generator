import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons';

export default function UtilsBar({ onAdd, onChange, onDelete }) {
  return (
    <View className="flex-row justify-around p-3 border-t border-red-300 bg-red-100 bottom-0">
      <TouchableOpacity
        onPress={onAdd}
        className="flex-row items-center px-4 py-2 rounded-xl bg-red-500"
      >
        <Text className="text-base font-bold text-white pr-2">Ajouter</Text>
        <Feather name="plus" size={20} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onDelete}
        className="flex-row items-center px-4 py-2 rounded-xl bg-red-200"
      >
        <Text className="text-base font-bold text-red-800 pr-2">Supprimer tout</Text>
        <Feather name="x-circle" size={20} color="#a30000" />
      </TouchableOpacity>
    </View>
  );
}