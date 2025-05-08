import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { fetchAplicaciones } from '../../Presenter/Aplicaciones_InsumoPresenter';

const { width } = Dimensions.get('window');

export default function AplicacionesInsumoList({ navigation, route }) {
  const { idCultivo } = route.params;
  const [searchText, setSearchText] = useState('');
  const [aplicaciones, setAplicaciones] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchAplicaciones(setAplicaciones);
    }
  }, [isFocused]);

  const filtered = aplicaciones
    .filter(app => app.idCultivo.id === idCultivo || app.idCultivo === idCultivo)
    .filter(app =>
      app.metodoAplicacion.toLowerCase().includes(searchText.toLowerCase()) ||
      app.unidadMedida.toLowerCase().includes(searchText.toLowerCase())
    );

  return (
    <View style={styles.container}>
      <View style={[styles.circle, styles.circle1]} />
      <View style={[styles.circle, styles.circle2]} />

      {/* Header con título y botón debajo */}
      <View style={styles.header}>
        <Text style={styles.title}>Aplicaciones de Insumo</Text>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() =>
            navigation.navigate('RegistrarAplicacion', {
              idCultivo,
              refresh: () => fetchAplicaciones(setAplicaciones),
            })
          }
        >
          <Text style={styles.registerButtonText}>Registrar</Text>
        </TouchableOpacity>
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar aplicación"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Lista de aplicaciones */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('AplicacionDetail', { aplicacion: item })}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.metodoAplicacion}</Text>
              <Text style={styles.cardDate}>
                {new Date(
                  item.fechaAplicacion.seconds
                    ? item.fechaAplicacion.toDate()
                    : item.fechaAplicacion
                ).toLocaleDateString()}
              </Text>
              <Text style={styles.cardSubtitle}>
                Cantidad: {item.cantidadAplicada} {item.unidadMedida}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  circle: {
    position: 'absolute',
    borderRadius: 9999,
    opacity: 0.3,
  },
  circle1: {
    width: width * 0.7,
    height: width * 0.7,
    backgroundColor: '#8E44AD',
    top: -width * 0.3,
    left: -width * 0.3,
  },
  circle2: {
    width: width * 0.5,
    height: width * 0.5,
    backgroundColor: '#D2B4DE',
    bottom: -width * 0.3,
    right: -width * 0.3,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8E44AD',
  },
  registerButton: {
    marginTop: 12,
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  searchBar: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 2,
    paddingHorizontal: 10,
  },
  searchInput: {
    height: 40,
    fontSize: 16,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    elevation: 2,
  },
  cardContent: {
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});