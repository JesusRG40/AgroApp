import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import SearchBar from "../../components/SearchBar";
import { fetchHistorialSuelo, handleSearch } from "../../Presenter/Historial_SueloPresenter";

export default function HistorialSueloListScreen({ navigation }) {
  const [historial, setHistorial] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredHistorial, setFilteredHistorial] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchHistorialSuelo(setHistorial, setFilteredHistorial);
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Suelo</Text>

      <SearchBar
        placeholder="Buscar por cultivo"
        value={searchTerm}
        onChangeText={(text) =>
          handleSearch(text, historial, setSearchTerm, setFilteredHistorial)
        }
      />

      <FlatList
        data={filteredHistorial}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("HistorialDetail", { historialId: item.id })
            }
          >
            <View style={styles.historialCard}>
              <Text style={styles.historialText}>
                Fecha: {item.fechaMedicion?.toDate().toLocaleDateString() || "No disponible"}
              </Text>
              <Text style={styles.historialText}>
                Cultivo: {item.cultivoNombre || "No disponible"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {searchTerm ? "No se encontraron resultados." : "No hay registros de historial de suelo."}
          </Text>
        }
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("RegistrarHistorial")}
      >
        <Text style={styles.addButtonText}>Registrar Historial de Suelo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  historialCard: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  historialText: {
    fontSize: 16,
    color: "#555",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});