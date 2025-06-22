import { Text, View, StyleSheet } from "react-native";

export default function ProductCard({ data }) {
  return (
    <View style={styles.card}>
      <Text style={styles.text}><Text style={{...styles.text, fontWeight:'900', color:'#8b0000'}}>Nom:  </Text>{data.name}</Text>
      <Text style={styles.text}><Text style={{...styles.text, fontWeight:'900', color:'#8b0000'}}>Quantité:  </Text>{data.quantity}</Text>
      <Text style={styles.text}><Text style={{...styles.text, fontWeight:'900', color:'#8b0000'}}>Prix:  </Text>{data.price}</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: '#ffe5e5',
    borderRadius: 8,
    marginVertical: 6
  },
  text: {
    fontSize: 16,
    fontWeight:'500'
  }
});
