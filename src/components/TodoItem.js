import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TodoItem = ({ item, onPress, onComplete }) => (
  <TouchableOpacity style={styles.todoItem} onPress={onPress}>
    <View style={styles.todoInfo}>
      <Text style={styles.todoTitle}>{item.title}</Text>
      <Text style={styles.todoStatus}>{item.status}</Text>
    </View>
    {item.status === 'pending' && (
      <TouchableOpacity style={styles.completeButton} onPress={onComplete}>
        <Text style={styles.completeButtonText}>Complete</Text>
      </TouchableOpacity>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  todoItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  todoInfo: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 18,
  },
  todoStatus: {
    fontSize: 14,
    color: '#666',
  },
  completeButton: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
  },
  completeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TodoItem;