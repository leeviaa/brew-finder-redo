import React, {useContext} from 'react';
import TabNavigator from './src/navigators/TabNavigator'
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from './src/screens/SignupScreen'
import SigninScreen from './src/screens/SigninScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen'
import {Provider as AuthProvider, Context as AuthContext} from './src/context/AuthContext'
import { navigationRef } from './src/navigationRef'




//TO DO: CREATE NESTED NAVIGATORS
    //1) AUTH FLOW STACK
    const Stack = createStackNavigator();

    //2) BOTTOM TAB MENU
    //3) STACK NAV FOR DETAILS
const App = () => {
  const {state: {token}} = useContext(AuthContext);
  console.log(token)

  return (
    
    <Stack.Navigator>
      <Stack.Screen name="ResolveAuth" component={ResolveAuthScreen} />
      {token === null || undefined ? (
        <>
         <Stack.Screen name="Signup" component={SignupScreen} />
         <Stack.Screen name="Signin" component={SigninScreen} />
         </>
        ) : (
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        )}
        </Stack.Navigator>
        
        
    
            
           
            
            
          
  

   
    
  )
}

export default () => {
  return (
    <AuthProvider>
      <NavigationContainer ref={navigationRef}>
        <App />
      </NavigationContainer>
    </AuthProvider>
  )
}