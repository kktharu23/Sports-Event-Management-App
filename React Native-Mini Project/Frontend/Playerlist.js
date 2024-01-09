import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { serverAddress } from './Config';
import axios from 'axios';

function Player({ navigation }) {
  const [data, setData] = useState([]);
  const gamesToDisplay = ['volleyball', 'kabaddi', 'cricket', 'long jump', 'kho kho', 'tennis'];

  const fetchPlayerData = () => {
    axios
      .get(`${serverAddress}/Player`)
      .then((res) => {
        if (res.data.Status === 'Success') {
          const filteredData = res.data.Result.filter(player => {
            return gamesToDisplay.includes(player.games.toLowerCase());
          });
          setData(filteredData);
        } else {
          alert('Error');
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPlayerData();
  }, []);

  // Create a function to group players by their games and count players in each game
  const groupPlayersByGame = () => {
    const groupedData = {};

    data.forEach(player => {
      const gameName = player.games;
      if (groupedData[gameName]) {
        groupedData[gameName].players.push(player);
      } else {
        groupedData[gameName] = { players: [player], playerCount: 0 };
      }
    });

    for (const gameName in groupedData) {
      groupedData[gameName].playerCount = groupedData[gameName].players.length;
    }

    return groupedData;
  };

  const groupedPlayers = groupPlayersByGame();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Player List</Text>
      {Object.keys(groupedPlayers).map((gameName, index) => (
        <View key={index}>
          <Text style={styles.gameTitle}>{gameName} ({groupedPlayers[gameName].playerCount} players)</Text>
          {groupedPlayers[gameName].players.map((player, playerIndex) => (
            <View key={playerIndex} style={styles.playerCard}>
              <Text style={styles.playerName}>Reg Time: {player.dateTime}</Text>
              <Text style={styles.playerName}>Name: {player.name}</Text>
              <Text style={styles.playerGame}>Game: {player.games}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Profile', { id: player._id })}
                style={styles.viewProfileButton}
              >
                <Text style={styles.buttonText}>Player Details</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ))}
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
  gameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'center',
    marginTop: 15,
  },
  playerCard: {
    marginBottom: 20,
    borderBottomWidth: 1,
    padding: 10,
  },
  playerName: {
    fontSize: 18,
  },
  playerGame: {
    fontSize: 16,
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
