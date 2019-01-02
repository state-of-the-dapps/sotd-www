import { logError } from '@/helpers/utils'

export async function getCategories(axios, sentry) {
  let payload = {
    data: {
      items: []
    }
  }
  try {
    payload = await axios.get(`categories`)
  } catch (e) {
    logError(sentry, e)
  } finally {
    return payload.data.items
  }
}

export async function getDapps(axios, params, sentry) {
  let payload = {
    data: {
      items: [],
      pager: {
        limit: 0,
        offset: 0,
        totalCount: 0
      }
    }
  }
  try {
    payload = await axios.get(`dapps`, {
      params
    })
  } catch (e) {
    logError(sentry, e)
  } finally {
    return payload.data
  }
}
