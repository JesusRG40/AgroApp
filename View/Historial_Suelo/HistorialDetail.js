import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fetchHistorialSueloDetail, handleDeleteHistorialSuelo } from "../../Presenter/Historial_SueloPresenter";

export default function HistorialSueloDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { historialId } = route.params;
  const [historial, setHistorial] = useState(null);
  const [cultivoNombre, setCultivoNombre] = useState("Cargando...");

  useEffect(() => {
    fetchHistorialSueloDetail(historialId, setHistorial, setCultivoNombre, navigation);
  }, []);

  if (!historial) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando información del historial de suelo...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del Historial de Suelo</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Fecha de Medición:</Text>
        <Text style={styles.value}>
          {new Date(historial.fechaMedicion.seconds * 1000).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Cultivo Asociado:</Text>
        <Text style={styles.value}>{cultivoNombre}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nutrientes:</Text>
        <Text style={styles.value}>{historial.nutrientes}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Observaciones:</Text>
        <Text style={styles.value}>{historial.observaciones}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>pH:</Text>
        <Text style={styles.value}>{historial.pH}</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#FFA726" }]}
        onPress={() => navigation.navigate("EditHistorial", { historialId })}
      >
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#EF5350" }]}
        onPress={() => handleDeleteHistorialSuelo(historialId, navigation)}
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