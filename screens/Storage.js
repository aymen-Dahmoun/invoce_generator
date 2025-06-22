import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import UtilsBar from "../Comps/UtilsBar";
import { getData, setData } from "../LocalCache/storageUtils";
import MainLayout from "../Comps/MainLayout";

const STORAGE_KEY = "products";

export default function Storage() {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchStoredProducts();
  }, []);

  const fetchStoredProducts = async () => {
    const stored = await getData(STORAGE_KEY);
    if (stored) setProducts(stored);
  };

  const saveProduct = async () => {
    if (!productName.trim() || !description.trim()) return;

    const newProduct = { name: productName, description };
    const updated = [...products, newProduct];

    setProducts(updated);
    await setData(STORAGE_KEY, updated);

    setProductName("");
    setDescription("");
    setModalVisible(false);
  };

  const deleteProduct = async (index) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
    await setData(STORAGE_KEY, updated);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <View style={{ flex: 1 }}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteProduct(index)}>
        <Feather name="trash-2" size={20} color="#a30000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff0f0" }}>
    <MainLayout>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.header}>Produits Fréquemment Utilisés</Text>
          <FlatList
            data={products}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            scrollEnabled={false}
          />
        </View>
        <UtilsBar
          onAdd={() => setModalVisible(true)}
          onChange={fetchStoredProducts}
        />
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ajouter un produit</Text>

            <TextInput
              style={styles.input}
              placeholder="Nom du produit"
              placeholderTextColor="#aa6c6c"
              value={productName}
              onChangeText={setProductName}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              placeholderTextColor="#aa6c6c"
              value={description}
              onChangeText={setDescription}
              multiline
            />

            <TouchableOpacity style={styles.addButton} onPress={saveProduct}>
              <Text style={styles.addButtonText}>Ajouter</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: "#bbb" }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.addButtonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      </MainLayout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 30,
  },
  container: {
    padding: 20,
    backgroundColor: "#fff0f0",
    flexGrow: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#8b0000",
    textAlign: "center",
  },
  item: {
    backgroundColor: "#ffe5e5",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#d77a7a",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#6b1c1c",
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 15,
    color: "#933",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff0f0",
    padding: 20,
    borderRadius: 15,
    borderColor: "#d77a7a",
    borderWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#8b0000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cc4b4b",
    padding: 10,
    marginVertical: 6,
    borderRadius: 10,
    backgroundColor: "#ffe5e5",
    color: "#5a1a1a",
  },
  addButton: {
    backgroundColor: "#d94f4f",
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
