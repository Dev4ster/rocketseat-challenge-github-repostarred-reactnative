import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Main from './pages/Main';
import User from './pages/User';
import RepoStarred from './pages/RepoStarred';

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: '#fff',
          headerStyle: {backgroundColor: '#7159c1'},
        }}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="RepoStarred" component={RepoStarred} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
