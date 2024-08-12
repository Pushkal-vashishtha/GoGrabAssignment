import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getTodoById, deleteTodo, updateTodoStatus } from '../utils/database';
import Button from '../components/Button';
import { globalStyles, colors } from '../styles/globalStyles';

const TaskDetailScreen = ({ route, navigation }) => {
  const { taskId } = route.params;
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTask();
  }, [taskId]);

  const loadTask = async () => {
    try {
      const task = await getTodoById(taskId);
      if (!task) {
        console.error(`Task with ID ${taskId} not found.`);
      }
      setTask(task);
    } catch (error) {
      console.error('Failed to load task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(taskId);
      navigation.goBack();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleToggleStatus = async () => {
    try {
      const newStatus = task.status === 'complete' ? 'pending' : 'complete';
      await updateTodoStatus(taskId, newStatus);
      setTask({ ...task, status: newStatus });
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!task) {
    return (
      <View style={globalStyles.container}>
        <Text>Task not found.</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.card}>
        <Text style={globalStyles.title}>{task.title}</Text>
        <Text style={styles.description}>{task.description}</Text>
        <Text style={[globalStyles.cardStatus, { color: task.status === 'complete' ? colors.success : colors.warning }]}>
          Status: {task.status}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title={task.status === 'complete' ? 'Mark as Pending' : 'Mark as Complete'}
          onPress={handleToggleStatus}
          style={task.status === 'complete' ? styles.pendingButton : styles.completeButton}
        />
        <Button
          title="Delete Task"
          onPress={handleDelete}
          style={styles.deleteButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  description: {
    fontSize: 18,
    color: colors.text,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  completeButton: {
    backgroundColor: colors.success,
  },
  pendingButton: {
    backgroundColor: colors.warning,
  },
  deleteButton: {
    backgroundColor: colors.error,
  },
});

export default TaskDetailScreen;