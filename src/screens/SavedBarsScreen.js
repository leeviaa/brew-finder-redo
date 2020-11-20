import React, {useContext, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements'
import {Context as ResultsContext} from '../context/ResultsContext';
import ResultsList from '../components/ResultsList'

const SavedBarsScreen = ({navigation}) => {
  //extract favorites to display from context
  const {state: {  userFavorites }, getUserFavorites} = useContext(ResultsContext);
  //get updated user favorites on focus
  navigation.addListener('focus', () => {
    getUserFavorites()
  })
  // useEffect(() => {
  //   getUserFavorites()
  // }, [])

  return (
    <>
   <ResultsList displayFavoriteButton={false} data={userFavorites} />
   </>
  )
}

const styles = StyleSheet.create({
  
});

export default SavedBarsScreen