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
              borderColor: '#cc4b4b',
              padding: 10,
              marginVertical: 6,
              borderRadius: 10,
              backgroundColor: '#ffe5e5',
              color: '#5a1a1a',
            }}
            onChangeText={onChange}
            value={value}
            placeholder={name}
            
          />
        )}
      />
    </>
  );
}
