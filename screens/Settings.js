import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";
import { getData, setData } from "../LocalCache/storageUtils";
import MainLayout from "../Comps/MainLayout";
import { useTheme } from "../context/themeContext";
import { useColorScheme } from "nativewind";

export default function Settings() {
  const [nom, setNom] = useState("");
  const [business, setBusiness] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const STORAGE_KEY = "isFirstSession";

  useEffect(() => {
    (async () => {
      try {
        const data = await getData(STORAGE_KEY);
        if (data) {
          const parsed = typeof data === "string" ? JSON.parse(data) : data;
          setNom(parsed.nom || "");
          setBusiness(parsed.business || "");
          setAddress(parsed.address || "");
        }
      } catch (e) {
        Alert.alert("Erreur", "Impossible de charger les données.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleUpdate = async () => {
    if (!nom.trim() || !business.trim() || !address.trim()) {
      Alert.alert("Champs requis", "Veuillez remplir tous les champs avant de valider.");
      return;
    }

    const newData = { nom, business, address };
    try {
      await setData(STORAGE_KEY, newData);
      Alert.alert("Succès", "Les données ont été mises à jour !");
    } catch (e) {
      Alert.alert("Erreur", "Échec de mise à jour.");
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-neutral-900">
        <ActivityIndicator size="large" color="#8b0000" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      className="flex-1 bg-red-50 dark:bg-neutral-900"
    >
      <MainLayout>
        <SafeAreaView className="flex-1 justify-between px-4">
          <ScrollView
            contentContainerStyle={{ paddingBottom: 24 }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="space-y-6">
              {/* Nom */}
              <View className="flex-row items-center gap-3">
                <Feather name="user" size={20} color={colorScheme === 'dark' ? "#3B82F6" : "#dc2626"} />
                <TextInput
                  value={nom}
                  onChangeText={setNom}
                  placeholder="Nom"
                  placeholderTextColor="#aa6c6c"
                  className="flex-1 border border-red-500 dark:border-blue-700 bg-red-100 dark:bg-neutral-800 text-red-900 dark:text-white p-3 rounded-xl"
                />
              </View>
                
              {/* Business */}
              <View className="flex-row items-center gap-3 mt-5">
                <Feather name="briefcase" size={20} color={colorScheme === 'dark' ? "#3B82F6" : "#dc2626"} />
                <TextInput
                  value={business}
                  onChangeText={setBusiness}
                  placeholder="Nom de business"
                  placeholderTextColor="#aa6c6c"
                  className="flex-1 border border-red-500 dark:border-blue-700 bg-red-100 dark:bg-neutral-800 text-red-900 dark:text-white p-3 rounded-xl"
                />
              </View>

              {/* Address */}
              <View className="flex-row items-center gap-3 mt-5">
                <Feather name="map-pin" size={20} color={colorScheme === 'dark' ? "#3B82F6" : "#dc2626"} />
                <TextInput
                  value={address}
                  onChangeText={setAddress}
                  placeholder="Adresse"
                  placeholderTextColor="#aa6c6c"
                  className="flex-1 border border-red-500 dark:border-blue-700 bg-red-100 dark:bg-neutral-800 text-red-900 dark:text-white p-3 rounded-xl"
                />
              </View>

              {/* Update Button */}
              <TouchableOpacity
                className="bg-red-600 mt-8 dark:bg-blue-700 py-4 rounded-xl items-center active:scale-95 transition-all duration-150"
                onPress={handleUpdate}
              >
                <Text className="text-white text-lg font-semibold">Mettre à jour</Text>
              </TouchableOpacity>

              {/* Theme Toggle */}
              <TouchableOpacity
                onPress={toggleColorScheme}
                className="bg-red-600 mt-8 dark:bg-blue-700 py-4 rounded-xl items-center"
              >
                <Text className="text-white text-lg font-semibold">
                  Changer de thème
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </MainLayout>
    </KeyboardAvoidingView>
  );
}
