import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Icon, Rating, SocialIcon, Text, Header   } from 'react-native-elements';

const ResultCard = ({name, imageURL, rating}) => {
  return (
    <Card>
      <Card.Title>{name}</Card.Title>
      <Card.Image style={styles.image} source={{ uri: imageURL}}/>
      <Rating 
        type="star"
        startingValue={rating}
        readonly
        imageSize={20}
        />
    </Card>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 150,
    borderRadius: 4,
    marginBottom: 5
  },
  
});

export default ResultCard