import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { serverAddress } from './Config';

function Registerpage() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigation = useNavigation();
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (values.password !== values.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    try {
      const response = await fetch(`${serverAddress}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
  
      if (!response.ok) {
        const responseText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Response: ${responseText}`);
      }      
      const data = await response.json();
      console.log(data);
  
      // Check if registration was successful
      if (data.message === 'User registered successfully') {
        // Registration successful, navigate to the login screen
        navigation.navigate('AdminLogin'); // Replace 'AdminLogin' with your actual login screen name
      } else if (data.message === 'Email is already in use') {
        // Display an alert if the email is already in use
        setError('Email is already in use. Please use a different email.');
      } else {
        // Handle other registration errors
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Network request error:', error);
      setError('An unexpected error occurred. Please try again later.');
    }
  };
    
  return (
    <View style={styles.container}>
      <View style={styles.loginForm}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.header}>Register</Text>
        <TextInput
          placeholder="Enter Email"
          onChangeText={(text) => setValues({ ...values, email: text })}
          style={styles.input}
          autoCompleteType="email"
        />
        <TextInput
          placeholder="Enter Password"
          onChangeText={(text) => setValues({ ...values, password: text })}
          style={styles.input}
          secureTextEntry={true}
        />
        <TextInput
          placeholder="Confirm Password"
          onChangeText={(text) => setValues({ ...values, confirmPassword: text })}
          style={styles.input}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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

export default Registerpage;
