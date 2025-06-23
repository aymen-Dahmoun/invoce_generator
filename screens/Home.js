import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
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
  const [soldeAnt, setSoldeAnt] = useState(0)

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
    if (productInput.trim() === '' || quantity === '' || price === '') return;

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
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        style={{ flex: 1 }}
        >
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff0f0' }}>
        <MainLayout>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <InputField name="client" label="Client:" />

            <Text style={styles.label}>Ajouter un produit:</Text>

            <TextInput
              style={styles.input}
              value={productInput}
              onChangeText={handleProductInputChange}
              placeholder="Nom du produit"
              placeholderTextColor="#aa6c6c"
            />
            {showSuggestions && filteredSuggestions.length > 0 && (
              <View style={styles.suggestions}>
                {filteredSuggestions.map((item, index) => (
                  <TouchableOpacity key={index} onPress={() => handleSuggestionSelect(item)}>
                    <Text style={styles.suggestionItem}>
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
              style={styles.input}
              value={quantity}
              onChangeText={setQuantity}
              placeholder="Quantité"
              keyboardType="numeric"
              placeholderTextColor="#aa6c6c"
            />
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              placeholder="Prix unitaire"
              keyboardType="numeric"
              placeholderTextColor="#aa6c6c"
            />
            <TouchableOpacity style={styles.addButton} onPress={addProduct}>
              <Text style={styles.addButtonText}>Ajouter le produit</Text>
            </TouchableOpacity>
            
            
            <InputField name="SOLDE ANT" type='numeric' />
            <InputField name="VRS JOUR" type='numeric' />
            

            {products.length > 0 && <Text style={styles.label}>Produits ajoutés:</Text>}
            <FlatList
              data={products}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <ProductCard data={item} />}
              scrollEnabled={false}
            />

            <TouchableOpacity style={styles.submitButton} onPress={methods.handleSubmit(onSubmit)}>
              <Text style={styles.submitButtonText}>Envoyer</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        </MainLayout>
      </SafeAreaView>
      </KeyboardAvoidingView>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 50,
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cc4b4b',
    padding: 10,
    marginVertical: 6,
    borderRadius: 10,
    backgroundColor: '#ffe5e5',
    color: '#5a1a1a',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20,
    color: '#8b0000',
  },
  suggestions: {
    backgroundColor: '#ffeaea',
    borderWidth: 1,
    borderColor: '#d47a7a',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
  },
  suggestionItem: {
    padding: 12,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#f4b3b3',
    color: '#6b1c1c',
  },
  addButton: {
    backgroundColor: '#d94f4f',
    padding: 12,
    borderRadius: 10,
    marginVertical: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#8b0000',
    padding: 14,
    borderRadius: 12,
    marginTop: 30,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
