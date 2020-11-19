
import resultsApi from '../api/results'
import createDataContext from './createDataContext';
import userApi from '../api/user';

const resultsReducer = (state, action) => {
  const {type, payload} = action;
  switch(type) {
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
    
  } catch (e) {
    console.error(e)
  }
}

export const {Context, Provider} = createDataContext(resultsReducer, {findResults, clearResults}, {results: []})