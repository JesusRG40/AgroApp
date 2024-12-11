import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function EditRiegoScreen({ route, navigation }) {
  const { riegoId } = route.params;
  const [riego, setRiego] = useState(null);

  // Obtener los detalles del riego para editar
  const fetchRiegoDetail = async () => {
    try {
      const riegoDoc = await getDoc(doc(db, "riegos", riegoId));
      if (riegoDoc.exists()) {
        setRiego(riegoDoc.data());
      } else {
        Alert.alert("Error", "Riego no encontrado.");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error al obtener detalles del riego: ", error);
      Alert.alert("Error", "No se pudo obtener la información del riego.");
    }
  };

  useEffect(() => {
    fetchRiegoDetail();
  }, []);

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, "riegos", riegoId), riego);
      Alert.alert("Éxito", "Riego actualizado correctamente.");
      navigation.navigate("RiegosList");
    } catch (error) {
      console.error("Error al actualizar el riego: ", error);
      Alert.alert("Error", "No se pudo actualizar el riego.");
    }
  };

  if (!riego) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando información del riego...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Riego</Text>

      <Text style={styles.label}>Cantidad de Agua (litros):</Text>
      <TextInput
        style={styles.input}
        value={riego.cantAgua !== null ? String(riego.cantAgua) : ""}
        onChangeText={(text) =>
            setRiego({ ...riego, cantAgua: text ? parseFloat(text) : null })
        }
        keyboardType="numeric"
      />

       <Text style={styles.label}>Duración del Riego (minutos):</Text>
       <TextInput
        style={styles.input}
        value={riego.duracionRiego !== null ? String(riego.duracionRiego) : ""}
        onChangeText={(text) =>
            setRiego({ ...riego, duracionRiego: text ? parseInt(text) : null })
        }
        keyboardType="numeric"
      />

      <Text style={styles.label}>Método de Riego:</Text>
      <TextInput
        style={styles.input}
        value={riego.metodoRiego}
        onChangeText={(text) => setRiego({ ...riego, metodoRiego: text })}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "#555555",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#F9F9F9",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingText: {
    fontSize: 18,
    color: "#777777",
    textAlign: "center",
  },
});