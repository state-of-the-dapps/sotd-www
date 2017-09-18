import axios from 'axios'

export default axios.create({
  apiURL: process.env.apiUrl
})
