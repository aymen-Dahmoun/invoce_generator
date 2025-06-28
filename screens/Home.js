import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import InputField from '../Comps/InputField';
import ProductCard from '../Comps/ProductCard';
import { getData } from '../LocalCache/storageUtils';
import MainLayout from '../Comps/MainLayout';
import { handlePrintInvoice } from '../utils/htmlInvoice';

const STORAGE_KEY = 'products';

export default function Home() {
  const methods = useForm();
  const [products, setProducts] = useState([]);
  const [productInput, setProductInput] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [commonProducts, setCommonProducts] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const stored = await getData(STORAGE_KEY);
      if (stored) setCommonProducts(stored);
    };
    fetchSuggestions();
  }, []);

  const onSubmit = (data) => {
    const fullData = { ...data, products };
    handlePrintInvoice(fullData);
  };

  const addProduct = () => {
    if (!productInput.trim() || !quantity || !price) return;
    setProducts(prev => [
      ...prev,
      { id: Date.now().toString(), name: productInput, quantity, price },
    ]);
    setProductInput('');
    setQuantity('');
    setPrice('');
    setShowSuggestions(false);
  };

  const handleProductInputChange = (text) => {
    setProductInput(text);
    setShowSuggestions(text.length > 0);
  };

  const handleSuggestionSelect = (item) => {
    setProductInput(item.name);
    if (item.quantity) setQuantity(item.quantity);
    if (item.unitPrice) setPrice(item.unitPrice);
    setShowSuggestions(false);
  };

  const filteredSuggestions = commonProducts.filter(item =>
    item.name.toLowerCase().includes(productInput.toLowerCase())
  );

  return (
    <FormProvider {...methods}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        className="flex-1"
      >
        <SafeAreaView className="flex-1 bg-white">
          <MainLayout>
            <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
              <View className="p-5 bg-white">
                <InputField name="client" label="Client:" />

                <Text className="mt-5 text-lg font-bold text-red-900">
                  Ajouter un produit:
                </Text>

                <TextInput
                  className="border border-red-400 bg-red-100 rounded-xl px-3 py-3 my-2 text-red-900"
                  value={productInput}
                  onChangeText={handleProductInputChange}
                  placeholder="Nom du produit"
                  placeholderTextColor="#aa6c6c"
                />

                {showSuggestions && filteredSuggestions.length > 0 && (
                  <View className="bg-red-100 border border-red-300 rounded-lg mb-2 overflow-hidden">
                    {filteredSuggestions.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleSuggestionSelect(item)}
                        className="border-b border-red-200 p-3"
                      >
                        <Text className="text-red-800">
                          {item.name}
                          {item.unitPrice && item.description
                            ? ` (Description: ${item.description}, Prix: ${item.unitPrice})`
                            : ''}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                <TextInput
                  className="border border-red-400 bg-red-100 rounded-xl px-3 py-3 my-2 text-red-900"
                  value={quantity}
                  onChangeText={setQuantity}
                  placeholder="Quantité"
                  keyboardType="numeric"
                  placeholderTextColor="#aa6c6c"
                />
                <TextInput
                  className="border border-red-400 bg-red-100 rounded-xl px-3 py-3 my-2 text-red-900"
                  value={price}
                  onChangeText={setPrice}
                  placeholder="Prix unitaire"
                  keyboardType="numeric"
                  placeholderTextColor="#aa6c6c"
                />

                <TouchableOpacity
                  className="bg-red-500 rounded-xl py-3 my-3 items-center"
                  onPress={addProduct}
                >
                  <Text className="text-white font-bold">
                    Ajouter le produit
                  </Text>
                </TouchableOpacity>

                <InputField name="SOLDE ANT" type="numeric" />
                <InputField name="VRS JOUR" type="numeric" />

                {products.length > 0 && (
                  <Text className="mt-5 text-lg font-bold text-red-900">
                    Produits ajoutés:
                  </Text>
                )}

                <FlatList
                  data={products}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => <ProductCard data={item} />}
                  scrollEnabled={false}
                />

                <TouchableOpacity
                  className="bg-red-900 rounded-2xl py-4 mt-8 items-center"
                  onPress={methods.handleSubmit(onSubmit)}
                >
                  <Text className="text-white text-base font-semibold">
                    Envoyer
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </MainLayout>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </FormProvider>
  );
}
