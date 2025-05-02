import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { handleEliminarSeguimiento } from '../../Presenter/Seguimiento_CultivoPresenter';

export default function SeguimientoDetailScreen({ route, navigation }) {
  const { seguimiento } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Fecha de revisión */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Fecha de Revisión:</Text>
        <Text style={styles.value}>
          {seguimiento.fechaRevision
            ? seguimiento.fechaRevision.toDate
              ? seguimiento.fechaRevision.toDate().toLocaleDateString()
              : new Date(seguimiento.fechaRevision).toLocaleDateString()
            : 'N/A'}
        </Text>
      </View>

      {/* Estado del cultivo */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Estado:</Text>
        <Text style={styles.value}>{seguimiento.estadoCultivo || 'Desconocido'}</Text>
      </View>

      {/* Observaciones */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Observaciones:</Text>
        <Text style={styles.value}>{seguimiento.observaciones || 'Ninguna'}</Text>
      </View>

      {/* Recomendaciones */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Recomendaciones:</Text>
        <Text style={styles.value}>{seguimiento.recomendaciones || 'Ninguna'}</Text>
      </View>

      {/* Botones de acción */}
      <TouchableOpacity
        style={[styles.button, styles.editButton]}
        onPress={() => navigation.navigate('EditSeguimiento_Cultivo', { seguimiento })}
      >
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.deleteButton]}
        onPress={() => handleEliminarSeguimiento(seguimiento.id, navigation)}
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