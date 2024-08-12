import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import TodoListScreen from './src/screens/TodoListScreen';
import TaskDetailScreen from './src/screens/TaskDetailScreen';
import AddGroupScreen from './src/screens/AddGroupScreen';
import AddTaskScreen from './src/screens/AddTaskScreen';
import { initDatabase, fetchAllData } from './src/utils/database';
import { colors, globalStyles } from './src/styles/globalStyles';

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [appData, setAppData] = useState(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await initDatabase();
        console.log('Database initialized successfully');

        const cachedData = await AsyncStorage.getItem('appData');
        if (cachedData) {
          setAppData(JSON.parse(cachedData));
          setIsLoading(false);
        }

        const freshData = await fetchAllData();
        setAppData(freshData);

        await AsyncStorage.setItem('appData', JSON.stringify(freshData));
      } catch (error) {
        console.error('Failed to initialize app:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return (
      <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Groups' }}
          initialParams={{ appData }}
        />
        <Stack.Screen name="TodoList" component={TodoListScreen} options={{ title: 'Tasks' }} />
        <Stack.Screen name="TaskDetail" component={TaskDetailScreen} options={{ title: 'Task Details' }} />
        <Stack.Screen name="AddGroup" component={AddGroupScreen} options={{ title: 'Add Group' }} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ title: 'Add Task' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}