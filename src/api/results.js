import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization: 'Bearer PMtNveeQmr-zy2oo1VXJcY5iKTj6lihZcfZbS-k8gFr8Ikz6DAUQ1uMqInoPQL3JFaw5a4SORBugodovm_TOZNMKC4vJ3uya_bpuOA9SNT1lyH68K9-xF3zhx3YwX3Yx'
  }
})

export default instance