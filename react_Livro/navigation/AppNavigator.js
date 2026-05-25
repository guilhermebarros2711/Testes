import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator }
from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';

import ChaptersScreen from '../screens/ChaptersScreen';

import EditorScreen from '../screens/EditorScreen';



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
          name="Editor"
         component={EditorScreen}
         />
      </Stack.Navigator>

    </NavigationContainer>

  );
}