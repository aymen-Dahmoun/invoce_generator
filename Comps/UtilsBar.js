import { Text, TouchableOpacity, View, StyleSheet, Alert } from "react-native";
import { deleteData } from "../LocalCache/storageUtils";
import { Feather } from '@expo/vector-icons';


export default function UtilsBar({ onAdd, onChange, onDelete }) {

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onAdd} style={styles.btn}>
        <Text style={styles.text}>Ajouter</Text>
        <Feather name="plus" size={20} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onDelete} style={[styles.btn, { backgroundColor: "#ffcccc" }]}>
        <Text style={[styles.text, { color: "#a30000" }]}>Supprimer tout</Text>
        <Feather name="x-circle" size={20} color="#a30000" />
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
    bottom:0
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#d94f4f",
    flexDirection:'row',
    justifyContent: 'space-around',
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    paddingRight:10
  },
});
