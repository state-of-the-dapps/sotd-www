export default {
  RESET_ITEMS (state) {
    state.items = []
  },
  SELECT_ITEM (state, index) {
    state.items.splice(index, 1)
  },
  SET_ITEMS (state, items) {
    state.items = items
  }
}
