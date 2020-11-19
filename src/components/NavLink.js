import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native'

const NavLink = ({message, navigateTo}) => {
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate(navigateTo)}>
        <Text h5>{message}</Text>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  
});

export default NavLink