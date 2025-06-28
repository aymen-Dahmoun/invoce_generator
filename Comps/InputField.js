import { Controller, useFormContext } from "react-hook-form";
import { Text, TextInput } from "react-native";

export default function InputField({ name, label, type }) {
  const { control } = useFormContext();

  return (
    <>
      <Text className="font-bold text-lg text-red-900">{label}</Text>
      <Controller
        control={control}
        name={name}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="border border-red-600 p-2 my-1.5 rounded-xl px-3 py-3 bg-red-100 text-red-900"
            onChangeText={onChange}
            value={value}
            placeholder={name}
            keyboardType={type}
          />
        )}
      />
    </>
  );
}