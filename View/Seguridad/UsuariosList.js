// screens/UsuariosListScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import SearchBar from '../../components/SearchBar';
import { fetchUsuarios, filtrarUsuarios } from '../../Presenter/UsuariosPresenter';

export default function UsuariosListScreen({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      // cuando la pantalla gana foco, carga todos los usuarios
      fetchUsuarios(setUsuarios, setFilteredUsuarios);
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuarios</Text>

      <SearchBar
        placeholder="Buscar por nombre o email"
        value={searchTerm}
        onChangeText={text =>
          filtrarUsuarios(text, usuarios, setSearchTerm, setFilteredUsuarios)
        }
      />

      <FlatList
        data={filteredUsuarios}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('UsuarioDetail', { usuario: item })
            }
          >
            <View style={styles.card}>
              <Text style={styles.cardText}>Nombre: {item.nombre || 'N/D'}</Text>
              <Text style={styles.cardText}>Email: {item.email || 'N/D'}</Text>
              <Text style={styles.cardText}>
                Estatus: {item.estatus ? 'Activo' : 'Inactivo'}
              </Text>
              <Text style={styles.cardText}>Rol: {item.rol || 'N/D'}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {searchTerm
              ? 'No se encontraron usuarios.'
              : 'No hay usuarios registrados.'}
          </Text>
        }
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('RegistrarUsuario')}
      >
        <Text style={styles.addButtonText}>Registrar Usuario</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});