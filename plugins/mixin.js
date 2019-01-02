import Vue from 'vue'

Vue.mixin({
  methods: {
    namespace(value) {
      return this.$options._componentTag + '.' + value
    }
  }
})
