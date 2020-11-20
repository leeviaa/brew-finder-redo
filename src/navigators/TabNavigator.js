import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AccountScreen from '../screens/AccountScreen';
import DetailsNavigator from './DetailsNavigator'
// import BeerLocatorScreen from '../screens/BeerLocatorScreen';
import SavedBarsScreen from '../screens/SavedBarsScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
    initialRouteName="Favorites"
    >
      <Tab.Screen name="Favorites" component={SavedBarsScreen}
      />
      <Tab.Screen name="BeerLocator" component={DetailsNavigator} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  )
}

export default TabNavigator