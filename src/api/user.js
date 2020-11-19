import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://63c95045d085.ngrok.io'
})

export default instance