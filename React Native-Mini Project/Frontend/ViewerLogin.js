import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { serverAddress } from './Config';
import axios from 'axios';

const ViewerLogin = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${serverAddress}/api/login`, {
        email,
        password,
      });
  
      if (response.data.status === 'Success') {
        const id = response.data.playerId; 
        
        // Store the user ID or token in a secure way (e.g., using AsyncStorage, Redux, or context API)
        // For simplicity, let's assume you're using React Navigation to navigate with params
        console.log(id)
        navigation.navigate('Profile', { id });
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login. Please try again.');
    }
  };  
  
  return (
    <View style={styles.container}>
      <View style={styles.loginForm}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.header}>Login</Text>
        <TextInput
          placeholder="Enter Email"
          onChangeText={setEmail}
          value={email}
          style={styles.input}
          autoCompleteType="email"
        />
        <TextInput
          placeholder="Enter Password"
          onChangeText={setPassword}
          value={password}
          style={styles.input}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginForm: {
    padding: 16,
    borderRadius: 8,
    width: '75%',
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ViewerLogin;