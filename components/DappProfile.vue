<template>
<div class="component-DappProfile">
  <div class="wrapper">
    <p class="description"><strong>Profile strength</strong> &nbsp;{{ Math.ceil(profileScore * 100) }}%</p>
    <div class="meter-wrapper">
      <div class="meter">
        <span class="score" :style="'width: ' + Math.ceil(profileScore * 100) + '%'"></span>
      </div>
    </div>
    <div
      v-if="profileScore !== 1"
      class="improve-wrapper">
      <button
        @click="setModal(true)"
        class="improve">Improve this profile</button>
    </div>
    <BaseModal v-if="modal">
      <div v-if="!sent">
        <div>
          <h2 class="title">Improve {{ dapp }}'s profile</h2>
          <div class="basic-info">
            <h3 class="title-3">Your name <span class="required">required</span></h3>
            <div class="field"><input class="input-text" placeholder="Enter your name here" type="text" v-model="suggesterName"/></div>
            <h3 class="title-3">Your email <span class="required">required</span></h3>
            <div class="field"><input class="input-text" placeholder="Enter your email here" type="text" v-model="suggesterEmail"/></div>
            <h3 class="title-3 -suggestions">Help improve the following fields</h3>
          </div>
          <DappEdit
            :suggestions="suggestions"/>
        </div>
        <button
          @click="submit"
          class="submit">Submit</button>
        <div>
          <button
            @click="setModal(false)"
            class="cancel">Cancel</button>
        </div>
      </div>
      <div v-else>
        <p class="confirmation">Thanks! We will review your suggestions and be in touch.</p>
        <button
          @click="setModal(false)"
          class="submit">Ok!</button>
      </div>
    </BaseModal>
  </div>
</div>
</template>

<script>
import axios from '~/helpers/axios'
import BaseModal from './BaseModal'
import DappEdit from './DappEdit'

export default {
  data () {
    return {
      modal: false,
      suggesterName: '',
      suggesterEmail: '',
      suggestions: [],
      sent: false
    }
  },
  computed: {
    fields () {
      return this.$store.getters['dapps/form/fields']
    }
  },
  components: {
    BaseModal,
    DappEdit
  },
  props: {
    dapp: String,
    profileScore: Number,
    slug: String
  },
  methods: {
    setModal (value) {
      this.sent = false
      this.modal = value
    },
    submit () {
      const data = {
        fields: this.fields
      }
      data.fields.dapp = this.dapp
      data.fields.slug = this.slug
      data.fields.suggesterName = this.suggesterName
      data.fields.suggesterEmail = this.suggesterEmail
      this.sent = true
      axios.post(`dapps/${this.slug}/suggestions`, data)
        .then((response) => {
          this.$mixpanel.track('Improve DApp - Submit', {
            slug: this.slug
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  mounted () {
    axios
      .get(`dapps/${this.slug}/suggestions`)
      .then(response => {
        const profile = response.data
        const suggestions = profile.suggestions
        this.suggestions = suggestions
      })
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.basic-info {
  max-width: 378px;
  margin: 0 auto;
  padding-top: 5px;
}

.required {
  color: $color--required;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  position: relative;
  top: -5px;
}

.input-text {
  @include form-input-text;
  display: block;
  background: lighten($color--white, 100%);
  text-align: left;
  padding: 10px;
  max-width: 300px;
  margin-left: 0;
  margin-right: 0;
}

.title-1 {
  font-size: 3rem;
  text-transform: initial;
  margin: 0;
}

.title-3 {
  @include title-3;
  text-align: left;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
  &.-suggestions {
    margin-bottom: 0;
    padding-bottom: 0;
  }
}

.field {
  text-align: left;
}

.confirmation {
  font-size: 1.2rem;
  text-align: center;
  padding-bottom: 15px;
}

.cancel {
  border-radius: 3px;
  padding: 7px 12px;
  text-transform: uppercase;
  text-decoration: underline;
  font-size: .9rem;
  font-weight: 600;
  margin: 0 auto;
  display: block;
}

.description {
  margin-bottom: 0;
  text-align: center;
  @include tweakpoint('min-width', 1000px) {
    text-align: left;
  }
}

.wrapper {
  margin: 0 10px 24px 10px;
  padding-bottom: 24px;
  border-bottom: 1px solid darken($color--gray, 6%);
}

.meter-wrapper {
  margin-top: 8px;
}

.meter {
  border-radius: 3px;
  width: 100%;
  height: 7px;
  background: darken($color--gray, 5%);
  overflow: hidden;
}

.improve-wrapper {
  padding-top: 5px; 
}

.improve {
  text-align: left;
  text-decoration: underline;
  font-size: .95rem;
}

.score {
  display: block;
  height: 100%;
  background: $color--black;
}

.title {
  text-align: center;
}

.submit {
  background: $color--black;
  color: $color--white;
  margin: 0 auto;
  display: block;
  width: 300px;
  margin-bottom: 15px;
  padding: 10px;
  position: relative;
  &:active {
    top: 1px;
  }
}
</style>
