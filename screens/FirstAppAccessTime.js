import React, { useState } from "react";
import {
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  View,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { setData } from "../LocalCache/storageUtils";
import { useNavigation } from "@react-navigation/native";

export default function FirstAppAccessTime({ onComplete }) {
  const navigation = useNavigation();
  const [nom, setNom] = useState("");
  const [business, setBusiness] = useState("");
  const [address, setAddress] = useState("");

  const handleConfirm = async () => {
    if (!nom || !business || !address) {
      Alert.alert("Champs requis", "Veuillez remplir tous les champs.");
      return;
    }

    const formData = { nom, business, address };

    try {
      await setData("isFirstSession", formData); // Save full object

      Alert.alert("Succès", "Les données ont été enregistrées !", [
        {
          text: "OK",
          onPress: () => {
            if (onComplete) {
              onComplete(); // triggers replace("Home")
            } else {
              navigation.replace("Home");
            }
          },
        },
      ]);
    } catch (error) {
      console.error("Erreur de stockage :", error);
      Alert.alert("Erreur", "Impossible d'enregistrer les données.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1 justify-center px-6"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TextInput
          className="border border-red-600 bg-red-100 text-red-900 p-3 rounded-xl my-2"
          value={nom}
          onChangeText={setNom}
          placeholder="Nom"
          placeholderTextColor="#aa6c6c"
        />
        <TextInput
          className="border border-red-600 bg-red-100 text-red-900 p-3 rounded-xl my-2"
          value={business}
          onChangeText={setBusiness}
          placeholder="Nom de business"
          placeholderTextColor="#aa6c6c"
        />
        <TextInput
          className="border border-red-600 bg-red-100 text-red-900 p-3 rounded-xl my-2"
          value={address}
          onChangeText={setAddress}
          placeholder="Adresse"
          placeholderTextColor="#aa6c6c"
        />

        <TouchableOpacity
          className="mt-6 bg-red-600 py-4 rounded-xl items-center"
          onPress={handleConfirm}
        >
          <Text className="text-white text-lg font-semibold">Confirmer</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
