import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { getTodos, updateTodoStatus } from '../utils/database';
import TodoItem from '../components/TodoItem';
import Button from '../components/Button';
import { globalStyles } from '../styles/globalStyles';

const TodoListScreen = ({ route, navigation }) => {
  const { groupId, groupName } = route.params;
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    navigation.setOptions({ title: groupName });
    const unsubscribe = navigation.addListener('focus', () => {
      loadTodos();
    });

    return unsubscribe;
  }, [navigation, groupId, groupName]);

  const loadTodos = async () => {
    try {
      const loadedTodos = await getTodos(groupId);
      setTodos(loadedTodos);
    } catch (error) {
      console.error('Failed to load todos:', error);
    }
  };

  const handleComplete = async (id) => {
    try {
      await updateTodoStatus(id, 'completed');
      loadTodos();
    } catch (error) {
      console.error('Failed to update todo status:', error);
    }
  };

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}
            onComplete={() => handleComplete(item.id)}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
      <Button
        title="Add New Task"
        onPress={() => navigation.navigate('AddTask', { groupId })}
        style={globalStyles.button}
      />
    </View>
  );
};

export default TodoListScreen;