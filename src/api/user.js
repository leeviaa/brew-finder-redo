import axios from 'axios';
import {AsyncStorage} from 'react-native'

const instance = axios.create({
  baseURL: ' http://ac79e3f1b4e2.ngrok.io'
})
//function to append token to each request in order to verify user
instance.interceptors.request.use(
  async(config) => {
    const token = await AsyncStorage.getItem('token');    
   if(token) {
     //set auth header
     config.headers.Authorization = `Bearer ${token}`
   }
   //return new config object
    return config
  },
  (err) => {
    //reject promise if err is present
    return Promise.reject(err)
  }
)

export default instance