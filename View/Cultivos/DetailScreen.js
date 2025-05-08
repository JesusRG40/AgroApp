import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { handleEliminarCultivo } from '../../Presenter/CultivoPresenter';
import { obtenerSeguimientos } from '../../Model/Seguimiento_CultivoModel';

const { width } = Dimensions.get('window');

export default function CultivoDetailScreen({ route, navigation }) {
  const { cultivo } = route.params;

  const onPressSeguimiento = async () => {
    try {
      const seguimientos = await obtenerSeguimientos();
      const seguimiento = seguimientos.find(
        s => s.idCultivo.id === cultivo.id || s.idCultivo === cultivo.id
      );
      if (seguimiento) {
        navigation.navigate('Seguimiento_CultivoDetail', { seguimiento });
      } else {
        Alert.alert(
          'Sin seguimiento',
          'No se encontró un seguimiento para este cultivo. ¿Deseas registrar uno?',
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Sí',
              onPress: () =>
                navigation.navigate('RegistrarSeguimiento_Cultivo', {
                  idCultivo: cultivo.id,
                  refresh: route.params?.refresh,
                }),
            },
          ]
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo obtener la información de seguimiento.');
    }
  };

  const onPressAplicaciones = () => {
    navigation.navigate('AplicacionesList', { idCultivo: cultivo.id });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.circle, styles.circle1]} />
      <View style={[styles.circle, styles.circle2]} />

      {/* Imagen y Datos */}
      {cultivo.image ? (
        <Image source={{ uri: cultivo.image }} style={styles.image} />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>Sin Imagen</Text>
        </View>
      )}
      <Text style={styles.title}>{cultivo.nombre}</Text>

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

      {/* Contenedor de botones en rejilla */}
      <View style={styles.buttonsGrid}>
        <TouchableOpacity
          style={[styles.button, styles.followButton]}
          onPress={onPressSeguimiento}
        >
          <Text style={styles.buttonText}>Seguimiento</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.applyButton]}
          onPress={onPressAplicaciones}
        >
          <Text style={styles.buttonText}>Aplicaciones</Text>
        </TouchableOpacity>
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
    // Nuevo contenedor de botones en rejilla
    buttonsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      width: '90%',
      marginTop: 20,
    },
    button: {
      width: '48%',       // dos por fila
      height: 42,         // más pequeños
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 6,
      marginBottom: 10,
    },
    followButton: {
      backgroundColor: '#4D96FF',
    },
    applyButton: {
      backgroundColor: '#8E44AD',
    },
    editButton: {
      backgroundColor: '#FFA726',
    },
    deleteButton: {
      backgroundColor: '#EF5350',
    },
    buttonText: {
      color: '#FFF',
      fontSize: 14,
      fontWeight: 'bold',
    },
  });