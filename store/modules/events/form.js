// import axios from '~/helpers/axios'

function initialState () {
  return {
    errorFields: [
      // 'name'
    ],
    errors: {
      // name: []
    },
    fields: {
      categories: [],
      dates: {
        end: '',
        start: ''
      },
      description: '',
      email: '',
      isFree: false,
      languages: [],
      location: '',
      name: '',
      organizer: '',
      registrationInfo: '',
      relatedDapps: [],
      highlights: [],
      socials: {
        facebook: { url: '' },
        twitter: { url: '' }
      },
      sponsors: [],
      tags: [],
      teaser: '',
      hashtag: '',
      siteUrls: {
        website: ''
      }
    },
    tagQuery: '',
    tagsResults: [],
    warnings: {
      // name: []
    }
  }
}

const actions = {}

const getters = {}

const mutations = {}

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state: initialState()
}
