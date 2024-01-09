import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Alert,
} from 'react-native';
import { serverAddress } from './Config';
import axios from 'axios';

function Player({ navigation }) {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Function to fetch player data from the server
  const fetchPlayerData = () => {
    axios
      .get(`${serverAddress}/getPlayer`)
      .then((res) => {
        if (res.data.Status === 'Success') {
          setData(res.data.Result);
        } else {
          alert('Error');
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setRefreshing(false)); 
  };

  useEffect(() => {
    fetchPlayerData();
  }, []);

  const handleDelete = (id) => {
    // Display a confirmation dialog before deleting
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this player?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            axios
      .delete(`${serverAddress}/api/player/${id}`)
      .then((res) => {
        if (res.data.Status === 'Success') {
          Alert.alert('Success', 'Player deleted successfully');
          fetchPlayerData();
        } else {
          Alert.alert('Error', 'Failed to delete player data. Please try again.');
        }
      })
      .catch((err) => {
        console.error('Error deleting player data:', err);
        Alert.alert('Error', 'Failed to delete player data. Please try again.');
      });
          },
        },
      ],
      { cancelable: false }
    );
  };

  // Function to handle the pull-to-refresh action
  const onRefresh = () => {
    setRefreshing(true);
    fetchPlayerData(); 
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
     <Text style={styles.heading}>Player List</Text>
      <View style={styles.playerList}>
        {data.map((player, index) => (
          <View key={index} style={styles.playerCard}>
            <Text style={styles.playerName}>Name: {player.name}</Text>
            <Text style={styles.playerEmail}>Email: {player.email}</Text>
            <Text style={styles.playerGame}>Game: {player.games}</Text>
            <TouchableOpacity
  onPress={() => {
    navigation.navigate('EditPlayer', { id: player._id });
    console.log(player._id); 
  }}
  style={styles.editButton}
>
  <Text style={styles.buttonText}>Edit</Text>
</TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDelete(player._id)}
              style={styles.deleteButton}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => navigation.navigate('Profile', { id: player._id })}
            style={styles.viewProfileButton}
          >
            <Text style={styles.buttonText}>View Profile</Text>
          </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  playerList: {
    width: '100%',
  },
  playerCard: {
    marginBottom: 20,
    borderBottomWidth: 1,
    padding: 10,
  },
  playerName: {
    fontSize: 18,
  },
  playerEmail: {
    fontSize: 16,
    marginTop: 5,
  },
  playerGame: {
    fontSize: 16,
    marginTop: 5,
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  viewProfileButton: {
    backgroundColor: 'purple', 
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default Player;
