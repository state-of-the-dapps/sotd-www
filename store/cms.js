export const state = () => {
  return {
    about: {
      body: ''
    },
    confirmation: {
      body: ''
    },
    footer: {
      disclaimer: ''
    },
    submit: {
      message: ''
    },
    what: {
      body: ''
    }
  }
}

export const getters = {
  about: state => {
    return state.about
  },
  confirmation: state => {
    return state.confirmation
  },
  footer: state => {
    return state.footer
  },
  submit: state => {
    return state.submit
  },
  what: state => {
    return state.what
  }
}
