import { Text, View } from "react-native";

export default function ProductCard({ data }) {
  return (
    <View className="p-3 bg-red-100 rounded-lg my-1.5 dark:bg-neutral-800">
      <Text className="text-base font-medium text-red-900 dark:text-blue-400">
        <Text className="font-extrabold text-red-900 dark:text-blue-400">Nom: </Text>
        {data.name}
      </Text>
      <Text className="text-base font-medium text-red-900 dark:text-blue-400">
        <Text className="font-extrabold text-red-900 dark:text-blue-400">Quantité: </Text>
        {data.quantity}
      </Text>
      <Text className="text-base font-medium text-red-900 dark:text-blue-400">
        <Text className="font-extrabold text-red-900 dark:text-blue-400">Prix: </Text>
        {data.price}
      </Text>
    </View>
  );
}