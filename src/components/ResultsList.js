import React from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import { Text, Header   } from 'react-native-elements';
import ResultCard from './ResultCard';
import { useNavigation } from '@react-navigation/native';

const ResultsList = ({data}) => {
    const navigation = useNavigation();

  return (
    <View>
      <FlatList
      data={data}
      keyExtractor={(result) => result.id}
      renderItem={ ({item}) =>{
        return (
        <TouchableOpacity onPress={() => navigation.navigate('Details', {id: item.id})}>
          <ResultCard distance={item.distance} name={item.name} imageURL={item.image_url} rating={item.rating} />
        </TouchableOpacity>
        )
      } }
       />
    </View>
  )
}

const styles = StyleSheet.create({
  
});

export default ResultsList