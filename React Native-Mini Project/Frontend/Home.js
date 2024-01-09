import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Home() {
  const navigation = useNavigation();

  const navigateToViewerLogin = () => {
    navigation.navigate('ViewerLogin');
  };

  const navigateToAdminLogin = () => {
    navigation.navigate('AdminLogin');
  };

  return (
    <ImageBackground
      source={require('./image/bg16.jpg')} // Replace with the path to your background image
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.loginForm}>
          <Text style={styles.header1}>SPORTS EVENT MANAGEMENT APP</Text>
          <Text style={styles.header}>Login As</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={navigateToViewerLogin}
            >
              <Text style={styles.buttonText}>Viewer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={navigateToAdminLogin}
            >
              <Text style={styles.buttonText}>Admin</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundImage: 20, 
    
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginForm: {
    padding: 20,
    borderRadius: 10,
    width: '70%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // You can adjust the background color opacity
    alignItems: 'center',
  },
  header1: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'red',
    marginTop: 20,
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default Home;
