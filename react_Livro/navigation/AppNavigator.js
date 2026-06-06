import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator }
from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';

import ChaptersScreen from '../screens/ChaptersScreen';

import EditorScreen from '../screens/EditorScreen';

import CharactersScreen from '../screens/CharactersScreen';

import WorldScreen from '../screens/WorldScreen';

import StatsScreen from '../screens/StatsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {

  return (

    <NavigationContainer>

      <Stack.Navigator

        screenOptions={{
          headerStyle: {
            backgroundColor: '#050505',
          },

          headerTintColor: '#FFFFFF',

          contentStyle: {
            backgroundColor: '#050505',
          },
        }}
      >

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Eclipse Archive',
          }}
        />

        <Stack.Screen
          name="Chapters"
          component={ChaptersScreen}
        />

        <Stack.Screen
          name="Characters"
          component={CharactersScreen}
        />

        <Stack.Screen
  name="Editor"
  component={EditorScreen}
/>

<Stack.Screen
  name="Stats"
  component={StatsScreen}
/>
      </Stack.Navigator>

    </NavigationContainer>

  );
      <Stack.Screen
  name="World"
  component={WorldScreen}
/>

}