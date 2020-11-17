import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from './src/screens/SignupScreen'
import SigninScreen from './src/screens/SigninScreen'




//TO DO: CREATE NESTED NAVIGATORS
    //1) AUTH FLOW STACK
    const Stack = createStackNavigator();
    //2) BOTTOM TAB MENU
    //3) STACK NAV FOR DETAILS
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
