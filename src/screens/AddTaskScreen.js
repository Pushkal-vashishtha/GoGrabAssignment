import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { addTodo, updateTodo, getTodoById } from '../utils/database';
import Button from '../components/Button';
import { globalStyles, colors } from '../styles/globalStyles';
import { AntDesign } from '@expo/vector-icons';

const AddTaskScreen = ({ route, navigation }) => {
  const { groupId } = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [taskId, setTaskId] = useState(null);

  const handleAddTask = async () => {
    if (title.trim()) {
      try {
        await addTodo(groupId, title, description);
        navigation.goBack();
      } catch (error) {
        console.error('Failed to add task:', error);
        Alert.alert('Error', 'Failed to add task');
      }
    } else {
      Alert.alert('Error', 'Title is required');
    }
  };

  const handleLoadTask = async () => {
    const enteredTaskId = await promptForTaskId();
    if (enteredTaskId) {
      try {
        const task = await getTodoById(enteredTaskId);
        if (task) {
          setTitle(task.title);
          setDescription(task.description);
          setTaskId(enteredTaskId);
        } else {
          Alert.alert('Error', 'Task not found');
        }
      } catch (error) {
        console.error('Failed to load task:', error);
        Alert.alert('Error', 'Failed to load task');
      }
    }
  };

  const handleUpdateTask = async () => {
    if (taskId && title.trim()) {
      try {
        await updateTodo(taskId, title, description);
        Alert.alert('Success', 'Task updated successfully');
        setTaskId(null);
        setTitle('');
        setDescription('');
      } catch (error) {
        console.error('Failed to update task:', error);
        Alert.alert('Error', 'Failed to update task');
      }
    } else {
      Alert.alert('Error', 'No task loaded or title is empty');
    }
  };

  const promptForTaskId = () => {
    return new Promise((resolve) => {
      Alert.prompt(
        'Enter Task ID',
        'Please enter the ID of the task you want to edit:',
        [
          {
            text: 'Cancel',
            onPress: () => resolve(null),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: taskId => resolve(taskId),
          },
        ],
        'plain-text'
      );
    });
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={globalStyles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.iconContainer}>
          <AntDesign name="addfile" size={64} color={colors.primary} />
        </View>
        <TextInput
          style={[globalStyles.input, styles.input]}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter task title"
          placeholderTextColor={colors.lightText}
        />
        <TextInput
          style={[globalStyles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter task description"
          placeholderTextColor={colors.lightText}
          multiline
        />
        <Button
          title="Add Task"
          onPress={handleAddTask}
          style={styles.button}
          disabled={!title.trim()}
        />
        <Button
          title="Load Task for Editing"
          onPress={handleLoadTask}
          style={[styles.button, styles.secondaryButton]}
        />
        {taskId && (
          <Button
            title="Update Task"
            onPress={handleUpdateTask}
            style={[styles.button, styles.updateButton]}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primary,
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
  },
  updateButton: {
    backgroundColor: colors.success,
  },
});

export default AddTaskScreen;