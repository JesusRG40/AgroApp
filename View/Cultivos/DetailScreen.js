import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { handleEliminarCultivo } from '../../Presenter/CultivoPresenter';

const { width } = Dimensions.get('window');

export default function DetailScreen({ route, navigation }) {
  const { cultivo } = route.params; // Recibir datos del cultivo

  return (
    <View style={styles.container}>
      {/* Círculos decorativos */}
      <View style={[styles.circle, styles.circle1]} />
      <View style={[styles.circle, styles.circle2]} />

      {/* Imagen del cultivo */}
      {cultivo.image ? (
        <Image source={{ uri: cultivo.image }} style={styles.image} />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>Sin Imagen</Text>
        </View>
      )}

      {/* Título del cultivo */}
      <Text style={styles.title}>{cultivo.nombre}</Text>

      {/* Información del cultivo */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Fecha Cultivado:</Text>
        <Text style={styles.value}>{cultivo.fechaCultivado || 'N/A'}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Fecha Estim de Cosecha:</Text>
        <Text style={styles.value}>{cultivo.fechaEstimada || 'N/A'}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Fecha Real de Cosecha:</Text>
        <Text style={styles.value}>{cultivo.fechaReal || 'Pendiente'}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Estado:</Text>
        <Text style={styles.value}>{cultivo.estado || 'Desconocido'}</Text>
      </View>

      {/* Botones de acción */}
      <TouchableOpacity
        style={[styles.button, styles.editButton]}
        onPress={() => navigation.navigate('EditCultivo', { cultivo })}
      >
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.deleteButton]}
        onPress={() => handleEliminarCultivo(cultivo.id, navigation)}
      >
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
    padding: 20,
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
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#E8E8E8',
  },
  placeholderImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    color: '#777',
    fontSize: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#777',
  },
  button: {
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
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