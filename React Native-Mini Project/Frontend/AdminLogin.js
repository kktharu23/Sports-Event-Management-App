import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { serverAddress } from './Config';

function AdminLogin() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const navigation = useNavigation();
  const [error, setError] = useState('');

  const handleregister = () => {
    navigation.navigate('Register');
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${serverAddress}/adminlogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
  
      if (data.Status === 'Success') {
        // Clear the password field
        setValues({ ...values, password: '' });

        navigation.navigate('Dashboard');
      } else {
      
        setError(data.Error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle other errors, e.g., network issues
      setError('An error occurred. Please try again later.');
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.loginForm}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.header}>Login</Text>
        <TextInput
          placeholder="Enter Email"
          onChangeText={(text) => setValues({ ...values, email: text })}
          value={values.email}
          style={styles.input}
          autoCompleteType="email"
        />
        <TextInput
          placeholder="Enter Password"
          onChangeText={(text) => setValues({ ...values, password: text })}
          value={values.password}
          style={styles.input}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleregister} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
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

export default AdminLogin;
