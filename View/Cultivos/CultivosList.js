import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { fetchCultivos } from '../../Presenter/CultivoPresenter';

const { width, height } = Dimensions.get('window');

export default function CultivosList({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [cultivos, setCultivos] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchCultivos(setCultivos);
    }
  }, [isFocused]);

  const filteredCultivos = cultivos.filter((cultivo) =>
    cultivo.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={[styles.circle, styles.circle1]} />
      <View style={[styles.circle, styles.circle2]} />

      <View style={styles.header}>
        <Text style={styles.title}>Tipos de cultivos</Text>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('RegistrarCultivo', { refresh: fetchCultivos })}
        >
          <Text style={styles.registerButtonText}>Registrar cultivo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar cultivo"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredCultivos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Details', { cultivo: item })}
          >
            <View style={styles.cardImageContainer}>
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#e8e8e8',
                  borderRadius: 8,
                }}
              />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.nombre}</Text>
              <Text style={styles.cardDate}>Registrado el: {item.fechaCultivado}</Text>
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
    backgroundColor: '#4CAF50',
    top: -width * 0.3,
    left: -width * 0.3,
  },
  circle2: {
    width: width * 0.5,
    height: width * 0.5,
    backgroundColor: '#4D96FF',
    bottom: -width * 0.3,
    right: -width * 0.3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  registerButton: {
    backgroundColor: '#4D96FF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 2,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  searchButton: {
    padding: 10,
  },
  searchIcon: {
    fontSize: 18,
  },
  list: {
    paddingHorizontal: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    elevation: 2,
  },
  cardImageContainer: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  cardContent: {
    flex: 1,
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
});