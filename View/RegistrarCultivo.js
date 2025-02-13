import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { handleRegistrarCultivo } from '../Controller/RegistrarCultivoController';

export default function RegistrarCultivo({ navigation, route }) {
  const [cultivo, setCultivo] = useState({
    nombre: '',
    fechaCultivado: '',
    fechaEstimada: '',
    fechaReal: '',
    estado: '',
  });

  const handleChange = (key, value) => {
    setCultivo((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre del cultivo"
        value={cultivo.nombre}
        onChangeText={(value) => handleChange('nombre', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha en la que fue cultivado (YYYY-MM-DD)"
        value={cultivo.fechaCultivado}
        onChangeText={(value) => handleChange('fechaCultivado', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha de cosecha estimada (YYYY-MM-DD)"
        value={cultivo.fechaEstimada}
        onChangeText={(value) => handleChange('fechaEstimada', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha de cosecha real (YYYY-MM-DD, opcional)"
        value={cultivo.fechaReal}
        onChangeText={(value) => handleChange('fechaReal', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado del cultivo"
        value={cultivo.estado}
        onChangeText={(value) => handleChange('estado', value)}
      />
      <Button
        title="Registrar"
        onPress={() => handleRegistrarCultivo(cultivo, navigation, route.params?.refresh)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
});