// screens/ActividadUsuarioDetailScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { handleEliminarActividadUsuario } from '../../Presenter/Actividades_UsuarioPresenter';
import { getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default function ActividadUsuarioDetailScreen({ route, navigation }) {
  const { actividad } = route.params;
  const [usuarioNombre, setUsuarioNombre] = useState('Cargando...');
  const [cultivoNombre, setCultivoNombre] = useState('Cargando...');

  // Carga el nombre del usuario
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const snap = await getDoc(actividad.idUsuario);
        if (snap.exists()) setUsuarioNombre(snap.data().nombre || 'Desconocido');
        else setUsuarioNombre('No encontrado');
      } catch {
        setUsuarioNombre('Error al cargar');
      }
    };
    fetchUsuario();
  }, [actividad.idUsuario]);

  // Carga el nombre del cultivo
  useEffect(() => {
    const fetchCultivo = async () => {
      try {
        const snap = await getDoc(actividad.idCultivo);
        if (snap.exists()) setCultivoNombre(snap.data().nombre || 'Desconocido');
        else setCultivoNombre('No encontrado');
      } catch {
        setCultivoNombre('Error al cargar');
      }
    };
    fetchCultivo();
  }, [actividad.idCultivo]);

  // Formatea fechas Timestamp o Date
  const formatFecha = (fecha) => {
    if (!fecha) return 'N/A';
    if (fecha.toDate) return fecha.toDate().toLocaleDateString();
    return new Date(fecha).toLocaleDateString();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Usuario asociado */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Usuario:</Text>
        <Text style={styles.value}>{usuarioNombre}</Text>
      </View>

      {/* Cultivo asociado */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Cultivo:</Text>
        <Text style={styles.value}>{cultivoNombre}</Text>
      </View>

      {/* Tipo de actividad */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Tipo de Actividad:</Text>
        <Text style={styles.value}>{actividad.tipoActividad || 'N/A'}</Text>
      </View>

      {/* Descripción */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Descripción:</Text>
        <Text style={styles.value}>{actividad.descripcionActividad || 'N/A'}</Text>
      </View>

      {/* Fecha de actividad */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Fecha de Actividad:</Text>
        <Text style={styles.value}>{formatFecha(actividad.fechaActividad)}</Text>
      </View>

      {/* Estatus */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Estatus:</Text>
        <Text style={styles.value}>{actividad.estatusActividad || 'N/A'}</Text>
      </View>

      {/* Botones de acción */}
      <TouchableOpacity
        style={[styles.button, styles.editButton]}
        onPress={() =>
          navigation.navigate('EditarActividadUsuario', { actividad })
        }
      >
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.deleteButton]}
        onPress={() =>
          handleEliminarActividadUsuario(actividad.id, navigation)
        }
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