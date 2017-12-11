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
      dates: [
        // 'YYYY-MM-DD'
      ],
      description: '',
      email: '',
      isFree: false,
      language: '',
      location: {
        address: '', // e.g. '123 Address Lane, New Place MN, 34098'
        country: '',
        lat: '',
        lon: ''
      },
      name: '', // e.g. CryptoConference
      organizer: '',
      registrationInfo: '',
      relatedDapps: [], // e.g. 'dapp-slug', 'another-dapp-slug'
      schedule: [
       /*
        {
          title: '',
          description: ''
        }
       */
      ],
      social: {
        facebook: { url: '' },
        twitter: { url: '' }
      },
      sponsors: [],
      tags: [],
      teaser: '',
      timezone: '', // e.g. should autofill based on location
      twitterHashtag: '', // e.g #cryptopunks
      website: ''
    },
    tagsQuery: '',
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
