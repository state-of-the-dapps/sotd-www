<template>
  <div class="componentModalMyListShare">
    <div v-if="!hasUrl" class="wrapper">
      <h2 class="heading">Share this list</h2>
      <div class="field">
        <label class="label">Give this list a name <span class="required">(required, minimum 3 characters)</span></label>
        <input v-model="name" class="input" type="text" maxlength="35" placeholder="e.g. Julia's favorite games">
      </div>
      <p class="disclaimer"><strong>Please note:</strong> For now, once you create a link, the list will be permanent. If you want to make changes, you will need to make a new list.</p>
      <div class="actions">
        <button @click="close" class="button -cancel">Cancel</button> <button @click="getLink" class="button -commit" :class="isReady ? '': 'is-not-ready'">Get a shareable link for this list</button>
      </div>
    </div>
    <div v-else>
      <h2 class="heading">Save this link</h2>
      <p class="disclaimer"><strong>Important:</strong> This URL will not be available after you close this window. Please make sure you copy it and save it somewhere.</p>
      <div><input class="input -url" type="text" :value="'https://stateofthedapps.com/lists/' + list_url + '/' + slug" readonly></div>
      <div class="actions"><button @click="close" class="button -commit">I have saved this URL!</button></div>
    </div>
  </div>
</template>

<script>
import axios from '~/helpers/axios'

export default {
  computed: {
    isReady () {
      if (this.name.length > 2) {
        return true
      } else {
        return false
      }
    }
  },
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
      if (this.isReady) {
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
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.actions {
  margin: 20px 0 10px;
}

.button {
  padding: 12px 15px;
  margin: 0 5px;
  &.-commit {
    background: $color--black;
    color: $color--white;
    box-shadow: 0 0 20px rgba($color--black, .2);
    transition: opacity .2s ease;
    &.is-not-ready {
      opacity: .3;
      cursor: auto;
    }
  }
  &.-cancel {
    text-decoration: underline;
  }
}

.disclaimer {
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
  text-align: left;
  padding: 20px 0;
}

.heading {
  @include title-1;
  font-size: 3.5rem;
  text-align: center;
  margin: 0;
}

.field {
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
}

.input {
  padding: 15px 10px;
  border: none;
  background: $color--white;
  box-shadow: 0 5px 20px rgba($color--black, .15);
  width: 100%;
  &.-url {
    text-align: center;
  }
}

.label {
  text-align: left;
  display: block;
  margin-top: 15px;
  margin-bottom: 8px;
}

.required {
  color: $color--error;
}
</style>
