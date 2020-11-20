import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import ResultCard from './ResultCard';
import { useNavigation } from '@react-navigation/native';
import {Context as ResultsContext} from '../context/ResultsContext';
import AlertPopUp from '../components/AlertPopUp'

const ResultsList = ({data, displayFavoriteButton}) => {
  const {onPressActionIcon, state: {errorMessage}} = useContext(ResultsContext)
  //import nav object to have access to navigation 
    const navigation = useNavigation();

    const runActionIcon = (item, type) => {
      onPressActionIcon(item, type)
    }

  return (
    <View>
      {errorMessage ? <AlertPopUp message={errorMessage} backgroundColor="#ff3333" textColor="white" /> : null}
      <FlatList
      data={data}
      keyExtractor={(result) => result.id}
      renderItem={ ({item}) =>{
        return (
        <TouchableOpacity onPress={() => navigation.navigate('Details', {id: item.id, screen: 'Details'})}>
          <ResultCard onDelete={() => runActionIcon(item, 'delete')}  onFavorite={() => runActionIcon(item, 'favorite')} displayFavoriteButton={displayFavoriteButton} distance={item.distance} name={item.name} imageURL={item.image_url} rating={item.rating} />
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