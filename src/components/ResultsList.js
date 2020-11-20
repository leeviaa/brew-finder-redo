import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import ResultCard from './ResultCard';
import { useNavigation } from '@react-navigation/native';
import {Context as ResultsContext} from '../context/ResultsContext';

const ResultsList = ({data, displayFavoriteButton}) => {
  const {onPressActionIcon, userFavorites} = useContext(ResultsContext)

    const navigation = useNavigation();

    const runActionIcon = (item, type) => {
      onPressActionIcon(item, type)
    }

  return (
    <View>
      <FlatList
      data={data}
      keyExtractor={(result) => result.id}
      renderItem={ ({item}) =>{
        return (
        <TouchableOpacity onPress={() => navigation.navigate('Details', {id: item.id})}>
          <ResultCard onDelete={()  => runActionIcon(item, 'delete')}  onFavorite={() => runActionIcon(item, 'favorite')} displayFavoriteButton={displayFavoriteButton} distance={item.distance} name={item.name} imageURL={item.image_url} rating={item.rating} />
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