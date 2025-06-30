import { Text, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

export default function ProductCard({ data, onDelete }) {
  const { colorScheme } = useColorScheme();

  return (
    <View className="p-3 bg-red-100 rounded-lg my-1.5 flex-row justify-between items-start dark:bg-neutral-800">
      {/* Product Info */}
      <View className="flex-1 pr-2">
        <Text className="text-base font-medium text-red-900 dark:text-blue-400">
          <Text className="font-extrabold">Nom: </Text>{data.name}
        </Text>
        <Text className="text-base font-medium text-red-900 dark:text-blue-400">
          <Text className="font-extrabold">Quantité: </Text>{data.quantity}
        </Text>
        <Text className="text-base font-medium text-red-900 dark:text-blue-400">
          <Text className="font-extrabold">Prix: </Text>{data.price}
        </Text>
      </View>

      {/* Delete Button */}
      <TouchableOpacity onPress={onDelete} className="mt-1 p-1">
        <Feather
          name="trash-2"
          size={20}
          color={colorScheme === "light" ? "#b91c1c" : "#93c5fd"}
        />
      </TouchableOpacity>
    </View>
  );
}
