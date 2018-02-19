import { generateRandomSeed } from '~/helpers/functions'
import { dappRefineStatusOptions } from '~/helpers/constants'
import axios from '~/helpers/axios'

const randomSeed = generateRandomSeed()

function initialState () {
  return {
    errorFields: [
      'acceptedTerms',
      'dates',
      'description',
      'email',
      'languages',
      'name',
      'organizer',
      'registrationInfo',
      'tags',
      'teaser',
      'websiteUrl'
    ],
    errors: {
      categories: [],
      dates: [],
      description: [],
      email: [],
      hashtag: [],
      highlights: [],
      languages: [],
      name: [],
      organizer: [],
      registrationInfo: [],
      sponsors: [],
      tags: [],
      teaser: [],
      websiteUrl: []
    },
    fields: {
      acceptedTerms: false,
      categories: [],
      dates: {
        end: '',
        start: ''
      },
      description: '',
      email: '',
      hashtag: '',
      highlights: [],
      joinSlack: true,
      languages: [],
      location: '',
      name: '',
      organizer: '',
      relatedDapps: [],
      registrationInfo: '',
      socials: {
        facebook: {
          path: ''
        },
        twitter: {
          path: ''
        }
      },
      sponsors: [],
      subscribeNewsletter: true,
      tags: [],
      teaser: '',
      siteUrls: {
        website: ''
      }
    },
    relatedDappQuery: '',
    relatedDappsResults: [],
    tagQuery: '',
    tagsResults: [],
    warnings: {
      name: [],
      teaser: []
    }
  }
}

const actions = {
  addErrorField ({ commit }, field) {
    commit('ADD_ERROR_FIELD', field)
  },
  addTag ({ commit }, value) {
    commit('ADD_TAG', value)
  },
  clearEndDate ({ commit }) {
    commit('CLEAR_END_DATE')
  },
  clearLocation ({ commit }) {
    commit('CLEAR_LOCATION')
  },
  fetchRelatedDapps: ({ commit, state }, value) => {
    const relatedDapps = state.fields.relatedDapps
    const relatedDappsSlugs = []
    for (let i = 0; i < relatedDapps.length; i++) {
      relatedDappsSlugs.push(relatedDapps[i].slug)
    }
    axios
      .get('dapps', {
        params: {
          excluded: relatedDappsSlugs,
          tab: 'most-relevant',
          limit: 15,
          offset: 0,
          status: dappRefineStatusOptions[0],
          seed: randomSeed,
          tags: [],
          text: state.relatedDappQuery
        }
      })
      .then(response => {
        const data = response.data
        const items = data.items
        commit('SET_RELATED_DAPPS_RESULTS', items)
      })
  },
  fetchTags: ({ commit, state }, value) => {
    axios
      .get('tags', {
        params: {
          text: value,
          excluded: state.fields.tags,
          type: 'events'
        }
      })
      .then(response => {
        var data = response.data
        var items = data.items
        commit('SET_TAG_RESULTS', items)
      })
  },
  removeErrorField ({ commit }, field) {
    commit('REMOVE_ERROR_FIELD', field)
  },
  removeRelatedDapp ({ commit }, index) {
    commit('REMOVE_RELATED_DAPP', index)
  },
  removeTag ({ commit }, index) {
    commit('REMOVE_TAG', index)
  },
  resetForm ({ commit }) {
    commit('RESET_FORM')
  },
  resetRelatedDappsResults ({ commit }) {
    commit('RESET_RELATED_DAPPS_RESULTS')
  },
  resetTagResults ({ commit }) {
    commit('RESET_TAG_RESULTS')
  },
  selectRelatedDapp ({ commit }, index) {
    commit('SELECT_RELATED_DAPP', index)
  },
  selectTag ({ commit }, index) {
    commit('SELECT_TAG', index)
  },
  setDate ({ commit }, field) {
    commit('SET_DATE', field)
  },
  setErrors ({ commit }, errors) {
    commit('SET_ERRORS', errors)
  },
  setField ({ commit }, field) {
    commit('SET_FIELD', field)
  },
  setSiteUrl ({ commit }, field) {
    commit('SET_SITE_URL', field)
  },
  setSocial ({ commit }, field) {
    commit('SET_SOCIAL', field)
  },
  setRelatedDappQuery ({ commit }, value) {
    commit('SET_RELATED_DAPP_QUERY', value)
  },
  setTagQuery ({ commit }, value) {
    commit('SET_TAG_QUERY', value)
  },
  setWarnings ({ commit }, warnings) {
    commit('SET_WARNINGS', warnings)
  },
  toggleCategory ({ commit }, category) {
    commit('TOGGLE_CATEGORY', category)
  },
  toggleCheckbox ({ commit }, field) {
    commit('TOGGLE_CHECKBOX', field)
  }
}

