import React, {useContext} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink'
import {Context as AuthContext} from '../context/AuthContext'

const SignupScreen = ({navigation}) => {
const {signup, state: {errorMessage}} = useContext(AuthContext)

console.log('ERROR MESSAGEEEE', errorMessage)

  return (
    <View style={styles.container}>
      <AuthForm buttonText="Sign up" onSubmit={({email, password}) => signup({email, password})} />
      <NavLink navigateTo="Signin" message="Already have an account? Sign in instead." />
      
    </View>
  )
}

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default SignupScreen