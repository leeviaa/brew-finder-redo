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
  const {state: { userFavorites }, getUserFavorites} = useContext(ResultsContext);
//might need to move this elsewhere, currently running getUserFavorites on app load in order to load them into favorites screen, TEST TO SEE IF THIS WORKS NEED TO REFACTOR
  useEffect(() => {
    getUserFavorites()
  }, [])

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
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
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