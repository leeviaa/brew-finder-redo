import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {Context as ResultsContext} from '../context/ResultsContext';
import BarDetail from '../components/BarDetail'

const BarDetailsScreen = ({route, navigation}) => {
  //get results off global state
  const {state: {results}} = useContext(ResultsContext)
  //bring in local state to set result to
  const [result, setResult] = useState(null)
  //get id from route paramaters
  const  {id }= route.params;
  //getResult func to loop through results find the result by id
  const getResult = async (id) => {
    const result = await results.find(result => result.id === id)
    // set result to local state var
    setResult(result)
  }

  //use effect to run when component is rendered
  useEffect(() => {
    getResult(id)
  }, [])
  console.log(result)
  //defensive code incase there is no result
  if(!result) return <Text>No result Found</Text>
  return (
    <View style={styles.container}>
      <BarDetail  name={result.name} phone={result.phone} city={result.location.city} state={result.location.state} streetAddress={`${result.location.address1} ${result.location.address2}`} isClosed={result.is_closed} zip={result.location.zip_code} imageUrl={result.image_url} rating={result.rating} yelpUrl={result.url} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default BarDetailsScreen