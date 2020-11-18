import React, { useContext } from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-elements'
import {Context as AuthContext} from '../context/AuthContext'

const AccountScreen = ({navigation}) => {
  const {state, signout} = useContext(AuthContext)

  
  return (
    <View>
      <Text>AccountScreen</Text>
      <Button title="Log out" onPress={() => signout()}/>
    </View>
  )
}

const styles = StyleSheet.create({
  
});

export default AccountScreen