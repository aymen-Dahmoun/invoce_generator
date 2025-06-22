export default function InputField({ name, label }) {
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