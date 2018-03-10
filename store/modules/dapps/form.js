import axios from '~/helpers/axios'

function initialState () {
  return {
    errorFields: [
      'authors',
      'description',
      'email',
      'license',
      'name',
      'status',
      'tags',
      'teaser',
      'acceptedTerms',
      'websiteUrl'
    ],
    errors: {
      authors: [],
      dappUrl: [],
      description: [],
      email: [],
      kovan: [],
      license: [],
      logo: [],
      mainnet: [],
      name: [],
      rinkeby: [],
      ropsten: [],
      socialChat: [],
      tags: [],
      teaser: [],
      acceptedTerms: [],
      websiteUrl: []
    },
    fields: {
      authors: [],
      description: '',
      contracts: {
        mainnet: { address: '' },
        ropsten: { address: '' },
        kovan: { address: '' },
        rinkeby: { address: '' }
      },
      email: '',
      joinSlack: true,
      license: '',
      logo: '',
      name: '',
      socials: {
        facebook: { path: '' },
        twitter: { path: '' },
        github: { path: '' },
        reddit: { path: '' },
        chat: { path: '' },
        blog: { path: '' }
      },
      status: '',
      subscribeNewsletter: true,
      tags: [],
      teaser: '',
      acceptedTerms: false,
      siteUrls: {
        dapp: '',
        website: ''
      }
    },
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
  fetchTags: ({ commit, state }, value) => {
    axios
      .get('tags', {
        params: {
          text: value,
          excluded: state.fields.tags,
          type: 'dapps'
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
  removeTag ({ commit }, index) {
    commit('REMOVE_TAG', index)
  },
  resetForm ({ commit }) {
    commit('RESET_FORM')
  },
  resetTagResults ({ commit }) {
    commit('RESET_TAG_RESULTS')
  },
  selectTag ({ commit }, index) {
    commit('SELECT_TAG', index)
  },
  setContract ({ commit }, field) {
    commit('SET_CONTRACT', field)
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
  setStatus ({ commit }, value) {
    commit('SET_STATUS', value)
  },
  setTagQuery ({ commit }, value) {
    commit('SET_TAG_QUERY', value)
  },
  setWarnings ({ commit }, warnings) {
    commit('SET_WARNINGS', warnings)
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
  REMOVE_ERROR_FIELD (state, field) {
    const index = state.errorFields.indexOf(field)
    if (index > -1) {
      state.errorFields.splice(index, 1)
    }
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
  RESET_TAG_RESULTS (state) {
    state.tagsResults = []
    state.tagQuery = ''
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
  SET_TAG_RESULTS (state, items) {
    state.tagsResults = items
  },
  SET_CONTRACT (state, field) {
    state.fields.contracts[field.name]['address'] = field.value
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
  SET_STATUS (state, value) {
    const index = state.errorFields.indexOf('status')
    if (index > -1) {
      state.errorFields.splice(index, 1)
    }
    state.fields.status = value
  },
  SET_TAG_QUERY (state, value) {
    state.tagQuery = value
  },
  SET_WARNINGS (state, warnings) {
    state.warnings[warnings.field] = warnings.data
  },
  TOGGLE_CHECKBOX (state, field) {
    state.fields[field] = !state.fields[field]
  }
}

const getters = {
  authors: state => {
    return state.fields.authors
  },
  authorsErrors: state => {
    return state.errors.authors
  },
  contracts: state => {
    return state.fields.contracts
  },
  dappUrl: state => {
    return state.fields.siteUrls.dapp
  },
  dappUrlErrors: state => {
    return state.errors.dappUrl
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
  joinSlack: state => {
    return state.fields.joinSlack
  },
  kovanErrors: state => {
    return state.errors.kovan
  },
  license: state => {
    return state.fields.license
  },
  licenseErrors: state => {
    return state.errors.license
  },
  logo: state => {
    return state.fields.logo
  },
  logoErrors: state => {
    return state.errors.logo
  },
  mainnetErrors: state => {
    return state.errors.mainnet
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
  rinkebyErrors: state => {
    return state.errors.rinkeby
  },
  ropstenErrors: state => {
    return state.errors.ropsten
  },
  selectedTags: state => {
    return state.fields.tags
  },
  socialBlog: state => {
    return state.fields.socials.blog.path
  },
  socialFacebook: state => {
    return state.fields.socials.facebook.path
  },
  socialGithub: state => {
    return state.fields.socials.github.path
  },
  socialReddit: state => {
    return state.fields.socials.reddit.path
  },
  socialChat: state => {
    return state.fields.socials.chat.path
  },
  socialChatErrors: state => {
    return state.errors.socialChat
  },
  socialTwitter: state => {
    return state.fields.socials.twitter.path
  },
  status: state => {
    return state.fields.status
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
  acceptedTerms: state => {
    return state.fields.acceptedTerms
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
