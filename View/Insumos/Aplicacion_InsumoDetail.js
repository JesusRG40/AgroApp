import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { handleEliminarAplicacion } from '../../Presenter/Aplicaciones_InsumoPresenter';
import { getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default function DetalleAplicacionInsumoScreen({ route, navigation }) {
  const { aplicacion } = route.params;
  const [insumoNombre, setInsumoNombre] = useState('Cargando...');

  useEffect(() => {
    const fetchInsumo = async () => {
      try {
        // aplicacion.idInsumo es un DocumentReference
        const snap = await getDoc(aplicacion.idInsumo);
        if (snap.exists()) setInsumoNombre(snap.data().nombre || 'Desconocido');
        else setInsumoNombre('No encontrado');
      } catch {
        setInsumoNombre('Error al cargar');
      }
    };
    fetchInsumo();
  }, [aplicacion.idInsumo]);

  // Helper para formatear fecha, soporta Firestore Timestamp o Date
  const formatFecha = (fecha) => {
    if (!fecha) return 'N/A';
    if (fecha.toDate) return fecha.toDate().toLocaleDateString();
    return new Date(fecha).toLocaleDateString();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Insumo asociado */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Insumo:</Text>
        <Text style={styles.value}>{insumoNombre}</Text>
      </View>

      {/* Fecha de aplicación */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Fecha de Aplicación:</Text>
        <Text style={styles.value}>{formatFecha(aplicacion.fechaAplicacion)}</Text>
      </View>

      {/* Cantidad aplicada */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Cantidad Aplicada:</Text>
        <Text style={styles.value}>
          {aplicacion.cantidadAplicada} {aplicacion.unidadMedida}
        </Text>
      </View>

      {/* Método de aplicación */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Método de Aplicación:</Text>
        <Text style={styles.value}>{aplicacion.metodoAplicacion || 'N/A'}</Text>
      </View>

      {/* Estado de aplicación */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Estado de Aplicación:</Text>
        <Text style={styles.value}>{aplicacion.estadoAplicacion || 'N/A'}</Text>
      </View>

      {/* Botones de acción */}
      <TouchableOpacity
        style={[styles.button, styles.editButton]}
        onPress={() => navigation.navigate('EditAplicacion', { aplicacion })}
      >
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.deleteButton]}
        onPress={() => handleEliminarAplicacion(aplicacion.id, navigation)}
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