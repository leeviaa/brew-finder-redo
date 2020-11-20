import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, Text} from 'react-native-elements'

const AlertPopUp = ({message, backgroundColor, textColor}) => {
  return(
    <Card containerStyle={{backgroundColor: backgroundColor, padding: 10, marginBottom: 3 }}>
      <Text style={{color: textColor}}>{message}</Text>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    color: 'red'
  }
});



export default AlertPopUp