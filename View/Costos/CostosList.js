import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import SearchBar from "../../components/SearchBar";
import { fetchCostos, handleSearch } from "../../Presenter/CostosPresenter";

export default function CostosListScreen({ navigation }) {
  const [costos, setCostos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCostos, setFilteredCostos] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchCostos(setCostos, setFilteredCostos);
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Costos</Text>

      <SearchBar
        placeholder="Buscar por cultivo"
        value={searchTerm}
        onChangeText={(text) =>
          handleSearch(text, costos, setSearchTerm, setFilteredCostos)
        }
      />

      <FlatList
        data={filteredCostos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CostoDetail", { costoId: item.id })
            }
          >
            <View style={styles.costoCard}>
              <Text style={styles.costoText}>
                Fecha: {item.fechaCosto?.toDate().toLocaleDateString() || "No disponible"}
              </Text>
              <Text style={styles.costoText}>
                Cultivo: {item.cultivoNombre || "No disponible"}
              </Text>
              <Text style={styles.costoText}>
                Tipo: {item.tipoCosto || "No disponible"}
              </Text>
              <Text style={styles.costoText}>
                Monto: {item.monto !== undefined ? `$${item.monto}` : "No disponible"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {searchTerm ? "No se encontraron resultados." : "No hay registros de costos."}
          </Text>
        }
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("RegistrarCosto")}
      >
        <Text style={styles.addButtonText}>Registrar Costo</Text>
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
  costoCard: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  costoText: {
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