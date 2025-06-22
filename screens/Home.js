import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import InputField from '../Comps/InputField';
import ProductCard from '../Comps/ProductCard';

// Static product list with defaults
const COMMON_PRODUCTS = [
  { name: 'Ciment', quantity: '10', price: '800' },
  { name: 'Sable', quantity: '20', price: '400' },
  { name: 'Gravier', quantity: '15', price: '600' },
  { name: 'Fer à béton', quantity: '30', price: '1200' },
  { name: 'Peinture', quantity: '5', price: '1500' },
  { name: 'Brique', quantity: '50', price: '300' },
  { name: 'Plaque de plâtre', quantity: '8', price: '950' },
  { name: 'Parpaing', quantity: '40', price: '350' },
  { name: 'Colle carrelage', quantity: '6', price: '700' },
  { name: 'Bois', quantity: '12', price: '1100' },
  { name: 'Tuyaux PVC', quantity: '25', price: '500' }
];

export default function MyForm() {
  const methods = useForm();
  const [products, setProducts] = useState([]);
  const [productInput, setProductInput] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const onSubmit = (d) => {
    const fullData = { ...d, products };
    console.log(fullData);
  };

  const addProduct = () => {
    if (productInput.trim() === '' || quantity === '' || price === '') return;

    setProducts(prev => [
      ...prev,
      { id: Date.now().toString(), name: productInput, quantity, price }
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
    setQuantity(item.quantity);
    setPrice(item.price);
    setShowSuggestions(false);
  };

  const filteredSuggestions = COMMON_PRODUCTS.filter(item =>
    item.name.toLowerCase().includes(productInput.toLowerCase())
  );

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <InputField name="name" label="Bon de livraison:" />
        <InputField name="client" label="Client:" />

        <Text style={styles.label}>Ajouter un produit:</Text>

        <TextInput
          style={styles.input}
          value={productInput}
          onChangeText={handleProductInputChange}
          placeholder="Nom du produit"
        />
        {showSuggestions && (
          <View style={styles.suggestions}>
            {filteredSuggestions.map((item) => (
              <TouchableOpacity key={item.name} onPress={() => handleSuggestionSelect(item)}>
                <Text style={styles.suggestionItem}>
                  {item.name} (Qté: {item.quantity}, Prix: {item.price})
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
        />
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="Prix"
          keyboardType="numeric"
        />

        <Button title="Ajouter le produit" onPress={addProduct} />

        <Text style={styles.label}>Produits ajoutés:</Text>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductCard data={item} />}
        />

        <Button title="Envoyer" onPress={methods.handleSubmit(onSubmit)} />
      </View>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 5,
    borderRadius: 6
  },
  label: {
    fontWeight: 'bold',
    marginTop: 15
  },
  suggestions: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 8
  },
  suggestionItem: {
    padding: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#eee'
  }
});
