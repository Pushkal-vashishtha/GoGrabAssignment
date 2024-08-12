import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const GroupItem = ({ item, onPress, onLongPress }) => (
  <TouchableOpacity 
    style={styles.groupItem} 
    onPress={onPress}
    onLongPress={onLongPress}
  >
    <Text style={styles.groupName}>{item.name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  groupItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  groupName: {
    fontSize: 18,
  },
});

export default GroupItem;