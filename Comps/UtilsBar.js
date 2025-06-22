import { Text, TouchableOpacity, View, StyleSheet, Alert } from "react-native";
import { deleteData } from "../LocalCache/storageUtils";

const STORAGE_KEY = "suggested_products";

export default function UtilsBar({ onAdd, onChange }) {
  const clearAllProducts = () => {
    Alert.alert("Confirmer", "Supprimer tous les produits ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: async () => {
          await deleteData(STORAGE_KEY);
          onChange?.(); // Notify parent to refresh
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onAdd} style={styles.btn}>
        <Text style={styles.text}>➕ Ajouter</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={clearAllProducts} style={[styles.btn, { backgroundColor: "#ffcccc" }]}>
        <Text style={[styles.text, { color: "#a30000" }]}>🗑️ Supprimer tout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#d77a7a",
    backgroundColor: "#fff0f0",
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#d94f4f",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
