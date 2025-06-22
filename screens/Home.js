import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useForm, Controller, FormProvider, useFormContext } from 'react-hook-form';

function InputField({ name, label }) {
  const { control } = useFormContext(); // use context instead of props

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

export default function MyForm() {
  const methods = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <View style={{ padding: 20 }}>
        <InputField name="bonDeLivraison" label="Bon de livraison:" />
        <InputField name="client" label="Client:" />
        <InputField name="adresse" label="Adresse:" />
        <Button title="Envoyer" onPress={methods.handleSubmit(onSubmit)} />
      </View>
    </FormProvider>
  );
}
