// screens/Home.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const cultivos = [
  { id: '1', name: 'Maíz' },
  { id: '2', name: 'Trigo' },
  { id: '3', name: 'Cebolla' },
  { id: '4', name: 'Tomate' },
];

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={cultivos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Details', { nombreCultivo: item.name })}
            style={styles.card}
          >
            <Text style={styles.cardText}>{item.name}</Text>
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
    justifyContent: 'center',
  },
  list: {
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  cardText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333333',
  },
});