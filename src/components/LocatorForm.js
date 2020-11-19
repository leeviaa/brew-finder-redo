import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Input, Button, SearchBar} from 'react-native-elements';

const LocatorForm = ({onSubmit}) => {
  const [location, setLocation] = useState('')

  return (
    <View>
      <SearchBar
      lightTheme
      placeholder="Enter location"
      onChangeText={setLocation}
      value={location}
      autoCapitalize="none"
      autoCorrect={false}
      />
     {/* <Input
     label="Enter a location"
     onChangeText={setLocation}
     value={location}
     autoCapitalize="none"
     autoCorrect={false}
     /> */}
     <Button title="Search" onPress={() => onSubmit(location)} />
    </View>
  )
}

const styles = StyleSheet.create({
  
});

export default LocatorForm