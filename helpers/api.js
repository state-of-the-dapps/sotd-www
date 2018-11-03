import axios from '~/helpers/axios'

export async function getCategories () {
  const payload = await axios.get(`categories`)
  return payload.data.items
}

export async function getDapps (params) {
  const payload = await axios.get(`dapps`, {
    params
  })
  return payload.data
}
