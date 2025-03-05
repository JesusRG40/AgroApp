import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { fetchCostoDetail, handleSaveCosto } from "../Controller/CostosController";

export default function EditCostoScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { costoId } = route.params;
  const [costo, setCosto] = useState(null);

  useEffect(() => {
    fetchCostoDetail(costoId, setCosto, navigation);
  }, [costoId]);

  if (!costo) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando información del costo...</Text>
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

  // Validación del formulario para editar un costo
  const validateForm = () => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(costo.fechaCosto)) {
      Alert.alert("Error", "La fecha debe tener el formato YYYY-MM-DD.");
      return false;
    }
    if (!costo.tipoCosto || costo.tipoCosto.trim() === "") {
      Alert.alert("Error", "Ingrese el tipo de costo.");
      return false;
    }
    if (!costo.monto || isNaN(parseFloat(costo.monto))) {
      Alert.alert("Error", "Ingrese un monto válido.");
      return false;
    }
    return true;
  };

  // Función que se ejecuta al presionar "Guardar Cambios"
  const handleSubmit = () => {
    if (!validateForm()) return;
    // Convertir la fecha de string a objeto Date antes de actualizar
    const updatedCosto = {
      ...costo,
      fechaCosto: new Date(costo.fechaCosto + "T00:00:00")
    };
    handleSaveCosto(costoId, updatedCosto, navigation);
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Editar Costo</Text>

      <Text style={styles.label}>Fecha del Costo (YYYY-MM-DD):</Text>
      <TextInput
        style={styles.input}
        value={formatFecha(costo.fechaCosto)}
        onChangeText={(text) =>
          setCosto({ ...costo, fechaCosto: text })
        }
        placeholder="YYYY-MM-DD"
      />

      <Text style={styles.label}>Tipo de Costo:</Text>
      <TextInput
        style={styles.input}
        value={costo.tipoCosto || ""}
        onChangeText={(text) =>
          setCosto({ ...costo, tipoCosto: text })
        }
        placeholder="Ingrese el tipo de costo"
      />

      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={costo.descripcionCosto || ""}
        onChangeText={(text) =>
          setCosto({ ...costo, descripcionCosto: text })
        }
        placeholder="Ingrese una descripción"
        multiline
      />

      <Text style={styles.label}>Monto:</Text>
      <TextInput
        style={styles.input}
        value={costo.monto !== undefined ? String(costo.monto) : ""}
        onChangeText={(text) =>
          setCosto({ ...costo, monto: text ? parseFloat(text) : "" })
        }
        keyboardType="numeric"
        placeholder="Ingrese el monto"
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