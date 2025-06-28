import { Text, View } from "react-native";

export default function ProductCard({ data }) {
  return (
    <View className="p-3 bg-red-100 rounded-lg my-1.5">
      <Text className="text-base font-medium">
        <Text className="font-extrabold text-red-900">Nom: </Text>
        {data.name}
      </Text>
      <Text className="text-base font-medium">
        <Text className="font-extrabold text-red-900">Quantité: </Text>
        {data.quantity}
      </Text>
      <Text className="text-base font-medium">
        <Text className="font-extrabold text-red-900">Prix: </Text>
        {data.price}
      </Text>
    </View>
  );
}