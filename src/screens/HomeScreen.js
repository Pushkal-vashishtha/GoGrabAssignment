import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { globalStyles, colors } from '../styles/globalStyles';
import Button from '../components/Button';
import { AntDesign } from '@expo/vector-icons';
import { fetchAllData, deleteGroup } from '../utils/database';

const HomeScreen = ({ navigation }) => {
  const [groups, setGroups] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadGroups();
    }
  }, [isFocused]);

  const loadGroups = async () => {
    try {
      const data = await fetchAllData();
      setGroups(data.groups);
    } catch (error) {
      console.error('Failed to load groups:', error);
      Alert.alert('Error', 'Failed to load groups');
    }
  };

  const handleDeleteGroup = (groupId, groupName) => {
    Alert.alert(
      'Delete Group',
      `Are you sure you want to delete "${groupName}"? This will also delete all tasks in this group.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteGroup(groupId);
              loadGroups(); // Reload the groups after deletion
            } catch (error) {
              console.error('Failed to delete group:', error);
              Alert.alert('Error', 'Failed to delete group');
            }
          }
        }
      ]
    );
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>My Groups</Text>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[globalStyles.card, styles.groupCard]}
            onPress={() =>
              navigation.navigate('TodoList', { groupId: item.id, groupName: item.name })
            }
            onLongPress={() => handleDeleteGroup(item.id, item.name)}
          >
            <Text style={globalStyles.cardTitle}>{item.name}</Text>
            <AntDesign name="right" size={24} color={colors.lightText} />
          </TouchableOpacity>
        )}
      />
      <Button
        title="Add New Group"
        onPress={() => navigation.navigate('AddGroup')}
        style={globalStyles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  groupCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default HomeScreen;