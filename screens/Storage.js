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
import { useColorScheme } from "nativewind";

const STORAGE_KEY = "products";

export default function Storage() {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const { colorScheme } = useColorScheme();

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
  <View className="bg-white border border-red-400 rounded-xl p-4 mb-3 flex-row items-center justify-between dark:bg-neutral-800 dark:border-blue-900">
    <View className="flex-1">
      <Text className="text-lg font-semibold text-red-900 mb-1 dark:text-blue-200">{item.name}</Text>
      <Text className="text-base text-red-900 mb-1 dark:text-blue-200">
        {item.unitPrice ? Number(item.unitPrice).toFixed(2) : '0.00'} DZD
      </Text>
      {item.description ? (
        <Text className="text-sm text-red-700 dark:text-blue-300">{item.description}</Text>
      ) : null}
    </View>
    <TouchableOpacity onPress={() => deleteProduct(index)}>
      <Feather name="trash-2" size={20} color={colorScheme === "light" ? "#f87171" : "#93c5fd"} />
    </TouchableOpacity>
  </View>
);

return (
  <SafeAreaView className="flex-1 bg-white dark:bg-neutral-900">
    <MainLayout>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View className="p-5 flex-grow bg-white dark:bg-neutral-900">
          <Text className="text-2xl font-bold text-red-900 text-center mb-4 dark:text-blue-200">
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
        onDismiss={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          className="flex-1 bg-black/50 justify-center items-center"
        >
          <View className="w-11/12 bg-red-100 p-5 rounded-2xl border border-red-400 dark:bg-neutral-900 dark:border-blue-900">
            <Text className="text-xl font-bold text-red-900 text-center mb-4 dark:text-blue-200">
              Ajouter un produit
            </Text>

            <TextInput
              className="border border-red-400 bg-red-50 rounded-xl px-3 py-2 mb-3 text-blue-900 dark:bg-neutral-800 dark:border-blue-900 dark:text-blue-200"
              placeholder="Nom du produit"
              placeholderTextColor={colorScheme === "light" ? "#aa6c6c" : "#60a5fa"}
              value={productName}
              onChangeText={setProductName}
            />
            <TextInput
              className="border border-red-400 bg-red-50 rounded-xl px-3 py-2 mb-3 text-red-900 dark:bg-neutral-800 dark:border-blue-900 dark:text-blue-200"
              placeholder="Description"
              placeholderTextColor={colorScheme === "light" ? "#aa6c6c" : "#60a5fa"}
              value={description}
              onChangeText={setDescription}
              multiline
            />
            <TextInput
              className="border border-red-400 bg-red-50 rounded-xl px-3 py-2 mb-5 text-red-900 dark:bg-neutral-800 dark:border-blue-900 dark:text-blue-200"
              placeholder="Prix Unitaire"
              placeholderTextColor={colorScheme === "light" ? "#aa6c6c" : "#60a5fa"}
              value={unitPrice}
              keyboardType="numeric"
              onChangeText={setUnitPrice}
            />

            <TouchableOpacity className="bg-red-700 rounded-xl py-3 mb-3 items-center dark:bg-blue-500" onPress={saveProduct}>
              <Text className="text-white font-bold">Ajouter</Text>
            </TouchableOpacity>

             <TouchableOpacity className="bg-red-300 rounded-xl py-3 items-center dark:bg-blue-700" onPress={() => setModalVisible(false)}>
              <Text className="text-white font-bold">Annuler</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </MainLayout>
  </SafeAreaView>
  );
}