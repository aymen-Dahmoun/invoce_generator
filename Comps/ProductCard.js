import { Text, View, StyleSheet } from "react-native";

export default function ProductCard({ data }) {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>Nom: {data.name}</Text>
      <Text style={styles.text}>Quantité: {data.quantity}</Text>
      <Text style={styles.text}>Prix: {data.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginVertical: 6
  },
  text: {
    fontSize: 16
  }
});
