import React, { useState } from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { addGroup } from '../utils/database';
import Button from '../components/Button';
import { globalStyles, colors } from '../styles/globalStyles';

const AddGroupScreen = ({ navigation }) => {
  const [groupName, setGroupName] = useState('');

  const handleAddGroup = async () => {
    if (groupName.trim()) {
      try {
        await addGroup(groupName);
        navigation.goBack();
      } catch (error) {
        console.error('Failed to add group:', error);
      }
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={globalStyles.container}
    >
      <View style={styles.formContainer}>
        <TextInput
          style={[globalStyles.input, styles.input]}
          value={groupName}
          onChangeText={setGroupName}
          placeholder="Enter group name"
          placeholderTextColor={colors.lightText}
        />
        <Button
          title="Add Group"
          onPress={handleAddGroup}
          style={[globalStyles.button, styles.button]}
          disabled={!groupName.trim()}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
});

export default AddGroupScreen;