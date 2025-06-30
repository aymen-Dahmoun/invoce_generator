import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

export default function InputNumberGenerator({ name, label }) {
  const { control, setValue } = useFormContext();
  const { colorScheme } = useColorScheme();

  const generateTenDigits = () => {
    let s = "";
    for (let i = 0; i < 10; i++) {
      s += Math.floor(Math.random() * 10);
    }
    return s;
  };

  return (
    <View className="my-2">
      <Text className="font-bold text-lg text-red-900 dark:text-blue-200 mb-1">
        {label}
      </Text>

      <Controller
        control={control}
        name={name}
        defaultValue=""
        rules={{
          pattern: /^\d*$/,
        }}
        render={({ field: { onChange, value } }) => (
          <View
            className="flex-row items-center border border-red-600 dark:border-blue-400 bg-red-100 dark:bg-neutral-800 rounded-xl"
          >
            <TextInput
              value={value}
              onChangeText={text => {
                // strip nondigits but allow empty
                const sanitized = text.replace(/\D/g, "");
                onChange(sanitized);
              }}
              placeholder="Entrez un nombre"
              keyboardType="number-pad"
              placeholderTextColor={
                colorScheme === "light" ? "#aa6c6c" : "#60a5fa"
              }
              className="flex-1 px-4 py-3 text-red-900 dark:text-blue-400"
            />

            <TouchableOpacity
              onPress={() => {
                const rand = generateTenDigits();
                onChange(rand);
                setValue(name, rand, { shouldValidate: true });
              }}
              className="px-4"
            >
              <Feather
                name="hash"
                size={20}
                color={colorScheme === "light" ? "#dc2626" : "#60a5fa"}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
