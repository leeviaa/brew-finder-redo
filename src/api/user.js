import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://2214d6d98c37.ngrok.io'
})

export default instance