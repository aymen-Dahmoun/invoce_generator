import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';
import { CommonActions, useNavigation } from "@react-navigation/native";

export default function NavBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() =>
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Home" }],
            })
          )
        }
      >
        <Feather name="home" size={22} color="#8b0000" />
        <Text style={styles.label}>Accueil</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate("Storage")}>
        <Feather name="archive" size={22} color="#8b0000" />
        <Text style={styles.label}>Stock</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#ffe5e5",
    borderTopWidth: 1,
    borderTopColor: "#d77a7a",
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 12,
    color: "#8b0000",
    marginTop: 2,
  },
});
