import React, {useContext, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements'
import {Context as ResultsContext} from '../context/ResultsContext';
import ResultsList from '../components/ResultsList'

const SavedBarsScreen = ({navigation}) => {
  //extract favorites to display from context
  const {state: {  userFavorites }, getUserFavorites} = useContext(ResultsContext);
  //get updated user favorites on focus
  
  useEffect(() => {
    getUserFavorites()
  },[])

  return (
    <View style={styles.container}>
   <ResultsList displayFavoriteButton={false} data={userFavorites} />
   </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  }
});

export default SavedBarsScreen