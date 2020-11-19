import React from 'react';
import {View, StyleSheet, Linking, TouchableOpacity} from 'react-native';
import {Text, Card, Rating} from 'react-native-elements';

const BarDetail = ({name, city, state, streetAddress, zip,  isClosed, imageUrl, phone, rating, yelpUrl}) => {

 console.log(city)
  return(
    <Card style={styles.container}>
      <Card.Image style={styles.image} source={{uri: imageUrl }} />
      <Card.Divider />
      <Text style={styles.name} h3>{name}</Text>
      <View style={styles.addressContainer}>
        <Text style={styles.address}>{streetAddress}</Text>
        <Text style={styles.address}>{city}, {state}</Text>  
        <Text style={styles.address}>{zip}</Text>
      </View>
  <Text style={styles.hours}>{isClosed ? 'Closed now' : 'Open Now'}</Text>
      <Text style={styles.phone}>{phone}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(yelpUrl)}><Text style={styles.website}>View on yelp!</Text></TouchableOpacity>
      <Rating imageSize={30} type="star" readonly startingValue={rating} />
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 200,
  },
  name: {
    padding: 10
  },
  address: {
    fontSize: 19,
    padding: 5,
  },
  phone: {
    fontSize: 16,
    padding: 5,
  },
  website: {
    fontSize: 16,
    color: 'blue',
    marginLeft: 5,
  },
  hours: {
    fontSize: 16,
    padding: 5
  }
});

export default BarDetail