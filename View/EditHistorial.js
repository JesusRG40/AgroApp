import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Platform } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { fetchHistorialSueloDetailId, handleSaveHistorialSuelo } from "../Controller/Historial_SueloController";

export default function EditHistorialSueloScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { historialId } = route.params;
  const [historial, setHistorial] = useState(null);

  useEffect(() => {
    fetchHistorialSueloDetailId(historialId, setHistorial, navigation);
  }, [historialId]);

  if (!historial) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando información del historial...</Text>
      </View>
    );
  }

  // Función auxiliar para formatear la fecha a "YYYY-MM-DD"
  const formatFecha = (fecha) => {
    if (!fecha) return "";
    if (fecha.seconds) {
      return new Date(fecha.seconds * 1000).toISOString().split("T")[0];
    } else if (fecha instanceof Date) {
      return fecha.toISOString().split("T")[0];
    } else if (typeof fecha === "string") {
      return fecha;
    }
    return "";
  };

  // Validación similar al ejemplo proporcionado
  const validateForm = () => {
    // Validar formato de fecha (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(historial.fechaMedicion)) {
      Alert.alert("Error", "La fecha debe tener el formato YYYY-MM-DD.");
      return false;
    }
    // Validar que se ingresen nutrientes y observaciones
    if (!historial.nutrientes || historial.nutrientes.toString().trim() === "") {
      Alert.alert("Error", "Ingrese los nutrientes.");
      return false;
    }
    if (!historial.observaciones || historial.observaciones.trim() === "") {
      Alert.alert("Error", "Ingrese observaciones.");
      return false;
    }
    // Validar que el pH sea un número entre 0 y 14
    const pHNumber = parseFloat(historial.pH);
    if (isNaN(pHNumber) || pHNumber < 0 || pHNumber > 14) {
      Alert.alert("Error", "El pH debe ser un número entre 0 y 14.");
      return false;
    }
    return true;
  };

  // Función que se ejecuta al presionar "Guardar Cambios"
  const handleSubmit = () => {
    if (!validateForm()) return;
    // Convertir la fecha de string a objeto Date antes de actualizar
    const updatedHistorial = {
      ...historial,
      fechaMedicion: new Date(historial.fechaMedicion + "T00:00:00")
    };
    handleSaveHistorialSuelo(historialId, updatedHistorial, navigation);
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Editar Historial de Suelo</Text>

      <Text style={styles.label}>Fecha de Medición (YYYY-MM-DD):</Text>
      <TextInput
        style={styles.input}
        value={formatFecha(historial.fechaMedicion)}
        onChangeText={(text) =>
          setHistorial({ ...historial, fechaMedicion: text })
        }
        placeholder="YYYY-MM-DD"
      />

      <Text style={styles.label}>Nutrientes:</Text>
      <TextInput
        style={styles.input}
        value={historial.nutrientes ? String(historial.nutrientes) : ""}
        onChangeText={(text) =>
          setHistorial({ ...historial, nutrientes: text })
        }
        placeholder="Ingrese los nutrientes"
      />

      <Text style={styles.label}>Observaciones:</Text>
      <TextInput
        style={styles.input}
        value={historial.observaciones || ""}
        onChangeText={(text) =>
          setHistorial({ ...historial, observaciones: text })
        }
        placeholder="Ingrese observaciones"
      />

      <Text style={styles.label}>pH:</Text>
      <TextInput
        style={styles.input}
        value={historial.pH !== undefined && historial.pH !== null ? String(historial.pH) : ""}
        onChangeText={(text) =>
          setHistorial({ 
            ...historial, 
            pH: text ? parseFloat(text) : ""
          })
        }
        keyboardType="numeric"
        placeholder="Ingrese el pH"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCC",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingText: {
    fontSize: 18,
    color: "#777",
    textAlign: "center",
  },
});