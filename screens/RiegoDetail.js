import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function RiegoDetail({ route, navigation }) {
  const { riegoId } = route.params;
  const [riego, setRiego] = useState(null);
  const [cultivoNombre, setCultivoNombre] = useState("Cargando...");

  // Obtener los datos del riego
  const fetchRiegoDetail = async () => {
    try {
      const riegoDoc = await getDoc(doc(db, "riegos", riegoId));
      if (riegoDoc.exists()) {
        const riegoData = riegoDoc.data();
        setRiego(riegoData);

        // Resolver referencia del cultivo
        if (riegoData.Cultivo) {
          const cultivoDoc = await getDoc(riegoData.Cultivo);
          setCultivoNombre(cultivoDoc.exists() ? cultivoDoc.data().nombre : "No disponible");
        } else {
          setCultivoNombre("No disponible");
        }
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

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "riegos", riegoId));
      Alert.alert("Éxito", "Riego eliminado correctamente.");
      navigation.goBack();
    } catch (error) {
      console.error("Error al eliminar el riego: ", error);
      Alert.alert("Error", "No se pudo eliminar el riego.");
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
      <Text style={styles.title}>Detalles del Riego</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Fecha del Riego:</Text>
        <Text style={styles.value}>{new Date(riego.fechaRiego.seconds * 1000).toLocaleDateString()}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Cultivo Asociado:</Text>
        <Text style={styles.value}>{cultivoNombre}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Cantidad de Agua:</Text>
        <Text style={styles.value}>{riego.cantAgua} litros</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Duración del Riego:</Text>
        <Text style={styles.value}>{riego.duracionRiego} minutos</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Método de Riego:</Text>
        <Text style={styles.value}>{riego.metodoRiego || "No especificado"}</Text>
      </View>

      {/* Botones de acción */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#FFA726" }]}
        onPress={() => navigation.navigate("EditRiego", { riegoId })}
      >
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#EF5350" }]}
        onPress={handleDelete}
      >
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 20,
  },
  infoContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555555",
  },
  value: {
    fontSize: 16,
    color: "#777777",
  },
  button: {
    width: "90%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 10,
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