import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Icon, Rating, SocialIcon, Text, Header   } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const ResultCard = ({name, imageURL, rating, displayFavoriteButton, onFavorite, onDelete}) => {

  let icon;
  if(displayFavoriteButton) {
    icon =(
      <TouchableOpacity onPress={onFavorite} style={styles.icon}>
        <AntDesign name="like1" size={24}  color="black" />
      </TouchableOpacity>
    )
  } else {
    icon = (
    <TouchableOpacity onPress={onDelete} style={styles.icon}>
        <FontAwesome name="remove" size={24} color="black" />
    </TouchableOpacity>
           )
  }
  return (
    <Card style={styles.container}>
      <View style={styles.cardHeader}>
      <Card.Title >{name}</Card.Title>
      {icon}
      </View>
     
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
    width: 340,
    height: 150,
    borderRadius: 4,
    marginBottom: 5,
    alignSelf: 'center'
  },
  icon: {
    // alignSelf: 'flex-end',
    
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'

  }
  
});

export default ResultCard