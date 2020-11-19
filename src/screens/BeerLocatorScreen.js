import React, {useContext, useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Icon} from 'react-native-elements';
import LocatorForm from '../components/LocatorForm'
import {Context as ResultsContext} from '../context/ResultsContext'
import ResultsList from '../components/ResultsList'

const BeerLocatorScreen = ({navigation}) => {
  const [displaySearchForm, setDisplaySearchForm] = useState(true)
  const { findResults, state:{ results } } = useContext(ResultsContext);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log('LOCATION FROM BEER LOCATOR SCREEN',position)
      }
    )
  }

  useEffect(() => {
    getLocation()
  }, [])

  return (
    <SafeAreaView>
     {/* if no results, show form, else show resultsList */}
    { !displaySearchForm ?
          <> 
          <TouchableOpacity onPress={() => setDisplaySearchForm(true)}>
            <Icon name="plus" type="font-awesome"/>
            <Text>New Search</Text>
          </TouchableOpacity>
          <ResultsList data={results} />
          </> 
         :  <LocatorForm onSubmit={(userLocation) => {
        findResults(userLocation)
        setDisplaySearchForm(false)
      }} />}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  
});

export default BeerLocatorScreen