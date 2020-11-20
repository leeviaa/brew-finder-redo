import {AsyncStorage} from 'react-native';
import createDataContext from './createDataContext'
import userApi from '../api/user';
import {navigate} from '../navigationRef'

//build reducer
const authReducer = (state, action) => {
  const {type, payload} = action;
  switch(type) {
    case 'signin':
    case 'signup':
        return {
          ...state,
          token: payload.token
        }
    case 'signout':
      return {
        ...state,
        token: null
      }
    case 'error':
      return {
        ...state,
        errorMessage: payload
      }
    default:
      return state
  }
}


const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');
  if(token) {
    dispatch({type: 'signin', payload: token})
    navigate('TabNavigator')
  } else {
    navigate('Signup')
  }
}



const signup = dispatch => async({email, password}) => {
  try {
    const res = await userApi.post('/signup', {email, password}) //res.data returns token
    //put token in local storage for easier log in
    await AsyncStorage.setItem('token', res.data.token)
    dispatch({type: 'signup', payload: res.data.token})
    navigate('TabNavigator')
  } catch (e) {
    dispatch({type: 'error', payload: 'Something went wrong.'})
  }
}

const signin = dispatch => async({email, password}) => {
  try {

    const res = await userApi.post('/signin', {email, password}) //res.data returns token
     //put token in local storage for easier log in
     await AsyncStorage.setItem('token', res.data.token)
     //dispatch action with token as payload
    dispatch({type: 'signin', payload: res.data.token})
    console.log(res.data)
    navigate('TabNavigator', { screen: 'Favorites'})
  } catch (e) {
    dispatch({type: 'error', payload: 'Something went wrong.'})
  }
}


const signout = dispatch => async () => {
  try {
    //remove token from storage to log user out
    await AsyncStorage.removeItem('token')
    dispatch({type: 'signout'})
    navigate('Signup')
  } catch (e) {
    console.error(e.message)
  }
  
}

export const {Provider, Context} = createDataContext(authReducer,{tryLocalSignin, signin, signout, signup}, {token: null, errorMessage: ''})