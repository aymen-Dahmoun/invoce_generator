import { Controller, useFormContext } from "react-hook-form";
import { Text, TextInput } from "react-native";

export default function InputField({ name, label }) {
  const { control } = useFormContext();

  return (
    <>
      <Text>{label}</Text>
      <Controller
        control={control}
        name={name}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={{
              borderWidth: 1,
              padding: 8,
              marginBottom: 10,
              borderRadius: 5,
            }}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
    </>
  );
}
