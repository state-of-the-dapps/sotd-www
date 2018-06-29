<template>
  <div class="componentModalMyListShare">
    <div v-if="!hasUrl" class="wrapper">
      <h2 class="heading">Share this list</h2>
      <div class="field">
        <label class="label">Name your list</label>
        <input v-model="name" class="input" type="text" maxlength="35">
      </div>
      <p class="disclaimer">Disclaimer</p>
      <div class="actions">
        <button @click="close" class="button -cancel">Cancel</button> <button @click="getLink" class="button -create">Get a link for this list</button>
      </div>
    </div>
    <div v-else>
      <h2 class="heading">Copy this link</h2>
      <p class="disclaimer">Disclaimer</p>
      <div><input class="url" type="text" :value="'https://stateofthedapps.com/lists/' + list_url + '/' + slug"></div>
      <div><button @click="close" class="button -cancel">I've copied this URL</button></div>
    </div>
  </div>
</template>

<script>
import axios from '~/helpers/axios'

export default {
  data () {
    return {
      dapps: [],
      hasUrl: false,
      name: '',
      list_url: '',
      slug: ''
    }
  },
  methods: {
    close () {
      const modal = {
        component: '',
        mpData: {}
      }
      this.$store.dispatch('setSiteModal', modal)
    },
    getLink () {
      const dapps = this.$localStorage.get('myList')
      if (dapps) {
        this.dapps = dapps.split(',')
      }
      const data = {
        name: this.name,
        dapps: this.dapps
      }
      axios.post('lists', data)
        .then((response) => {
          const data = response.data
          this.list_url = data.list_url
          this.slug = data.slug
          this.hasUrl = true
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.heading {
  @include title-1;
  font-size: 3.5rem;
  text-align: center;
  margin: 0;
}

.label {
  display: block;
}
</style>
