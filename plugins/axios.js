import axios from 'axios'

export default axios.create({
  apiUrl: process.env.apiUrl
})
