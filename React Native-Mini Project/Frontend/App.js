import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './Dashboard';
import Home from './Home';
import AddPlayer from './AddPlayer';
import ViewerLogin from './ViewerLogin';
import AdminLogin from './AdminLogin';
import RegisterPage from './RegisterPage';
import Profile from './Profile';
import Player from './Player';
import EditPlayer from './EditPlayer';
import PlayerList from './Playerlist';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Profile" component={Profile}/>
      <HomeStack.Screen name="AddPlayer" component={AddPlayer} />
      <HomeStack.Screen name="Dashboard" component={Dashboard} /> 
      <HomeStack.Screen name="Player" component={Player} /> 
      <HomeStack.Screen name="EditPlayer" component={EditPlayer} />
      <HomeStack.Screen name="Playerlist" component={PlayerList} />
    
     
    </HomeStack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
  <Tab.Screen name="HomeStack" component={HomeStackScreen} options={{ headerShown: false }} />
  <Tab.Screen name="ViewerLogin" component={ViewerLogin} />
  <Tab.Screen name="AdminLogin" component={AdminLogin} />
  <Tab.Screen name="Register" component={RegisterPage} />
</Tab.Navigator>

    </NavigationContainer>
  );
}

export default App;
