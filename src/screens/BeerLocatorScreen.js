import React, {useContext, useState, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {Text, Icon} from 'react-native-elements';
import LocatorForm from '../components/LocatorForm'
import {Context as ResultsContext} from '../context/ResultsContext'
import ResultsList from '../components/ResultsList'


const BeerLocatorScreen = ({navigation}) => {
  const [displaySearchForm, setDisplaySearchForm] = useState(true)
  const { findResults, state:{ results } } = useContext(ResultsContext);

  //possibly add location finding for search bar later just gonna keep this here
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log('LOCATION FROM BEER LOCATOR SCREEN',position)
      }
    )
  }

  return (
    <SafeAreaView style={styles.container}>
     {/* if no results, show form, else show resultsList */}
    { !displaySearchForm ?
          <> 
          <TouchableOpacity style={styles.newSearchContainer} onPress={() => setDisplaySearchForm(true)}>
            <Icon color="#3840c7" style={styles.plusIcon} name="plus" type="font-awesome"/>
            <Text style={styles.newSearchText}>New Search</Text>
          </TouchableOpacity>
          <ResultsList displayFavoriteButton={true} data={results} />
          </> 
           
         :   <>
                <LocatorForm onSubmit={(userLocation) => {
                findResults(userLocation)
                setDisplaySearchForm(false)
              }} />
              {/* Dummy container to close search bar when results is not empty, to go back to rendering the results list */}
              <TouchableOpacity onPress={() => {
                if(results.length > 0) {
                  setDisplaySearchForm(false)
                } else {
                  return
                }
              }}  style={styles.closeSearchOnTouchContainer}>
                <></>
              </TouchableOpacity>
         </>
          }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 5,
    flex: 1,
  },
  newSearchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  plusIcon: {
    padding: 2,
  },
  newSearchText: {
    padding: 2,
    fontSize: 20,
    color: '#3840c7'
  },
 closeSearchOnTouchContainer: {
   borderWidth: 1,
   borderColor: 'red',
   height: 500,
 }
});

export default BeerLocatorScreen