import axios from 'axios'

let instance = axios.create({
  baseURL: process.env.apiUrl
})

instance.interceptors.request.use(request => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Starting Request', request)
  }
  return request
})

instance.interceptors.response.use(response => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Response:', response)
  }
  return response
})

export default instance
