export default {
  HIDE (state) {
    state.status = false
  },
  SET (state, announcement) {
    Object.assign(state, announcement)
  }
}
