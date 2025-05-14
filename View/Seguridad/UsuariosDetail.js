// screens/UsuarioDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { handleEliminarUsuario } from '../../Presenter/UsuariosPresenter';

export default function UsuarioDetailScreen({ route, navigation }) {
  const { usuario } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Nombre */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{usuario.nombre || 'N/D'}</Text>
      </View>

      {/* Email */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{usuario.email || 'N/D'}</Text>
      </View>

      {/* Teléfono */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Teléfono:</Text>
        <Text style={styles.value}>{usuario.telefono || 'N/D'}</Text>
      </View>

      {/* Estatus */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Estatus:</Text>
        <Text style={styles.value}>
          {typeof usuario.estatus === 'boolean'
            ? usuario.estatus
              ? 'Activo'
              : 'Inactivo'
            : 'Desconocido'}
        </Text>
      </View>

      {/* Rol */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Rol:</Text>
        <Text style={styles.value}>{usuario.rol || 'N/D'}</Text>
      </View>

      {/* Botones de acción */}
      <TouchableOpacity
        style={[styles.button, styles.editButton]}
        onPress={() => navigation.navigate('EditarUsuario', { usuario })}
      >
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.deleteButton]}
        onPress={() => handleEliminarUsuario(usuario.id, navigation)}
      >
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F0F4F8',
    padding: 20,
  },
  infoContainer: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 8,
  },
  editButton: {
    backgroundColor: '#FFA726',
  },
  deleteButton: {
    backgroundColor: '#EF5350',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});