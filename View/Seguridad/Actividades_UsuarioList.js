// screens/ActividadesUsuarioList.js
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
import { fetchActividadesUsuario } from '../../Presenter/Actividades_UsuarioPresenter';

const { width } = Dimensions.get('window');

export default function ActividadesUsuarioList({ navigation, route }) {
  const { idUsuario } = route.params;
  const [searchText, setSearchText] = useState('');
  const [actividades, setActividades] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchActividadesUsuario(setActividades);
    }
  }, [isFocused]);

  // Filtrar por usuario y texto de búsqueda
  const filtered = actividades
    .filter(act =>
      // `act.idUsuario` puede venir como DocumentReference o como id directamente
      (act.idUsuario.id === idUsuario || act.idUsuario === idUsuario)
    )
    .filter(act =>
      act.tipoActividad.toLowerCase().includes(searchText.toLowerCase()) ||
      act.descripcionActividad.toLowerCase().includes(searchText.toLowerCase()) ||
      act.estatusActividad.toLowerCase().includes(searchText.toLowerCase())
    );

  return (
    <View style={styles.container}>
      <View style={[styles.circle, styles.circle1]} />
      <View style={[styles.circle, styles.circle2]} />

      {/* Header con título y botón Registrar */}
      <View style={styles.header}>
        <Text style={styles.title}>Actividades del Usuario</Text>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() =>
            navigation.navigate('RegistrarActividadUsuario', {
              idUsuario,
              refresh: () => fetchActividadesUsuario(setActividades),
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
          placeholder="Buscar actividad"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Lista de actividades */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('ActividadUsuarioDetail', { actividad: item })
            }
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.tipoActividad}</Text>
              <Text style={styles.cardDate}>
                {new Date(
                  item.fechaActividad.seconds
                    ? item.fechaActividad.toDate()
                    : item.fechaActividad
                ).toLocaleDateString()}
              </Text>
              <Text style={styles.cardSubtitle} numberOfLines={1}>
                {item.descripcionActividad}
              </Text>
              <Text style={styles.cardStatus}>{item.estatusActividad}</Text>
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
    backgroundColor: '#1E88E5',
    top: -width * 0.3,
    left: -width * 0.3,
  },
  circle2: {
    width: width * 0.5,
    height: width * 0.5,
    backgroundColor: '#90CAF9',
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
    color: '#1E88E5',
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
  cardStatus: {
    fontSize: 14,
    color: '#1E88E5',
    marginTop: 5,
    fontStyle: 'italic',
  },
});