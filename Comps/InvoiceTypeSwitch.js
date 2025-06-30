import { View, Text, Pressable } from "react-native";

export default function InvoiceTypeSwitch({ value, onValueChange }) {
  return (
    <View className="flex-row items-center justify-center my-4">
      <Pressable
        className={`px-4 py-2 rounded-l-full border border-red-400 dark:border-blue-400 ${
          value ? "bg-red-500 dark:bg-blue-700" : "bg-white dark:bg-neutral-800"
        }`}
        onPress={() => onValueChange(true)}
      >
        <Text className={`font-semibold ${value ? "text-white" : "text-red-900 dark:text-blue-200"}`}>
          Bon de Livraison
        </Text>
      </Pressable>
      <Pressable
        className={`px-4 py-2 rounded-r-full border-t border-b border-r border-red-400 dark:border-blue-400 ${
          !value ? "bg-red-500 dark:bg-blue-700" : "bg-white dark:bg-neutral-800"
        }`}
        onPress={() => onValueChange(false)}
      >
        <Text className={`font-semibold ${!value ? "text-white" : "text-red-900 dark:text-blue-200"}`}>
          Bon de Commande
        </Text>
      </Pressable>
    </View>
  );
}