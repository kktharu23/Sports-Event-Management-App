import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { serverAddress } from './Config';

function Profile() {
  const route = useRoute();
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    const { id } = route.params;
    fetch(`${serverAddress}/api/player/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPlayerData(data);
      })
      .catch((error) => {
        console.error('Error fetching player data:', error);
      });
  }, [route.params]);

  const avatarSource = route.params.gender === 'Male' 
    ? require('./image/bg7.jpeg') 
    : require('./image/bg2.jpeg');

  const { email, password, name, dateOfBirth, gender, height, weight, games, place } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Player Profile</Text>
      <View style={styles.avatarContainer}>
        <Image source={avatarSource} style={styles.avatar} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Registration Time</Text>
        <Text style={styles.value}>{playerData ? playerData.dateTime : email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{playerData ? playerData.email : email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Password</Text>
        <Text style={styles.value}>{playerData ? '*****' : password}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{playerData ? playerData.name : name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Date of Birth</Text>
        <Text style={styles.value}>{playerData ? playerData.dateOfBirth : dateOfBirth}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Gender</Text>
        <Text style={styles.value}>{playerData ? playerData.gender : gender}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Height</Text>
        <Text style={styles.value}>{playerData ? `${playerData.height} cm` : `${height} cm`}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Weight</Text>
        <Text style={styles.value}>{playerData ? `${playerData.weight} kg` : `${weight} kg`}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Games</Text>
        <Text style={styles.value}>{playerData ? playerData.games : games}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Place</Text>
        <Text style={styles.value}>{playerData ? playerData.place : place}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 28,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  label: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    flex: 2,
    fontSize: 18,
    color: '#666',
  },
});

export default Profile;
