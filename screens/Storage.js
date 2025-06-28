import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
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
  const [unitPrice, setUnitPrice] = useState("");

  useEffect(() => {
    fetchStoredProducts();
  }, []);

  const fetchStoredProducts = async () => {
    const stored = await getData(STORAGE_KEY);
    if (stored) setProducts(stored);
  };

  const saveProduct = async () => {
    if (!productName.trim() || !unitPrice.trim()) {
      Alert.alert('Entrée invalide', 'assurez-vous de remplir le nom du produit et le prix unitaire');
      return;
    }

    const newProduct = { name: productName, description, unitPrice };
    const updated = [...products, newProduct];

    setProducts(updated);
    await setData(STORAGE_KEY, updated);

    setProductName("");
    setDescription("");
    setUnitPrice("");
    setModalVisible(false);
  };

  const deleteProduct = async (index) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
    await setData(STORAGE_KEY, updated);
  };

  const handleDeleteAll = async () => {
    Alert.alert(
      "Confirmation",
      "Êtes-vous sûr de vouloir supprimer tous les produits ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            await setData(STORAGE_KEY, []);
            setProducts([]);
          },
        },
      ]
    );
  };

  const renderItem = ({ item, index }) => (
    <View className="bg-red-100 border border-red-300 rounded-xl p-4 mb-3 flex-row items-center justify-between">
      <View className="flex-1">
        <Text className="text-lg font-semibold text-red-800 mb-1">{item.name}</Text>
        <Text className="text-base text-red-800 mb-1">{item.unitPrice ? Number(item.unitPrice).toFixed(2) : '0.00'} DZD</Text>
        {item.description ? <Text className="text-sm text-red-700">{item.description}</Text> : null}
      </View>
      <TouchableOpacity onPress={() => deleteProduct(index)}>
        <Feather name="trash-2" size={20} color="#a30000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <MainLayout>
        <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
          <View className="p-5 bg-white flex-grow">
            <Text className="text-2xl font-bold text-red-900 text-center mb-4">
              Produits Fréquemment Utilisés
            </Text>
            <FlatList
              data={products}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderItem}
              scrollEnabled={false}
            />
          </View>
        </ScrollView>
        <UtilsBar onAdd={() => setModalVisible(true)} onChange={fetchStoredProducts} onDelete={handleDeleteAll} />

        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            className="flex-1 bg-black bg-opacity-40 justify-center items-center"
          >
            <View className="w-11/12 bg-red-50 p-5 rounded-2xl border border-red-300">
              <Text className="text-xl font-bold text-red-900 text-center mb-4">
                Ajouter un produit
              </Text>

              <TextInput
                className="border border-red-400 bg-red-100 rounded-xl px-3 py-2 mb-3 text-red-900"
                placeholder="Nom du produit"
                placeholderTextColor="#aa6c6c"
                value={productName}
                onChangeText={setProductName}
              />
              <TextInput
                className="border border-red-400 bg-red-100 rounded-xl px-3 py-2 mb-3 text-red-900"
                placeholder="Description"
                placeholderTextColor="#aa6c6c"
                value={description}
                onChangeText={setDescription}
                multiline
              />
              <TextInput
                className="border border-red-400 bg-red-100 rounded-xl px-3 py-2 mb-5 text-red-900"
                placeholder="Prix Unitaire"
                placeholderTextColor="#aa6c6c"
                value={unitPrice}
                keyboardType="numeric"
                onChangeText={setUnitPrice}
              />

              <TouchableOpacity className="bg-red-500 rounded-xl py-3 mb-3 items-center" onPress={saveProduct}>
                <Text className="text-white font-bold">Ajouter</Text>
              </TouchableOpacity>

              <TouchableOpacity className="bg-gray-300 rounded-xl py-3 items-center" onPress={() => setModalVisible(false)}>
                <Text className="text-white font-bold">Annuler</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </MainLayout>
    </SafeAreaView>
  );
}
