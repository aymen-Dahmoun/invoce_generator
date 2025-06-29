import { Controller, useFormContext } from "react-hook-form";
import { Text, TextInput } from "react-native";
import { useColorScheme } from 'nativewind';

export default function InputField({ name, label, type }) {
  const { control } = useFormContext();
  const {colorScheme, tooggleColorScheme} = useColorScheme();

  

  return (
    <>
      <Text className="font-bold text-lg text-red-900 dark:text-blue-200">{label}</Text>
      <Controller
        control={control}
        name={name}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="border border-red-600 p-2 my-1.5 rounded-xl px-3 py-3 bg-red-100 text-red-900 dark:text-blue-400 dark:bg-neutral-800 dark:border-blue-400"
            onChangeText={onChange}
            value={value}
            placeholder={name}
            placeholderTextColor={colorScheme === "light" ? "#aa6c6c" : "#60a5fa"}
            keyboardType={type}
          />
        )}
      />
    </>
  );
}