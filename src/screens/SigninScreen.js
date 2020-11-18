import React, {useContext} from 'react';
import {Context as AuthContext} from '../context/AuthContext'
import {View, StyleSheet} from 'react-native';
import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLink'

const SigninScreen = ({navigation}) => {
  const {state, signin} = useContext(AuthContext)
  return (
    <View>
      <AuthForm onSubmit={({email, password}) => signin({email, password})} buttonText="Sign in" />
      <NavLink navigateTo="Signup" message="Need an account? Click here to sign up." />
    </View>
  )
}

const styles = StyleSheet.create({
  
});

export default SigninScreen