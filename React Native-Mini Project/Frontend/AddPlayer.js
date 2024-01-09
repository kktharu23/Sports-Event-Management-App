import React, { useState } from 'react';
import { Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { serverAddress } from './Config';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const AddPlayer = ({ route }) => {
  const { game } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [games, setGames] = useState(game);
  const [place, setPlace] = useState('');
  const navigation = useNavigation();

  const handleAddPlayer = () => {
    if (!email || !password || !firstName || !lastName || !dateOfBirth || !gender || !height || !weight || !games || !place) {
      Alert.alert('All fields are required');
      return;
    }
  
    // Get the current date and time
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
    const dateTime = `${formattedDate} ${formattedTime}`;
  
    const playerData = {
      email,
      password,
      name: `${firstName} ${lastName}`,
      dateOfBirth,
      gender,
      height,
      weight,
      games,
      place,
      dateTime,
    };
  
    fetch(`${serverAddress}/api/addPlayer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((player) => {
        Alert.alert('Player added successfully'); // Corrected line
        // Use the ID to navigate to the Profile screen
        navigation.navigate('Dashboard');
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{game} Game</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        onChangeText={setFirstName}
        value={firstName}
        placeholder="First Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={setLastName}
        value={lastName}
        placeholder="Last Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          const formattedText = text.replace(/(\d{2})(\d{2})(\d{4})/, '$1-$2-$3');
          setDateOfBirth(formattedText);
        }}
        value={dateOfBirth}
        keyboardType="numeric"
        placeholder="DD-MM-YYYY"
      />
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Select Gender" value="" />
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
      </Picker>

      <TextInput
  style={styles.input}
  onChangeText={setHeight}
  value={height}
  placeholder="Height (e.g., 180 cm)"
  keyboardType="numeric"
/>
<TextInput
  style={styles.input}
  onChangeText={setWeight}
  value={weight}
  placeholder="Weight (e.g., 75 kg)"
  keyboardType="numeric"
/>
<TextInput
  style={styles.input}
  onChangeText={setPlace}
  value={place}
  placeholder="Place (e.g., City, Country)"
/>

      <Button title="Add Player" onPress={handleAddPlayer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default AddPlayer;
