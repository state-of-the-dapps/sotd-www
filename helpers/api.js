import axios from '~/helpers/axios'

export async function getCategories () {
  const payload = await axios.get(`categories`)
  return payload.data.items
}
