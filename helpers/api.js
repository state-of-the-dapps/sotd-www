export async function getCategories(axios) {
  const payload = await axios.get(`categories`)
  return payload.data.items
}

export async function getDapps(axios, params) {
  const payload = await axios.get(`dapps`, {
    params
  })
  return payload.data
}
