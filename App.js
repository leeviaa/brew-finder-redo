import React, {useContext, useEffect} from 'react';
import TabNavigator from './src/navigators/TabNavigator'
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from './src/screens/SignupScreen'
import SigninScreen from './src/screens/SigninScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen'
import {Provider as AuthProvider, Context as AuthContext} from './src/context/AuthContext';
import {Context as ResultsContext} from './src/context/ResultsContext'
import { navigationRef } from './src/navigationRef'
import {Provider as ResultsProvider} from './src/context/ResultsContext';




//TO DO: CREATE NESTED NAVIGATORS
    //1) AUTH FLOW STACK
    const Stack = createStackNavigator();

    //2) BOTTOM TAB MENU
    //3) STACK NAV FOR DETAILS
const App = () => {
  const {state: {token}} = useContext(AuthContext);
  const {state: { userFavorites }} = useContext(ResultsContext);
  return (
    
    <Stack.Navigator
    >
      <Stack.Screen options={{headerShown: false}} name="ResolveAuth" component={ResolveAuthScreen} />
      {token === null || undefined ? (
        <>
         <Stack.Screen options={{headerShown: false}} name="Signup" component={SignupScreen} />
         <Stack.Screen name="Signin" component={SigninScreen} />
         </>
        ) : (
          <Stack.Screen options={{headerShown: false}} name="TabNavigator" component={TabNavigator} />
        )}
        </Stack.Navigator>
        
        
    
            
           
            
            
          
  

   
    
  )
}

export default () => {
  return (
    <AuthProvider>
     <ResultsProvider>
     <NavigationContainer ref={navigationRef}>
        <App />
      </NavigationContainer>
     </ResultsProvider>
      
    </AuthProvider>
  )
}