
import resultsApi from '../api/results'
import createDataContext from './createDataContext';
import userApi from '../api/user';
import Axios from 'axios';

const resultsReducer = (state, action) => {
  const {type, payload} = action;
  switch(type) {
    case 'get_favorites':
      return {
        ...state,
        userFavorites: payload
      }
    case 'store_results': 
      return {
        ...state,
        results: payload
      }
    case 'clear_results':
        return {
          ...state,
          results: []
        }
    default:
      return state
  }
}

// const storeResultById = dispatch => async (id) => {
//   try {
//     const response = await resultsApi.get(`/${id}`);
//     console.log('RESPONSE FROM RESULTS CONTEXT', response.data)
//     dispatch({type: 'store_result', payload: response.data})
//   } catch (e) {
//     return console.log(e.message)
//   }
// }

const clearResults = dispatch => async () => {
  dispatch({type: 'clear_results'})
}

const findResults = dispatch => async (userLocation) => {
  //clear old results before finding new ones
  clearResults()
  try {
   const response = await resultsApi.get('/search', {
     params: {
       limit: 10,
       term: 'Bars',
       location: userLocation
     }
   });
   dispatch({type: 'store_results', payload: response.data.businesses})
  } catch (e) {
    console.error(e)
  }
}

const getUserFavorites = dispatch => async() => {
  try {
    const favorites = await userApi.get('/favorites');
    //if no favorites found return
    if(!favorites) return
    //insert new favorites array into global state under userFavorites key
    dispatch({type: 'get_favorites', payload: favorites.data})

  } catch (e) {
    console.error(e)
  }
}

const onPressActionIcon = dispatch => async(item, type) => {
  //get current user favorites to check against them to make sure same one cant be added twice
  try {
    if(type === 'favorite') {
      const checkForExisting = userFavorites.includes(item)
      if(checkForExisting) return console.error('You have already added this item')
      const newFavorite = item;
      await userApi.post('/favorites', newFavorite)
    }
    if(type === 'delete') {
      console.log('deleting....')
    }
    getUserFavorites();
  } catch (error) {
    
  }
}

export const {Context, Provider} = createDataContext(resultsReducer, {findResults, clearResults, getUserFavorites, onPressActionIcon}, {results: [], userFavorites: []})