const mutations = {
  ADD_ERROR_FIELD (state, field) {
    const index = state.errorFields.indexOf(field)
    if (index > -1) {
      state.errorFields.splice(index, 1)
    }
    state.errorFields.push(field)
  },
  ADD_TAG (state, value) {
    if (state.fields.tags.indexOf(value) === -1) {
      state.fields.tags.push(value)
    }
    if (state.fields.tags.length > 0) {
      const index = state.errorFields.indexOf('tags')
      if (index > -1) {
        state.errorFields.splice(index, 1)
      }
    }
  },
  CLEAR_END_DATE (state) {
    state.fields.dates.end = ''
  },
  CLEAR_LOCATION (state) {
    state.fields.location = ''
  },
  REMOVE_ERROR_FIELD (state, field) {
    const index = state.errorFields.indexOf(field)
    if (index > -1) {
      state.errorFields.splice(index, 1)
    }
  },
  REMOVE_RELATED_DAPP (state, index) {
    state.fields.relatedDapps.splice(index, 1)
  },
  REMOVE_TAG (state, index) {
    state.fields.tags.splice(index, 1)
    let errorIndex = state.errorFields.indexOf('tags')
    if (state.fields.tags.length > 0) {
      if (errorIndex > 0) {
        state.errorFields.splice(errorIndex, 1)
      }
    } else {
      if (errorIndex < 0) {
        state.errorFields.push('tags')
      }
    }
  },
  RESET_FORM (state) {
    Object.assign(state, initialState())
  },
  RESET_RELATED_DAPPS_RESULTS (state) {
    state.relatedDappsResults = []
    state.relatedDappQuery = ''
  },
  RESET_TAG_RESULTS (state) {
    state.tagsResults = []
    state.tagQuery = ''
  },
  SELECT_RELATED_DAPP (state, index) {
    if (state.fields.relatedDapps.indexOf(state.relatedDappsResults[index]) === -1) {
      const relatedDapp = {
        name: state.relatedDappsResults[index].name,
        slug: state.relatedDappsResults[index].slug
      }
      state.fields.relatedDapps.push(relatedDapp)
    }
    state.relatedDappsResults.splice(index, 1)
  },
  SELECT_TAG (state, index) {
    if (state.fields.tags.indexOf(state.tagsResults[index]) === -1) {
      state.fields.tags.push(state.tagsResults[index])
    }
    if (state.fields.tags.length > 0) {
      const index = state.errorFields.indexOf('tags')
      if (index > -1) {
        state.errorFields.splice(index, 1)
      }
    }
    state.tagsResults.splice(index, 1)
  },
  SET_DATE (state, field) {
    state.fields.dates[field.name] = field.value
  },
  SET_RELATED_DAPPS_RESULTS (state, items) {
    state.relatedDappsResults = items
  },
  SET_TAG_RESULTS (state, items) {
    state.tagsResults = items
  },
  SET_ERRORS (state, errors) {
    state.errors[errors.field] = errors.data
  },
  SET_FIELD (state, field) {
    state.fields[field.name] = field.value
  },
  SET_SITE_URL (state, field) {
    state.fields.siteUrls[field.name] = field.value
  },
  SET_SOCIAL (state, field) {
    state.fields.socials[field.name]['path'] = field.value
  },
  SET_RELATED_DAPP_QUERY (state, value) {
    state.relatedDappQuery = value
  },
  SET_TAG_QUERY (state, value) {
    state.tagQuery = value
  },
  SET_WARNINGS (state, warnings) {
    state.warnings[warnings.field] = warnings.data
  },
  TOGGLE_CATEGORY (state, category) {
    const selectedCategories = state.fields.categories.slice() || []
    const categoryIndex = selectedCategories.indexOf(category)
    if (categoryIndex !== -1) {
      state.fields.categories.splice(categoryIndex, 1)
    } else if (selectedCategories.length < 4) {
      state.fields.categories.push(category)
    }
  },
  TOGGLE_CHECKBOX (state, field) {
    state.fields[field] = !state.fields[field]
  }
}

const getters = {
  acceptedTerms: state => {
    return state.fields.acceptedTerms
  },
  categories: state => {
    return state.fields.categories
  },
  dateEnd: state => {
    return state.fields.dates.end
  },
  dateStart: state => {
    return state.fields.dates.start
  },
  description: state => {
    return state.fields.description
  },
  descriptionErrors: state => {
    return state.errors.description
  },
  email: state => {
    return state.fields.email
  },
  emailErrors: state => {
    return state.errors.email
  },
  errorFields: state => {
    return state.errorFields
  },
  fields: state => {
    return state.fields
  },
  hashtag: state => {
    return state.fields.hashtag
  },
  hashtagErrors: state => {
    return state.errors.hashtag
  },
  highlights: state => {
    return state.fields.highlights
  },
  highlightsErrors: state => {
    return state.errors.highlights
  },
  joinSlack: state => {
    return state.fields.joinSlack
  },
  languages: state => {
    return state.fields.languages
  },
  languagesErrors: state => {
    return state.errors.languages
  },
  location: state => {
    return state.fields.location
  },
  name: state => {
    return state.fields.name
  },
  nameErrors: state => {
    return state.errors.name
  },
  nameWarnings: state => {
    return state.warnings.name
  },
  organizer: state => {
    return state.fields.organizer
  },
  organizerErrors: state => {
    return state.errors.organizer
  },
  relatedDappQuery: state => {
    return state.relatedDappQuery
  },
  relatedDappsResults: state => {
    return state.relatedDappsResults
  },
  registrationInfo: state => {
    return state.fields.registrationInfo
  },
  registrationInfoErrors: state => {
    return state.errors.registrationInfo
  },
  selectedRelatedDapps: state => {
    return state.fields.relatedDapps
  },
  selectedTags: state => {
    return state.fields.tags
  },
  socialFacebook: state => {
    return state.fields.socials.facebook.path
  },
  socialTwitter: state => {
    return state.fields.socials.twitter.path
  },
  sponsors: state => {
    return state.fields.sponsors
  },
  sponsorsErrors: state => {
    return state.errors.sponsors
  },
  subscribeNewsletter: state => {
    return state.fields.subscribeNewsletter
  },
  tagQuery: state => {
    return state.tagQuery
  },
  tagsResults: state => {
    return state.tagsResults
  },
  teaser: state => {
    return state.fields.teaser
  },
  teaserErrors: state => {
    return state.errors.teaser
  },
  teaserWarnings: state => {
    return state.warnings.teaser
  },
  websiteUrl: state => {
    return state.fields.siteUrls.website
  },
  websiteUrlErrors: state => {
    return state.errors.websiteUrl
  }
}

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state: initialState()
}
