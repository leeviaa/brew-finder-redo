import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import BeerLocatorScreen from '../screens/BeerLocatorScreen';
import BarDetailsScreen from '../screens/BarDetailsScreen';

const Stack = createStackNavigator();

const DetailsNavigator = () => {
  return (
  <Stack.Navigator initialRouteName="Locator">
     <Stack.Screen options={{headerShown: false}} name="Locator" component={BeerLocatorScreen} />
    <Stack.Screen name="Details" component={BarDetailsScreen} />
  </Stack.Navigator>
   
  )
  
}

export default DetailsNavigator;