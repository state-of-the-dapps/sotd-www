import axios from '~/plugins/axios'

function initialState () {
  return {
    errorFields: [
      'author',
      'description',
      'email',
      'license',
      'name',
      'status',
      'tags',
      'teaser',
      'website'
    ],
    errors: {
      additionalAuthors: [],
      author: [],
      description: [],
      email: [],
      license: [],
      mainnet: [],
      name: [],
      ropsten: [],
      tags: [],
      teaser: [],
      website: []
    },
    fields: {
      additionalAuthors: '',
      author: '',
      description: '',
      email: '',
      license: '',
      mainnet: '',
      name: '',
      ropsten: '',
      social: {
        facebook: { url: '' },
        twitter: { url: '' },
        github: { url: '' },
        reddit: { url: '' },
        slack: { url: '' },
        blog: { url: '' },
        other: { url: '' }
      },
      status: '',
      tags: [],
      teaser: '',
      website: ''
    },
    tagsQuery: '',
    tagsResults: []
  }
}

export const state = () => {
  return initialState()
}

export const mutations = {
  addErrorField (state, field) {
    const index = state.errorFields.indexOf(field)
    if (index > -1) {
      state.errorFields.splice(index, 1)
    }
    state.errorFields.push(field)
  },
  addTag (state, value) {
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
  removeErrorField (state, field) {
    const index = state.errorFields.indexOf(field)
    if (index > -1) {
      state.errorFields.splice(index, 1)
    }
  },
  removeTag (state, index) {
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
  reset (state) {
    Object.assign(state, initialState())
  },
  resetTagsResults (state) {
    state.tagsResults = []
    state.tagsQuery = ''
  },
  selectTag (state, index) {
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
  setTagsResults (state, items) {
    state.tagsResults = items
  },
  updateErrors (state, errors) {
    state.errors[errors.field] = errors.data
  },
  updateField (state, field) {
    state.fields[field.name] = field.value
  },
  updateSocial (state, field) {
    state.fields.social[field.name]['url'] = field.value
  },
  updateStatus (state, value) {
    const index = state.errorFields.indexOf('status')
    if (index > -1) {
      state.errorFields.splice(index, 1)
    }
    state.fields.status = value
  },
  updateTagsQuery (state, value) {
    state.tagsQuery = value
  }
}

export const actions = {
  addErrorField ({ commit }, field) {
    commit('addErrorField', field)
  },
  addTag ({ commit }, value) {
    commit('addTag', value)
  },
  findTags: ({ commit, state }, value) => {
    axios
      .get('tags.json', { params: { query: value, excluded: state.fields.tags } })
      .then(response => {
        commit('setTagsResults', response.data)
      })
  },
  removeErrorField ({ commit }, field) {
    commit('removeErrorField', field)
  },
  removeTag ({ commit }, index) {
    commit('removeTag', index)
  },
  reset ({ commit }) {
    commit('reset')
  },
  resetTagsResults ({ commit }) {
    commit('resetTagsResults')
  },
  selectTag ({ commit }, index) {
    commit('selectTag', index)
  },
  updateErrors ({ commit }, value) {
    commit('updateErrors', value)
  },
  updateField ({ commit }, field) {
    commit('updateField', field)
  },
  updateSocial ({ commit }, field) {
    commit('updateSocial', field)
  },
  updateStatus ({ commit }, value) {
    commit('updateStatus', value)
  },
  updateTagsQuery ({ commit }, value) {
    commit('updateTagsQuery', value)
  }
}

export const getters = {
  additionalAuthors: state => {
    return state.fields.additionalAuthors
  },
  additionalAuthorsErrors: state => {
    return state.errors.additionalAuthors
  },
  author: state => {
    return state.fields.author
  },
  authorErrors: state => {
    return state.errors.author
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
  license: state => {
    return state.fields.license
  },
  licenseErrors: state => {
    return state.errors.license
  },
  mainnet: state => {
    return state.fields.mainnet
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
  ropsten: state => {
    return state.fields.ropsten
  },
  ropstenErrors: state => {
    return state.errors.ropsten
  },
  socialBlog: state => {
    return state.fields.social.blog.url
  },
  socialFacebook: state => {
    return state.fields.social.facebook.url
  },
  socialGithub: state => {
    return state.fields.social.github.url
  },
  socialOther: state => {
    return state.fields.social.other.url
  },
  socialReddit: state => {
    return state.fields.social.reddit.url
  },
  socialSlack: state => {
    return state.fields.social.slack.url
  },
  socialTwitter: state => {
    return state.fields.social.twitter.url
  },
  status: state => {
    return state.fields.status
  },
  selectedTags: state => {
    return state.fields.tags
  },
  tagsQuery: state => {
    return state.tagsQuery
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
  website: state => {
    return state.fields.website
  },
  websiteErrors: state => {
    return state.errors.website
  }
}
