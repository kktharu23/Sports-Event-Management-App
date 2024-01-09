  import React from 'react';
  import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';

  function Dashboard({ navigation }) {
    return (
      <View style={styles.container}>
        <ScrollView>
        <View style={styles.footer}>
            <Text style={styles.footerText}>Sports Events Management App</Text>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Player')}
              style={styles.button}
            >
              <Text style={styles.buttonText}>All Players</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Playerlist')}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Player List</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddPlayer', { game: 'volleyball' })}
              style={styles.gameButton}
            >
              <Image source={require('./image/bg21.jpg')} style={styles.image} />
              <Text style={styles.gameTitle}>VOLLEYBALL</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.imageContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddPlayer', { game: 'tennis' })}
              style={styles.gameButton}
            >
              <Image source={require('./image/bg22.jpg')} style={styles.image} />
              <Text style={styles.gameTitle}>TENNIS</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.imageContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddPlayer', { game: 'kho kho' })}
              style={styles.gameButton}
            >
              <Image source={require('./image/bg23.jpg')} style={styles.image} />
              <Text style={styles.gameTitle}>KHO KHO</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.imageContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddPlayer', { game: 'long jump' })}
              style={styles.gameButton}
            >
              <Image source={require('./image/bg24.jpg')} style={styles.image} />
              <Text style={styles.gameTitle}>LONG JUMP</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.imageContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddPlayer', { game: 'cricket' })}
            >
              <Image source={require('./image/bg28.jpeg')} style={styles.image} />
              <Text style={styles.gameTitle}>CRICKET</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.imageContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddPlayer', { game: 'kabaddi' })}
            >
              <Image source={require('./image/bg27.png')} style={styles.image} />
              <Text style={styles.gameTitle}>KABADDI</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    buttonText: {
      fontSize: 20,
      paddingHorizontal:30,
      color: 'white',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    footer: {
      alignItems: 'center',
      padding: 10,
      backgroundColor: 'lightblue',
    },
    rowContainer: {
      flexDirection: 'row',
      padding: 10,
      backgroundColor: 'darkblue',
    },
    footerText: {
      fontSize: 20,
    },
    imageContainer: {
      borderWidth: 2,
      borderColor: 'black',
      margin: 20,
      marginBottom: 40,
      height: 280,
    },
    gameTitle: {
      fontSize: 20,
      marginTop: -38,
      color: 'white',
      backgroundColor: 'blue',
      padding: 10,
      paddingHorizontal: 99,
      textAlign: 'center',
    },
  });

  export default Dashboard;
