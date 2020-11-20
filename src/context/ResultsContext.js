
import resultsApi from '../api/results'
import createDataContext from './createDataContext';
import userApi from '../api/user';
import Axios from 'axios';

const resultsReducer = (state, action) => {
  const {type, payload} = action;
  switch(type) {
    case 'press_favorite_action_icon':
      return {
        ...state,
        userFavorites: [payload ,
          ...state.userFavorites ]
      }
    case 'press_delete_action_icon': 
    //filter through favorites and return all items that are not matching id of the deleted favorite
    const newFavorites = state.userFavorites.filter(favorite => favorite.id !== payload.id )
      return {
        ...state,
        userFavorites: newFavorites
         
      }
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
    case 'set_error': 
        return {
          ...state,
          errorMessage: payload
        }
     case 'clear_error': {
      return {
        ...state,
        errorMessage: ''
      }
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
    dispatch({type: 'set_error', payload: 'Could not find any results matching your request.'})
    setTimeout(() => {
      dispatch({type: 'clear_error'})
    }, 4000)
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
    dispatch({type: 'set_error', payload: 'Looks like you dont have any favorites yet!'})
    setTimeout(() => {
      dispatch({type: 'clear_error'})
    }, 4000)
  }
}

const onPressActionIcon = dispatch => async(item, type) => {
  //get current user favorites to check against them to make sure same one cant be added twice
  try {
    if(type === 'favorite') {
      const newFavorite = item;
      await userApi.post('/favorites', newFavorite)
      //dispatch to change state and trigger update
      dispatch({type: 'press_favorite_action_icon', payload: newFavorite})
    }
    if(type === 'delete') {
      const favoriteToDelete = item;
      await userApi.delete('/favorites',  { data: favoriteToDelete})
      dispatch({type: 'press_delete_action_icon', payload: favoriteToDelete})
    }
  } catch (error) {
    dispatch({type: 'set_error', payload: 'You might have already favorited this item.'})
    setTimeout(() => {
      dispatch({type: 'clear_error'})
    }, 4000)

    return console.error(error.message)
  }
}

export const {Context, Provider} = createDataContext(resultsReducer, {findResults, clearResults, getUserFavorites, onPressActionIcon}, {results: [], userFavorites: [], errorMessage: ''})