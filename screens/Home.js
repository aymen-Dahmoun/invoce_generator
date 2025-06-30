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
import { useColorScheme } from 'nativewind';
import InvoiceTypeSwitch from '../Comps/InvoiceTypeSwitch';
import InputNumberGenerator from '../Comps/InputNumberGenerator';

const STORAGE_KEY = 'products';

export default function Home() {
  const methods = useForm();
  const [products, setProducts] = useState([]);
  const [productInput, setProductInput] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [commonProducts, setCommonProducts] = useState([]);
  const {colorScheme, tooggleColorScheme} = useColorScheme();
  const [isLivraison, setIsLivraison] = useState(true);

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
        <View className="flex-1 bg-white">
          <MainLayout>
            <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
              <View className="p-5 bg-white dark:bg-neutral-900">
                <InvoiceTypeSwitch value={isLivraison} onValueChange={setIsLivraison}/>
                <InputNumberGenerator name='InvoiceNumber' label={`Bon de ${isLivraison ? 'Livraison' : 'Commande'} N° :`} />
                <InputField name="client" label="Client:" />
                <InputField name="adresse" label="Adresse:" />

                <Text className="mt-5 text-lg font-bold text-red-900 dark:text-blue-200">
                  Ajouter un produit:
                </Text>

                <TextInput
                  className="border border-red-400 bg-red-100 rounded-xl px-3 py-3 my-2 text-red-900 dark:bg-neutral-800 dark:border-blue-400"
                  value={productInput}
                  onChangeText={handleProductInputChange}
                  placeholder="Nom du produit"
                  placeholderTextColor={colorScheme === "light" ? "#aa6c6c" : "#60a5fa"}
                />

                {showSuggestions && filteredSuggestions.length > 0 && (
                  <View className="bg-red-100 border border-red-300 rounded-lg mb-2 overflow-hidden dark:bg-blue-100 dark:border-blue-400">
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
                  className="border border-red-400 bg-red-100 rounded-xl px-3 py-3 my-2 text-red-900 dark:bg-neutral-800 dark:border-blue-400"
                  value={quantity}
                  onChangeText={setQuantity}
                  placeholder="Quantité"
                  keyboardType="numeric"
                  placeholderTextColor={colorScheme === "light" ? "#aa6c6c" : "#60a5fa"}
                />
                <TextInput
                  className="border border-red-400 bg-red-100 rounded-xl px-3 py-3 my-2 text-red-900 dark:bg-neutral-800 dark:border-blue-400"
                  value={price}
                  onChangeText={setPrice}
                  placeholder="Prix unitaire"
                  keyboardType="numeric"
                  placeholderTextColor={colorScheme === "light" ? "#aa6c6c" : "#60a5fa"}
                />

                <TouchableOpacity
                  className="bg-red-500 rounded-xl py-3 my-3 items-center dark:bg-blue-500"
                  onPress={addProduct}
                >
                  <Text className="text-white font-bold">
                    Ajouter le produit
                  </Text>
                </TouchableOpacity>

                <InputField name="SOLDE ANT" type="numeric" label="Solde Ancien (anciennes dettes):" />
                <InputField name="VRS JOUR" type="numeric" label="Versement de Jour (montant payé aujourd'hui):" />

                {products.length > 0 && (
                  <Text className="mt-5 text-lg font-bold text-red-900 dark:text-blue-400">
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
                  className="bg-red-900 rounded-2xl py-4 mt-8 items-center dark:bg-blue-800"
                  onPress={methods.handleSubmit(onSubmit)}
                >
                  <Text className="text-white text-base font-semibold">
                    Envoyer
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </MainLayout>
        </View>
      </KeyboardAvoidingView>
    </FormProvider>
  );
}
